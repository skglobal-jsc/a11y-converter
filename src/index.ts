import type { IncomingMessage } from 'node:http';

import * as cheerio from 'cheerio';
import { DomHandler } from 'htmlparser2';
import { WritableStream } from 'htmlparser2/lib/WritableStream';
import { BasicConverter, RequestsOptions } from './basic-converter';

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
];

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

const cleanDom = ($el: cheerio.Cheerio, options: RequestsOptions) => {
  const { loadedUrl } = options;
  let textContent = '';
  // get children
  const $children = $el.children();

  // if there are no children, return the text
  if ($children.length === 0) {
    textContent = cleanText($el.text());
  }

  // if there are children, get the text from each child
  $children.each((i, child) => {
    const $child = $el.children().eq(i);
    // if the child is a text node, return the text
    const tagName = $child.prop('tagName');
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
      textContent += cleanDom($child, options);
    }
  });

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
      body: Buffer;
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
    const { body, isXml, response, contentType, dom, $ } = result;

    options.loadedUrl = response.url;
    // process the dom
    this._processDom({ $, options });

    // remove unnecessary attributes
    this._removeUnnecessaryAttributes($);

    // apply a11y stylesheets and add specific stylesheet for specific project in addition to the common SKG stylesheet
    this._applyCssRules($, options.stylesheets || commonCssLinks);

    // apply a11y attributes
    this._applyAccessibilityAttributes($);

    // apply annotation for img, table tag
    this._applyAnnotation($, options.scrapingOptions?.language);

    return Promise.resolve({
      html: $.html(),
      contentType: contentType.type,
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
    const { scrapingOptions = {}, loadedUrl } = options;
    // get the head
    const head = `<head>${$('head').html()}</head>`;

    // replace root element with html
    const { contentSelector = 'body', language = 'ja' } = scrapingOptions;

    const lang = $('html').attr('lang') || language;

    // scrape article content based on the contentSelector
    const $content = $(contentSelector);
    if ($content.length === 0) {
      console.warn('No content found for selector: ', contentSelector);
      throw new Error('No content found for selector: ' + contentSelector);
    }

    // remove all scripts and styles
    $content.find('script, style').remove();

    //  flatten the content
    const text = cleanDom($content, options);
    const $flattenedContent = $('<div></div>');
    $flattenedContent.append(text);

    const contentHtml = `<body>${$flattenedContent.html() || ''}</body>`;

    const html = `<!DOCTYPE html>

<html lang="${lang}">${head}${contentHtml}</html>`;

    // finally, replace all html with the new html
    $.root().html(html);
  }

  private _removeUnnecessaryAttributes($: cheerio.CheerioAPI) {
    // remove all script tags (including inline scripts)
    $('script').remove();

    // TODO: remove unnecessary attributes
  }

  private _applyAnnotation($: cheerio.CheerioAPI, language: string = 'ja') {
    const wrapAnnotation = ($el: cheerio.Cheerio, child: any) => {
      const $wrapper = $('<div></div>');
      $wrapper.addClass(
        'uv_annotation w3-panel w3-pale-red w3-leftbar w3-rightbar w3-border-red'
      );
      $wrapper.append(child);
      $el.before($wrapper);
    };

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

  private _applyCssRules($: cheerio.CheerioAPI, cssRules: string[]) {
    // first, remove head style tag
    $('head style').remove();

    const $body = $('body');

    // TODO: Should use class instead of id
    $body.attr('id', 'skg-style');

    // remove all link tag with rel="stylesheet"
    $('link[rel="stylesheet"]').remove();

    // apply a11y stylesheets link
    cssRules.forEach((link) => {
      $('head').append(link);
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
