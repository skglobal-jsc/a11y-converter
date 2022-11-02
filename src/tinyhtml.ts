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

const SUPPORTED_BLOCK_TAGS = [
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'table',
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

const removeAttributes = (el: cheerio.Element) => {
  if (el.type === 'tag') {
    const attributes = Object.keys(el.attribs);
    attributes.forEach((key) => {
      if (!['href', 'src', 'alt'].includes(key)) {
        delete el.attribs[key];
      }
    });
  }
};

const reduceHtml = ($: cheerio.CheerioAPI) => {
  $('*').each((i, el) => {
    if (el.type === 'tag') {
      // Converts the markup to HTML5 (if it is XHTML for example)
      el.name = el.name.toLowerCase();

      // replace unsupported tags with p tag
      if (SECTION_TAGS.includes(el.name)) {
        el.name = 'p';
      }

      // Removes: <audio>, <canvas>, <embed>, <iframe>, <map>, <object>, <svg>, <video>
      if (UN_SUPPORTED_TAGS.includes(el.name)) {
        $(el).remove();
      }

      // remove unnecessary attributes
      removeAttributes(el);

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

      // if the element is a img then remove the img if it does not have src attribute
      if (el.name === 'img') {
        if (!el.attribs.src) {
          $(el).remove();
        }
      }

    }


      // if the element is comment then remove it
      if (el.type === 'comment') {
        $(el).remove();
      }
  });

  // Removes: <script>, <style>, <link>, <meta>, <title>, <head>, <html>, <body>
  $('script, style, link, meta, title, head, html, body, comment').remove();

  // Removes comments
  $('*').contents().each((i, el) => {
    if (el.type === 'comment') {
      $(el).remove();
    }
  });
};

const tinyhtml = (html: string) => {
  const $ = cheerio.load(html, { decodeEntities: false }, false);

  // clean and reduce html
  reduceHtml($);

  // create a empty html document
  const doc = cheerio.load(
    '<!DOCTYPE html><html><head></head><body></body></html>',
    { decodeEntities: false },
    true
  );

  // append the reduced html to the empty document
  const body = doc('body');

  // find supported block tags and append them to the body
  const supportedBlockTags = SUPPORTED_BLOCK_TAGS.join(',');
  $(supportedBlockTags).each((i, el) => {
    // get children of the element, if children doest not contain any p tag then append the element to the body
    const children = $(el).children();
    const childrenBlockTags = children.filter('p');
    if (childrenBlockTags.length === 0) {
      const clone = $(el).clone();
      body.append(clone);
    }
  });

  return doc.html();
};

export default tinyhtml;
