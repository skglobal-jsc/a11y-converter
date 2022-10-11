import type { IncomingMessage } from 'node:http';

import * as cheerio from 'cheerio';
import { DomHandler } from 'htmlparser2';
import { WritableStream } from 'htmlparser2/lib/WritableStream';
import { BasicConverter, RequestsOptions } from './basic-converter';

import { commonCssLinks, uvCss } from './utils/index';
// const { parseTable } = require('@sk-global/scrapeer');

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
    this._applyAccessibilityAttributes($);

    // apply annotation for img, table tag
    this._applyAnnotation($);

    // finally, get the html
    const html = $.html();
    return Promise.resolve(html);
  }

  private _removeUnnecessaryAttributes($: cheerio.CheerioAPI) {
    // remove script tag
    $('script').remove();

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
      // const data = parseTable($, el);
      // if (data) {
      //   // add annotation before table
      wrapAnnotation($(el), `<p>ここに表があります。</p>`);
      // }
      // wrap with skg-style table and skip speaking
      $(el).wrap('<div class="uv_table" aria-hidden="true"></div>');
    });
  }

  private _applyAccessibilityAttributes($: cheerio.CheerioAPI) {
    // TODO: apply common attributes
    $('body').attr('role', 'document');
    $('body').attr('aria-label', 'SKG');
    $('body').attr('lang', 'ja');

    // apply a11y attributes to each element of body
    $('body *').each((i, el) => {
      const $el = $(el);
      const tagName = $el.prop('tagName');
      const className = $el.attr('class');

      // TODO: apply a11y attributes to each element
      // console.log(tagName, className);
    });
  }

  private _applyCssRules($: cheerio.CheerioAPI, cssRules: string[]) {
    // first, remove all stylesheets of original html
    $('head link').each((i, el) => {
      const $el = $(el);
      if ($el.attr('rel') === 'stylesheet') {
        $el.remove();
      }
    });

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
