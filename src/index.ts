import type { IncomingMessage } from 'node:http';

import * as cheerio from 'cheerio';
import { DomHandler } from 'htmlparser2';
import { WritableStream } from 'htmlparser2/lib/WritableStream';
import { BasicConverter, RequestsOptions } from './basic-converter';

export class A11yConverter extends BasicConverter {
  constructor() {
    super();
  }

  _convert({
    result,
    options,
  }: {
    result: {
      body: Buffer;
      isXml: boolean;
      response: IncomingMessage;
      contentType: {
        type: string;
        encoding: string;
      },
      dom: any; // TODO: type this
    };
    options: RequestsOptions;
  }): Promise<any> {
    const { body, isXml, response, contentType, dom } = result;
    return Promise.resolve(null);
  }

  protected override async _parseHTML(
    response: IncomingMessage,
    isXml: boolean
  ) {
    const dom = await this._parseHtmlToDom(response);
    const $ = cheerio.load(
      dom as string,
      {
        xmlMode: isXml,
        // Recent versions of cheerio use parse5 as the HTML parser/serializer. It's more strict than htmlparser2
        // and not good for scraping. It also does not have a great streaming interface.
        // Here we tell cheerio to use htmlparser2 for serialization, otherwise the conflict produces weird errors.
        _useHtmlParser2: true,
      } as cheerio.CheerioParserOptions
    );

    return {
      dom,
      $,
      get body() {
        return isXml ? $!.xml() : $!.html({ decodeEntities: false });
      },
    };
  }

  protected async _parseHtmlToDom(response: IncomingMessage) {
    return new Promise((resolve, reject) => {
      const domHandler = new DomHandler((err, dom) => {
        if (err) reject(err);
        else resolve(dom);
      });
      const parser = new WritableStream(domHandler, { decodeEntities: true });
      parser.on('error', reject);
      response.on('error', reject).pipe(parser);
    });
  }
}
