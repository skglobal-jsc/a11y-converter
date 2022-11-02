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

      // Replaces: <article> with <div>, <aside> with <div>, <footer> with <div>, <header> with <div>, <nav> with <div>, <section> with <div> (if the tag is not supported by the browser)
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

      // if span has only one child then unwrap the child
      if (el.name === 'span') {
        const children = $(el).children();
        if (children.length === 1) {
          $(children).unwrap();
        }
      }

      // remove empty tags <span></span>, <div></div> etc (if the tag is empty and does not contain any attributes or text)
      if (Object.keys(el.attribs).length === 0 && el.children.length === 0) {
        console.log('removing empty tag', el.name);
        $(el).remove();
      }
    }
  });

  // Removes: <script>, <style>, <link>, <meta>, <title>, <head>, <html>, <body>
  $('script, style, link, meta, title, head, html, body').remove();

  // Removes comments
  $('*').contents().each((i, el) => {
    if (el.type === 'comment') {
      $(el).remove();
    }

    // if type is text and text is empty then remove the element
    if (el.type === 'text' && el.data.trim() === '') {
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
      // Removes: <script>, <style>, <link>, <meta>, <title>, <head>, <html>, <body>
      const clone = $(el).clone();
      body.append(clone);
    }
  });

  return doc.html();
};

export default tinyhtml;
