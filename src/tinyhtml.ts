import * as cheerio from 'cheerio';
import { Client, RequestsOptions } from './utils/client';

import {
  _applyCssRules,
  _applyMeta,
  _applyAccessibilityAttributes,
  _applyGoogleAnalytics,
} from './utils/css';
import {
  convertRelativeUrlsToAbsolute,
  executeHookFn,
} from './utils/helper';

const UN_SUPPORTED_TAGS = [
  'audio',
  'canvas',
  'embed',
  'iframe',
  'map',
  'object',
  'svg',
  'video',
  'noscript',
  'script',
  'style',
];

const SECTION_TAGS = [
  'section',
  'article',
  'aside',
  'nav',
  'header',
  'footer',
  'main',
  'div',
  'pre',
  'blockquote',
  'figure',
  'figcaption',
  'button',
  'summary',
  'details',
];

// this is total block tags
const BLOCK_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'table',
  'p',
];

const UN_SUPPORTED_STYLE_TAGS = [
  'em',
  'small',
  'big', // deprecated
  'sub', // deprecated
  'strike',
  'samp',
  's',
];

// this is total block tags
const EDITOR_BLOCK_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'table',
  'p',
  'a',
  'img',
];

export interface ProcessOptions {
  removeComments?: boolean;
  removeEmptyElements?: boolean;
  removeScriptTypeAttributes?: boolean;
  removeOptionalTags?: string[];
  removeSmallImages?: {
    minWidth: number;
    minHeight: number;
  };

  cssLinks?: string[];
  meta?: {};
  lang?: string;
  url?: string; // url of the page
  contentSelectors?: string[]; // selector of the content
  googleAnalyticsId?: string;

  hooks?: {
    before?: string;
    after?: string;
  };
}

const reduceHtml = ($: cheerio.CheerioAPI, opt: ProcessOptions) => {
  // clean head first
  $('head')
    .contents()
    .each((i, el) => {
      if (el.type === 'tag') {
        // remove  all except title
        // we need to keep title because it is used to generate the slug
        if (el.name !== 'title') {
          $(el).remove();
        }
      } else {
        $(el).remove();
      }
    });

  $('body *')
    .contents()
    .each((i, el) => {
      if (el.type === 'tag') {
        // Converts the markup to HTML5 (if it is XHTML for example)
        el.name = el.name.toLowerCase();

        // remove unsupported tags
        if (UN_SUPPORTED_TAGS.includes(el.name)) {
          $(el).remove();
        }

        // if element is a style tag then keep children and remove the style tag
        if (UN_SUPPORTED_STYLE_TAGS.includes(el.name)) {
          $(el).replaceWith($(el).contents());
        }
        // remove optional tags
        if (
          opt.removeOptionalTags &&
          opt.removeOptionalTags.includes(el.name)
        ) {
          $(el).remove();
        }

        // fix dom: make sure inside p tag there is no any block tags
        if (el.name === 'p') {
          $(el)
            .contents()
            .each((i, el) => {
              if (el.type === 'tag' && BLOCK_TAGS.includes(el.name)) {
                $(el).replaceWith($(el).contents());
              }
            });
        }

        // replace section tags with div. section tags are not supported by EditorJS
        if (SECTION_TAGS.includes(el.name)) {
          el.name = 'div';
        }

        // if element is EDITOR_BLOCK_TAGS and parent is div then unwrap the element
        if (EDITOR_BLOCK_TAGS.includes(el.name)) {
          let child = $(el);
          if ($(el).parent().is('div')) {
            $(el).unwrap();
          }
        }

        // remove unnecessary attributes
        const attributes = Object.keys(el.attribs);
        attributes.forEach((key) => {
          if (!['href', 'src', 'alt', 'height', 'width'].includes(key)) {
            delete el.attribs[key];
          }
        });

        // TODO: some cleanup is required here
        // remove empty tags with cheerio, but also keep images:
        if (
          opt.removeEmptyElements &&
          el.name !== 'img' &&
          $(el).find('img').length === 0 &&
          $(el).text().trim().length === 0
        ) {
          $(el).remove();
        }

        // if picture inside [picture] tag then unwrap img from picture
        if (el.name === 'picture') {
          const img = $(el).find('img');
          if (img.length > 0) {
            $(img).unwrap();
          }
        }

        // remove images with small width and height
        if (el.name === 'img' && opt.removeSmallImages) {
          const width = el.attribs.width;
          const height = el.attribs.height;
          if (
            width &&
            height &&
            parseInt(width) < opt.removeSmallImages.minWidth &&
            parseInt(height) < opt.removeSmallImages.minHeight
          ) {
            $(el).remove();
          }
        }
      } else if (el.type === 'text') {
        // if the element is text and parent is div then wrap it with p tag
        const text = $(el).text().trim();
        if (text && el.parent?.type === 'tag' && el.parent?.name == 'div') {
          $(el).wrap('<p></p>');
        }
      } else if (el.type === 'comment') {
        if (opt.removeComments) {
          $(el).remove();
        }
      } else {
        // other types of elements are not supported, e.g. script, style, etc.
        $(el).remove();
        // console.warn(`Unsupported element type: ${el.type}`);
      }
    });

  // step 2: after cleaning the html, the DOM now cleaned
  $('body *').each((i, el) => {
    // if element is SECTION_TAGS then unwrap children of the element
    if (SECTION_TAGS.includes(el.name)) {
      $(el).replaceWith($(el).contents());
    }

    // some image has src is relative path, so we need to add domain to it
    if (el.name === 'img' && opt.url) {
      const src = el.attribs.src;
      if (src) {
        el.attribs.src = convertRelativeUrlsToAbsolute(opt.url, src);
      } else {
        $(el).remove();
      }
    }

    // some links has href is relative path, so we need to add domain to it
    if (el.name === 'a' && opt.url) {
      const href = el.attribs.href;
      if (href) {
        el.attribs.href = convertRelativeUrlsToAbsolute(opt.url, href);
      } else {
        $(el).remove();
      }
    }
  });
};

const tinyhtml = async (html: string, opt?: ProcessOptions) => {
  console.time('tinyhtml');
  const options: ProcessOptions = {
    removeComments: true,
    removeEmptyElements: true,
    removeSmallImages: {
      minWidth: 100,
      minHeight: 100,
    },
    removeOptionalTags: [],
    removeScriptTypeAttributes: true,
    lang: 'en',
    ...opt,
  };

  const cleanedHtml = html
    .replace(/\xA0/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  const $ = cheerio.load(cleanedHtml, { decodeEntities: true }, true);

  // hook to process the DOM
  if (options.hooks?.before) {
    console.time('hooks.beforeProcess');
    // execute the hook
    await executeHookFn(options.hooks.before, $);
    console.timeEnd('hooks.beforeProcess');
  }

  // select the content of the page using contentSelectors. If doesn't exist then select the whole body
  if (options.contentSelectors && options.contentSelectors.length > 0) {
    const $content = $(options.contentSelectors!.join(','));
    const $body = cheerio.load('<body></body>', { decodeEntities: true }, true);
    // append the content to the new body
    $body('body').append($content);
    // replace the body with the new body
    $('body').replaceWith($body('body'));
  }

  // clean and reduce html
  reduceHtml($, options);

  // add lang attribute to html tag
  $('html').attr('lang', $('html').attr('lang') || options.lang || 'en');

  // namespace html tag
  $('html').attr('xmlns', 'http://www.w3.org/1999/xhtml');

  // apply meta tags
  _applyMeta($, options.meta);

  // apply google analytics, if needed
  if (options.googleAnalyticsId) {
    _applyGoogleAnalytics($, options.googleAnalyticsId);
  }

  // apply css
  _applyCssRules($, options.cssLinks);

  // _apply accessibility attributes
  _applyAccessibilityAttributes($);

  console.timeEnd('tinyhtml');

  if (options.hooks?.after) {
    console.time('hooks.afterProcess');
    // execute the hook
    await executeHookFn(options.hooks.after, $);
    console.timeEnd('hooks.afterProcess');
  }

  // append doctype to html
  const htmlString = $.html();

  return htmlString;
};

const fromUrl = async ({
  url,
  requestOpt,
  opt,
}: {
  url: string;
  requestOpt?: RequestsOptions;
  opt?: ProcessOptions;
}) => {
  const requestOptions: RequestsOptions = {
    url,
    method: requestOpt?.method || 'GET',
    headers: requestOpt?.headers || {},
    payload: requestOpt?.payload,
  };
  const client = new Client(requestOptions);
  const { body = '' } = await client.getHtml();
  return tinyhtml(body, { ...opt, url });
};

export { tinyhtml, fromUrl };
