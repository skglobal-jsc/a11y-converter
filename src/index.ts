import type { IncomingMessage } from 'node:http';

import * as cheerio from 'cheerio';
import { DomHandler } from 'htmlparser2';
import { WritableStream } from 'htmlparser2/lib/WritableStream';
import {
  BasicConverter,
  RequestsOptions,
  ScrapingOptions,
} from './basic-converter';

import {
  buildHeadingComponent,
  buildImageAnnotation,
  buildImageComponent,
  buildLinkComponent,
  buildListComponent,
  buildTableAnnotation,
  buildTableComponent,
  buildTextComponent,
  commonCssLinks,
} from './utils/index';
import * as url from 'url';

const ALLOWED_TEXT_TAG_TYPES = [
  'TABLE',
  'UL',
  'OL',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'P',
];

export const replaceAbsoluteUrl = ($: cheerio.Root, baseUrl: string) => {
  // find all image, a tag and replace relative path to absolute path
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src) {
      const parsedUrl = url.parse(src);
      if (!parsedUrl.host) {
        $(el).attr('src', url.resolve(baseUrl, src));
      }
    }
  });

  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href) {
      const parsedUrl = url.parse(href);
      if (!parsedUrl.host) {
        $(el).attr('href', url.resolve(baseUrl, href));
      }
    }
  });
};

const cleanText = (text: string = '') => {
  const txt = text
    .replace(/  *\n/g, '\n')
    .replace(/\s+\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (txt !== '') {
    // TODO: if text include Telephone number , Email , Address must be hyperlinked

    return `<p>${txt}</p>`;
  }
  return '';
};

const extractDom = ($el: cheerio.Cheerio, options: RequestsOptions) => {
  const { loadedUrl } = options;
  let textContent = '';
  // get children
  const $children = $el.children();

  // if there are no children, return the text
  if ($children.length === 0) {
    textContent += cleanText($el.text());
  } else {
    // if there are children, get the text from each child
    $children.each((i, child) => {
      const $child = $el.children().eq(i);
      // if the child is a text node, return the text
      const tagName = $child.prop('tagName');
      const className = $child.attr('class');

      if ($child.is('text')) {
        textContent += cleanText($child.text());
      } else if ($child.is('a')) {
        textContent += Object.keys($child.attr()).reduce((acc, key) => {
          return `${acc} ${key}="${$child.attr(key)}"`;
        }, '<a');
        textContent += `>${$child.html()}</a>`;
      } else if ($child.is('img')) {
        textContent += Object.keys($child.attr()).reduce((acc, key) => {
          const value = $child.attr(key) || '';
          if (key === 'src') {
            // relative path to absolute path
            const parsedUrl = url.parse(value);
            if (!parsedUrl.host) {
              return `${acc} ${key}="${url.resolve(loadedUrl!, value)}"`;
            }

            return `${acc} ${key}="${value}"`;
          }
          return `${acc} ${key}="${$child.attr(key)}"`;
        }, '<img');
        textContent += '/>';
      } else if (ALLOWED_TEXT_TAG_TYPES.includes(tagName)) {
        const tag = tagName.toLowerCase();
        const html = `<${tag}>${$child.html()}</${tag}>`;
        textContent += html;
      } else {
        // if the child is not a text node, return the text from the child
        textContent += extractDom($child, options);
      }
    });
  }

  return textContent;
};

export class A11yConverter extends BasicConverter {
  constructor() {
    super();
  }

  protected override async _convertHtml({
    result,
    options,
  }: {
    result: {
      isXml: boolean;
      response: IncomingMessage;
      contentType: {
        type: string;
        encoding: string;
      };
      dom: any;
      $: cheerio.CheerioAPI;
    };
    options: RequestsOptions;
  }): Promise<{
    html: string;
    contentType: string;
    isXml: boolean;
    response: IncomingMessage;
    dom: any;
    $: cheerio.Root;
  }> {
    const { isXml, response, contentType, dom, $ } = result;

    options.loadedUrl = options.loadedUrl || response.url;
    // process the dom
    this._processDom({ $, options });

    // remove unnecessary attributes
    this._removeUnnecessaryAttributes($);

    // apply google analytics, if needed
    this._applyGoogleAnalytics($, options);

    // apply a11y stylesheets and add specific stylesheet for specific project in addition to the common SKG stylesheet
    this._applyCssRules($, options.stylesheets || commonCssLinks);

    // apply a11y attributes
    this._applyAccessibilityAttributes($);

    // apply annotation for img, table tag
    this._applyAnnotation($, options.scrapingOptions?.language);

    return Promise.resolve({
      html: $.html(),
      contentType: contentType ? contentType.type : 'text/html',
      isXml,
      response,
      dom,
      $,
    });
  }

  /**
   * Use cheerio to parse with htmlparser2 and return a cheerio object
   * @param response
   * @param isXml
   * @returns
   */
  protected override async _parseHTML(
    response: IncomingMessage,
    isXml: boolean
  ): Promise<any> {
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

  /**
   * Do some processing on the dom
   * - Get content from the selector
   * - flatten the dom
   * @param param0
   */
  private _processDom({
    $,
    options,
  }: {
    $: cheerio.CheerioAPI;
    options: RequestsOptions;
  }) {
    const { loadedUrl } = options;

    const scrapingOptions: ScrapingOptions = options.scrapingOptions || {
      contentSelector: 'body',
      language: 'ja',
    };

    // replace root element with html
    const { contentSelector = 'body', language = 'ja' } = scrapingOptions;

    const lang = $('html').attr('lang') || language;

    // add lang attribute to html tag
    $('html').attr('lang', lang);

    // scrape article content based on the contentSelector
    const $content = $(contentSelector);
    if ($content.length === 0) {
      console.warn('No content found for selector: ', contentSelector);
      // throw new Error('No content found for selector: ' + contentSelector);
    }

    // replace relative path to absolute path
    replaceAbsoluteUrl($, loadedUrl!);

    // if image too small, remove it
    $('img').each((i, el) => {
      const $el = $(el);
      const width = $el.attr('width');
      const height = $el.attr('height');
      if (width && height && parseInt(width) < 100 && parseInt(height) < 100) {
        $el.remove();
      }
    });

    // remove all scripts and styles
    $content.find('script, style').remove();

    //  flatten the content
    const text = extractDom($content, options);
    const $flattenedContent = $('<div></div>');
    $flattenedContent.append(text);

    // Setting The Viewport, make responsive website
    $('head').append(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    );

    // clean body and append flattened content
    const $body = $('body');
    $body.empty();
    $body.append($flattenedContent);
  }

  private _removeUnnecessaryAttributes($: cheerio.CheerioAPI) {
    // remove all script tags (including inline scripts)
    $('script').remove();

    // TODO: remove unnecessary attributes
  }

  private _applyAnnotation($: cheerio.CheerioAPI, language: string = 'ja') {
    $('img').each((i, el) => {
      // Use @sk-global/scrapeer lib to get image alt text
      // get alt text
      buildImageAnnotation({
        $,
        el,
        language,
      });
    });

    $('table').each((i, el) => {
      buildTableAnnotation({
        $,
        el,
        language,
      });
    });
  }

  private _applyAccessibilityAttributes($: cheerio.CheerioAPI) {
    const $body = $('body');
    // TODO: apply a11y attributes to each element of body
    // from this, tag name is only 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'table', 'img' and 'a'
    // let apply skg style to each element
    $body.find('*').each((i, el) => {
      const $el = $(el);
      const tagName = $el.prop('tagName');
      // remove class attribute
      $el.removeAttr('class');

      switch (tagName) {
        case 'P':
          // TODO: apply a11y attributes to p tag
          buildTextComponent($el);
          break;
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
        case 'H5':
        case 'H6':
          // TODO: apply a11y attributes to heading tag
          buildHeadingComponent($el);
          break;
        case 'UL':
        case 'OL':
          // TODO: apply a11y attributes to list tag
          buildListComponent($el);
          break;
        case 'TABLE':
          // TODO: apply a11y attributes to table tag
          // example, add class to table
          buildTableComponent($el);
          break;
        case 'IMG':
          // TODO: apply a11y attributes to img tag
          buildImageComponent($el);
          break;
        case 'A':
          // TODO: apply a11y attributes to a tag
          buildLinkComponent($el);
          break;
        default:
          break;
      }
    });
  }

  private _applyGoogleAnalytics($: cheerio.CheerioAPI, opt: RequestsOptions) {
    const { googleAnalyticsId } = opt;
    if (googleAnalyticsId) {
      const $head = $('head');
      const $script = $('<script></script>');
      $script.attr('async', 'true');
      $script.attr(
        'src',
        `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
      );
      $head.append($script);

      const $script2 = $('<script></script>');
      $script2.text(`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleAnalyticsId}');`);
      $head.append($script2);
    }
  }

  private _applyCssRules($: cheerio.CheerioAPI, cssRules: string[]) {
    // first, remove head style tag
    $('head style').remove();

    const $body = $('body');

    // TODO: Should use class instead of id
    $body.attr('id', 'skg-style');

    const $head = $('head');
    // remove all link of head addtag, it will be added later
    $head.find('link').remove();

    // apply some required css rules
    $head.append('<link rel="preconnect" href="https://fonts.googleapis.com">');
    $head.append(
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    );

    // apply a11y stylesheets link
    cssRules.forEach((link) => {
      $head.append(`<link rel="stylesheet" href="${link}">`);
    });
  }

  private async _parseHtmlToDom(response: IncomingMessage) {
    return new Promise((resolve, reject) => {
      // https://github.com/fb55/htmlparser2/wiki/Parser-options
      const domHandler = new DomHandler((err, dom) => {
        if (err) reject(err);
        else resolve(dom);
      });

      const parser = new WritableStream(domHandler, { decodeEntities: true });
      response.pipe(parser).on('finish', () => {
        console.log('finish parsing');
      });
    });
  }
}
