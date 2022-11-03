import * as cheerio from 'cheerio';

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

// this is total block tags supported by EditorJS
const SUPPORTED_BLOCK_TAGS = [
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
  'picture',
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

export interface ProcessOptions {
  removeComments: boolean;
  removeEmptyElements: boolean;
  removeScriptTypeAttributes: boolean;
  removeOptionalTags: string[];
  removeSmallImages: {
    minWidth: number;
    minHeight: number;
  };
}

const reduceHtml = ($: cheerio.CheerioAPI, opt: ProcessOptions) => {
  // Removes: <script>, <style>, <link>, <meta>, <title>, <head>, <html>, <body>
  if (opt.removeScriptTypeAttributes) {
    $('script, style, link, meta, title, head, html, body, comment').remove();
  }

  $('*')
    .contents()
    .each((i, el) => {
      // remove optional tags
      if (el.type == 'tag' && opt.removeOptionalTags.includes(el.name)) {
        $(el).remove();
      }

      if (opt.removeComments && el.type === 'comment') {
        $(el).remove();
      }

      // remove empty tags with cheerio, but also keep images:
      if (
        opt.removeEmptyElements &&
        el.type == 'tag' &&
        el.tagName !== 'img' &&
        $(el).find('img').length === 0 &&
        $(el).text().trim().length === 0
      ) {
        $(el).remove();
      }

      // remove images with small width and height
      if (el.type === 'tag' && el.tagName === 'img') {
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
    });

  $('*').each((i, el) => {
    if (el.type === 'tag') {
      // Converts the markup to HTML5 (if it is XHTML for example)
      el.name = el.name.toLowerCase();

      // replace unsupported tags with p tag
      if (SECTION_TAGS.includes(el.name)) {
        el.name = 'div';
      }

      // Removes: <audio>, <canvas>, <embed>, <iframe>, <map>, <object>, <svg>, <video>
      if (UN_SUPPORTED_TAGS.includes(el.name)) {
        $(el).remove();
      }

      // remove unnecessary attributes
      const attributes = Object.keys(el.attribs);
      attributes.forEach((key) => {
        if (!['href', 'src', 'alt', 'height', 'width'].includes(key)) {
          delete el.attribs[key];
        }
      });

      // -----SOME CLEANING-----
      // if picture inside [picture] tag then unwrap img from picture
      if (el.name === 'picture') {
        const img = $(el).find('img');
        if (img.length > 0) {
          $(img).unwrap();
        }
      }

      // if element is a style tag then keep children and remove the style tag
      if (UN_SUPPORTED_STYLE_TAGS.includes(el.name)) {
        $(el).replaceWith($(el).contents());
      }

      // if span has only one child then unwrap the child
      if (el.name === 'span') {
        const children = $(el).children();
        if (children.length === 1) {
          $(children).unwrap();
        }
      }

      // remove empty tags <span></span>, <div></div> etc
      if (Object.keys(el.attribs).length === 0 && el.children.length === 0) {
        // if the element is br then replace it with a space
        if (el.name === 'br') {
          // $(el).replaceWith(' ');
        } else {
          $(el).remove();
        }
      }

      // if the element is a link then remove the link if it does not have href attribute
      if (el.name === 'a') {
        if (!el.attribs.href) {
          $(el).replaceWith($(el).contents());
        }
      }

      // remove all link javascript: links
      if (el.name === 'a' && el.attribs.href.startsWith('javascript:')) {
        $(el).replaceWith($(el).contents());
      }

      // if the element is a img then remove the img if it does not have src attribute
      if (el.name === 'img') {
        if (!el.attribs.src) {
          $(el).remove();
        }
      }

      if (SUPPORTED_BLOCK_TAGS.includes(el.name)) {
        // get parent element
        const parent = $(el).parent();
        const parentId = parent.attr('id');
        if (!parentId) {
          const id = `mock-${i}`;
          $(el).attr('id', id);
        }
      }
    }
  });
};

const tinyhtml = (html: string, opt?: ProcessOptions) => {
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

  const $ = cheerio.load(cleanedHtml, { decodeEntities: false }, false);

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
  $('[id^=mock-]').each((i, el: any) => {
    const clone = $(el).clone();
    clone.removeAttr('id');
    body.append($(clone));
  });

  return doc.html();
};

export default tinyhtml;
