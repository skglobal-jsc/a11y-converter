import type { IncomingHttpHeaders, IncomingMessage } from 'node:http';
import type {
  OptionsInit,
  Method,
  Request as GotRequest,
  Options,
} from 'got-scraping';

import * as cheerio from 'cheerio';

import iconv from 'iconv-lite';
import * as contentTypeParser from 'content-type';

import { extname } from 'node:path';
import * as mime from 'mime-types';
import { gotScraping, TimeoutError } from 'got-scraping';
import { concatStreamToBuffer } from './utils/index';

const HTML_AND_XML_MIME_TYPES = [
  'text/html',
  'text/xml',
  'application/xhtml+xml',
  'application/xml',
];

/**
 * Gets parsed content type from response object
 * @param response HTTP response object
 */
function parseContentTypeFromResponse(response: IncomingMessage): {
  type: string;
  charset: BufferEncoding;
} {
  const { url, headers } = response;
  let parsedContentType: contentTypeParser.ParsedMediaType | undefined;

  if (headers['content-type']) {
    try {
      parsedContentType = contentTypeParser.parse(headers['content-type']);
    } catch {
      // Can not parse content type from Content-Type header. Try to parse it from file extension.
    }
  }

  // Parse content type from file extension as fallback
  if (!parsedContentType) {
    const parsedUrl = new URL(url!);
    const contentTypeFromExtname =
      mime.contentType(extname(parsedUrl.pathname)) ||
      'application/octet-stream; charset=utf-8'; // Fallback content type, specified in https://tools.ietf.org/html/rfc7231#section-3.1.1.5
    parsedContentType = contentTypeParser.parse(contentTypeFromExtname);
  }

  return {
    type: parsedContentType.type,
    charset: parsedContentType.parameters.charset as BufferEncoding,
  };
}

/**
 * The stream object returned from got does not have the below properties.
 * At the same time, you can't read data directly from the response stream,
 * because they won't get emitted unless you also read from the primary
 * got stream. To be able to work with only one stream, we move the expected props
 * from the response stream to the got stream.
 * @internal
 */
function addResponsePropertiesToStream(stream: GotRequest) {
  const properties = [
    'statusCode',
    'statusMessage',
    'headers',
    'complete',
    'httpVersion',
    'rawHeaders',
    'rawTrailers',
    'trailers',
    'url',
    'request',
  ];

  const response = stream.response!;

  response.on('end', () => {
    // @ts-expect-error
    Object.assign(stream.rawTrailers, response.rawTrailers);
    // @ts-expect-error
    Object.assign(stream.trailers, response.trailers);

    // @ts-expect-error
    stream.complete = response.complete;
  });

  for (const prop of properties) {
    if (!(prop in stream)) {
      stream[prop] = response[prop as keyof IncomingMessage];
    }
  }

  return stream as unknown as IncomingMessage;
}

export interface ScrapingOptions {
  contentSelector?: string;
  language?: string;
}
export interface RequestsOptions {
  url?: string;
  loadedUrl?: string;
  method: Method;
  headers?: IncomingHttpHeaders;
  payload?: string;

  html?: string;

  scrapingOptions?: ScrapingOptions;

  // extend function, used it do some custom logic
  extendFunction?: (options: any) => any;

  // allow user custom style of the html
  stylesheets?: string[];

  // Google analytics
  googleAnalyticsId?: string;
}

export class BasicConverter {
  protected requestHandlerTimeoutMillis!: number;
  protected ignoreSslErrors: boolean = false;

  constructor() {}

  async convert(opt: RequestsOptions): Promise<any> {
    const options = {
      ...opt,
      method: opt.method || 'GET',
    };
    await this._init();

    const stats = {};

    let result: any = null;
    if (options.url) {
      result = await this._requestFunction({
        options,
      });
    } else if (options.html && options.loadedUrl) {
      result = await this._convertFromHtml(options.html, options);
    } else {
      throw new Error('No URL or HTML provided');
    }

    // start convert process
    let text: any = null;
    if (result) {
      const { html, contentType, $ } = await this._convertHtml({
        result,
        options,
      });

      // execute extend function if it exists
      if (options.extendFunction) {
        await options.extendFunction({ html, $, contentType });
      }

      // finally, get html
      text = $ ? $.html() : html;
    }

    await this._clean();
    return { html: text, stats };
  }

  /**
   * Converts standard html to a11y html
   * @param param0
   */
  protected async _convertHtml({
    result,
    options,
  }: {
    result: any;
    options: RequestsOptions;
  }): Promise<{
    html: string;
    contentType: string;
    isXml: boolean;
    response: IncomingMessage;
    dom: any;
    $: cheerio.Root;
  }> {
    throw new Error('Not implemented');
  }

  /**
   * Function to make the HTTP request. It performs optimizations
   * on the request such as only downloading the request body if the
   * received content type matches text/html, application/xml, application/xhtml+xml.
   */
  protected async _requestFunction({
    options,
    proxyUrl,
    gotOptions,
  }: {
    options: RequestsOptions;
    proxyUrl?: string;
    gotOptions?: OptionsInit;
  }): Promise<{
    body?: Buffer;
    isXml: boolean;
    response: IncomingMessage;
    contentType: {
      type: string;
      encoding: string;
    };
  }> {
    const opts = this._getRequestOptions(options, proxyUrl, gotOptions);

    try {
      const responseStream = await this._requestAsBrowser(opts);
      const { statusCode } = responseStream;
      const { type, charset } = parseContentTypeFromResponse(responseStream);

      console.log(
        `Response status code: ${statusCode}, content type: ${type}, charset: ${charset}`
      );

      const { response, encoding } = this._encodeResponse(
        options,
        responseStream,
        charset
      );
      const contentType = { type, encoding };

      if (statusCode! >= 500) {
        throw new Error(
          `${statusCode} - Internal Server Error. ${response.url}`
        );
      } else if (HTML_AND_XML_MIME_TYPES.includes(type)) {
        const isXml = type.includes('xml');
        const parsed = await this._parseHTML(response, isXml);
        return { ...parsed, isXml, response, contentType };
      } else {
        const body = await concatStreamToBuffer(response);
        return { body, response, contentType, isXml: false };
      }
    } catch (e) {
      if (e instanceof TimeoutError) {
        this._handleRequestTimeout();
      }

      throw e;
    }
  }

  protected async _parseHTML(
    response: IncomingMessage,
    _isXml: boolean
  ): Promise<any> {
    return {
      body: await concatStreamToBuffer(response),
    };
  }

  /**
   * Combines the provided `requestOptions` with mandatory (non-overridable) values.
   */
  protected _getRequestOptions(
    options: RequestsOptions,
    proxyUrl?: string,
    gotOptions?: OptionsInit
  ) {
    const requestOptions: OptionsInit & { isStream: true } = {
      url: options.url,
      method: options.method as Method,
      proxyUrl,
      ...gotOptions,
      headers: { ...options.headers, ...gotOptions?.headers },
      https: {
        ...gotOptions?.https,
        rejectUnauthorized: !this.ignoreSslErrors,
      },
      isStream: true,
    };

    // Delete any possible lowercased header for cookie as they are merged in _applyCookies under the uppercase Cookie header
    Reflect.deleteProperty(requestOptions.headers!, 'cookie');

    if (/PATCH|POST|PUT/.test(options.method))
      requestOptions.body = options.payload ?? '';

    return requestOptions;
  }

  /**
   * Handles timeout request
   */
  protected _handleRequestTimeout() {
    throw new Error(
      `request timed out after ${
        this.requestHandlerTimeoutMillis / 1000
      } seconds.`
    );
  }

  /**
   * @internal wraps public utility for mocking purposes
   */
  private _requestAsBrowser = async (
    options: OptionsInit & { isStream: true }
  ) => {
    return new Promise<IncomingMessage>((resolve, reject) => {
      const stream = gotScraping(options);

      stream.on(
        'redirect',
        (updatedOptions: Options, redirectResponse: IncomingMessage) => {
          console.log('Redirecting...');
        }
      );

      stream.on('error', reject);
      stream.on('response', () => {
        resolve(addResponsePropertiesToStream(stream));
      });
    });
  };

  protected _encodeResponse(
    options: RequestsOptions,
    response: IncomingMessage,
    encoding: string
  ): {
    encoding: string;
    response: IncomingMessage;
  } {
    // Fall back to utf-8 if we still don't have encoding.
    const utf8 = 'utf8';
    if (!encoding) return { response, encoding: utf8 };

    // This means that the encoding is one of Node.js supported
    // encodings and we don't need to re-encode it.
    if (Buffer.isEncoding(encoding)) return { response, encoding };

    // Try to re-encode a variety of unsupported encodings to utf-8
    if (iconv.encodingExists(encoding)) {
      const encodeStream = iconv.encodeStream(utf8);
      const decodeStream = iconv
        .decodeStream(encoding)
        .on('error', (err) => encodeStream.emit('error', err));
      response.on('error', (err: Error) => decodeStream.emit('error', err));
      const encodedResponse = response
        .pipe(decodeStream)
        .pipe(encodeStream) as NodeJS.ReadWriteStream & {
        statusCode?: number;
        headers: IncomingHttpHeaders;
        url?: string;
      };
      encodedResponse.statusCode = response.statusCode;
      encodedResponse.headers = response.headers;
      encodedResponse.url = response.url;
      return {
        response: encodedResponse as any,
        encoding: utf8,
      };
    }

    throw new Error(
      `Resource ${options.url} served with unsupported charset/encoding: ${encoding}`
    );
  }

  protected async _init(): Promise<void> {
    console.log('Initializing...');
  }

  protected async _clean(): Promise<void> {
    console.log('Cleaning...');
  }

  private async _convertFromHtml(
    html: string,
    options: RequestsOptions
  ): Promise<any> {
    const $ = cheerio.load(html);
    const isXml = false;
    return {
      $,
      isXml,
      response: {
        url: options.loadedUrl,
      },
      get body() {
        return isXml ? $!.xml() : $!.html({ decodeEntities: false });
      },
    };
  }
}
