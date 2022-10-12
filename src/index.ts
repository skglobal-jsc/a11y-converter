import type { IncomingMessage } from 'node:http';

import * as cheerio from 'cheerio';
import { DomHandler } from 'htmlparser2';
import { WritableStream } from 'htmlparser2/lib/WritableStream';
import {
  BasicConverter,
  RequestsOptions,
  ScrapingOptions,
} from './basic-converter';

import { commonCssLinks, uvCss } from './utils/index';
import { parseTable } from '@sk-global/scrapeer';

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
      dom: any; // TODO: type this
      $: cheerio.CheerioAPI;
    };
    options: RequestsOptions;
  }): Promise<any> {
    const { body, isXml, response, contentType, dom, $ } = result;

    // remove unnecessary attributes
    this._removeUnnecessaryAttributes($);

    // apply a11y stylesheets and add specific stylesheet for specific project in addition to the common SKG stylesheet
    this._applyCssRules($, []);

    // apply a11y attributes
    this._applyAccessibilityAttributes($, options.scrapingOptions);

    // apply annotation for img, table tag
    this._applyAnnotation($);

    // finally, get the html
    const html = $.html();
    return Promise.resolve(html);
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

  private _removeUnnecessaryAttributes($: cheerio.CheerioAPI) {
    // remove all script tag. TODO: should remove only script tag in head?
    $('script').remove();
    // $('head script').remove();

    // remove link tag with rel="preconnect" or rel="dns-prefetch"
    // $('link[rel="preconnect"], link[rel="dns-prefetch"]').remove();

    // remove google tag manager script, google analytics script
    // $('script[src*="googletagmanager.com"], script[src*="google-analytics.com"]').remove();

    // TODO: remove unnecessary attributes
  }

  private _applyAnnotation($: cheerio.CheerioAPI) {
    const wrapAnnotation = ($el: cheerio.Cheerio, child: any) => {
      const $wrapper = $('<div></div>');
      $wrapper.addClass(
        'uv_annotation w3-panel w3-pale-red w3-leftbar w3-rightbar w3-border-red'
      );
      $wrapper.append(child);
      $el.before($wrapper);
    };
    // TODO: apply annotation for img, table tag
    $('img').each((i, el) => {
      // TODO: apply annotation for img tag
      // Use @sk-global/scrapeer lib to get image alt text
      // get alt text
      const altText = $(el).attr('alt');
      if (altText) {
        // apply annotation for img tag
        wrapAnnotation($(el), `<p>ここに「${altText}」の画像があります。</p>`);
      }
    });

    $('table').each((i, el) => {
      // TODO: apply annotation for table tag
      // use @sk-global/scrapeer lib to get table data and build annotation
      const data = parseTable($, el);
      if (data) {
        // build annotation
        const texts = [
          `この下に、縦${data.totalRows}行、横${data.totalCols}列の表があります。`,
          `表のタイトルは「${data.caption}」です。`,
          ...data.rows.map((row) => {
            if (row.index === 1) {
              return [`データの1行目`, ...row.cols].join('、');
            }
            return [`${row.index}行目`, ...row.cols].join('、');
          }),
        ];
        const text = texts.map((t) => `<p>${t}</p>`).join('');
        wrapAnnotation($(el), text);
      }
      // wrap with skg-style table and skip speaking
      $(el).wrap('<div class="uv_table" aria-hidden="true"></div>');
    });
  }

  private _applyAccessibilityAttributes(
    $: cheerio.CheerioAPI,
    options: ScrapingOptions = {}
  ) {
    const { contentSelector = 'body', language = 'ja' } = options;

    // scrape article content based on the contentSelector
    const $content = $(contentSelector);
    if ($content.length === 0) {
      console.warn('No content found for selector: ', contentSelector);
      throw new Error('No content found for selector: ' + contentSelector);
    }

    //  flatten the content
    // const $flattenedContent = this._flattenContent($, $content);

    const contentHtml = $content.html() || '';

    // find body and replace content with body
    let $body = $('body');
    // if body is not found, create body
    if ($body.length === 0) {
      // create body tag
      $body = $('<body></body>');
    }
    $body.empty(); // remove all children
    $body.append(contentHtml); // append content collected from contentSelector

    // TODO: apply common attributes
    $body.attr('aria-label', 'SKG');

    // TODO: Should use class instead of id
    $body.attr('id', 'skg-style');

    // TODO: apply a11y attributes to each element of body
    $body.find('*').each((i, el) => {
      const $el = $(el);
      const tagName = $el.prop('tagName');
      const className = $el.attr('class');
      // console.log(tagName, className);
    });

    // Build final html
    let $html = $('html');
    if ($html.length === 0) {
      // create html tag
      $html = $('<html></html>');
    }
    // add lang attribute to html
    $html.attr('lang', $html.attr('lang') || language);

    // append head and body to html
    $html.append($('head').html() || '');
    $html.append($body);

    // doctype html is required for a11y
    const doctype = '<!DOCTYPE html>';
    const html = doctype + $html.html();

    // finally, replace all html with the new html
    $.root().html(html);
  }

  private _applyCssRules($: cheerio.CheerioAPI, cssRules: string[]) {
    // first, remove head style tag
    $('head style').remove();

    // remove all link tag with rel="stylesheet"
    $('link[rel="stylesheet"]').remove();

    // apply a11y stylesheets link
    commonCssLinks.forEach((link) => {
      $('head').append(link);
    });

    // apply SKG template CSS
    $('head').append(uvCss);

    // apply CSS for this project only
    cssRules.forEach((cssRule) => {
      $('head').append(`<style>${cssRule}</style>`);
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
