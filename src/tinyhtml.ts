import * as cheerio from 'cheerio';

import {
  _applyCssRules,
  _applyMeta,
  _applyAccessibilityAttributes,
} from './utils/css';

const UN_SUPPORTED_TAGS = [
  'audio',
  'canvas',
  'embed',
  'iframe',
  'map',
  'object',
  'svg',
  'video',
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
  removeComments: boolean;
  removeEmptyElements: boolean;
  removeScriptTypeAttributes: boolean;
  removeOptionalTags: string[];
  removeSmallImages: {
    minWidth: number;
    minHeight: number;
  };
  cssLinks?: string[];
  meta?: {};
}

const reduceHtml = ($: cheerio.CheerioAPI, opt: ProcessOptions) => {
  if (opt.removeScriptTypeAttributes) {
    const $head = $('head');
    $head.find('link').remove();
    $head.find('script').remove();
    $head.find('style').remove();
  }

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
        if (opt.removeOptionalTags.includes(el.name)) {
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
          if ($(el).parent().is('div')) {
            $(el).unwrap();
          }
        }

        // remove empty tags with cheerio, but also keep images:
        if (
          opt.removeEmptyElements &&
          el.name !== 'img' &&
          $(el).find('img').length === 0 &&
          $(el).text().trim().length === 0
        ) {
          $(el).remove();
        }

        // remove unnecessary attributes
        const attributes = Object.keys(el.attribs);
        attributes.forEach((key) => {
          if (!['href', 'src', 'alt', 'height', 'width', 'id'].includes(key)) {
            delete el.attribs[key];
          }
        });

        // TODO: some cleanup is required here
        // if picture inside [picture] tag then unwrap img from picture
        if (el.name === 'picture') {
          const img = $(el).find('img');
          if (img.length > 0) {
            $(img).unwrap();
          }
        }

        // remove images with small width and height
        if (el.name === 'img') {
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
      }
    });

  // step 2: after cleaning the html, the DOM now cleaned
  $('body')
    .children()
    .each((i, el) => {
      // if element is SECTION_TAGS then unwrap children of the element
      if (SECTION_TAGS.includes(el.name)) {
        $(el).replaceWith($(el).contents());
      }
    });
};

const tinyhtml = (html: string, opt?: ProcessOptions) => {
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
    ...opt,
  };

  const cleanedHtml = html
    .replace(/\xA0/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  const $ = cheerio.load(cleanedHtml, { decodeEntities: true }, true);

  // clean and reduce html
  reduceHtml($, options);

  // create a empty html document
  const doc = cheerio.load(
    '<!DOCTYPE html><html><head></head><body></body></html>',
    { decodeEntities: false },
    true
  );

  // append the reduced html to the empty document
  const body = doc('body');

  // find supported block tags and append them to the body
  // $('[id^=mock-]').each((i, el: any) => {
  //   const clone = $(el).clone();
  //   clone.removeAttr('id');
  //   body.append($(clone));
  // });

  // apply meta tags
  // _applyMeta(doc, options.meta);

  // apply css
  // _applyCssRules(doc, options.cssLinks);

  // _apply accessibility attributes
  // _applyAccessibilityAttributes(doc);

  console.timeEnd('tinyhtml');
  return $.html();
};

export default tinyhtml;
