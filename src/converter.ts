import * as cheerio from 'cheerio';

const cleanText = (text: string = '') => {
  const txt = text
    .replace(/  *\n/g, '\n')
    .replace(/\s+\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (txt !== '') {
    return `<p>${txt}</p>`;
  }
  return '';
};

const unwrapHtml = ($: cheerio.CheerioAPI, el: cheerio.Cheerio<any>) => {
  const contents = el.contents();

  let description = '';
  contents
    .filter((i, el) => {
      // filter out empty text nodes
      if (el.type === 'text' && el.data.trim() === '') {
        return false;
      }
      return true;
    })
    .each((i, child) => {
      const { type } = child;
      const $child = $(child);
      // if the element is a text node
      if (type === 'text') {
        description += cleanText($child.text());
      }

      // if the element is a tag
      if (type === 'tag') {
        // get the tag name
        const tagName = child.name;
        // const attr = $child.attr();
        // console.group('+', tagName, JSON.stringify(attr));

        switch (tagName) {
          // if the tag is a paragraph
          case 'p':
            description += cleanText($child.text());
            break;
          // if the tag is a heading
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            description += $.html($child);
            break;

          // if the tag is a list
          case 'span':
          case 'td':
          case 'th':
          case 'ul':
          case 'ol':
          case 'li':
          case 'dl':
          case 'dd':
          case 'dt':
          case 'section':
            description += $.html($child);
            break;

          // if the tag is a table
          case 'table':
            description += $.html($child);
            break;
          // if the tag is an image
          case 'img':
            description += $.html($child);
            break;
          default:
            description += unwrapHtml($, $child);
            break;
        }
      }
    });

  return description;
};

const simplifyHtml = async (html: string) => {
  // this function is used to flatten the html to a single line
  const $ = cheerio.load(html, { decodeEntities: false }, true);

  // get all children of the body
  const children = $('body').contents();
  let description = '';
  children
    .filter((i, el) => {
      // filter out empty text nodes
      if (el.type === 'text' && el.data.trim() === '') {
        return false;
      }
      return true;
    })
    .each((i, el) => {
      const { type } = el;
      // get tag name of the element
      description += unwrapHtml($, $(el));
    });

  // return the html
  // return $.html();
  return description;
};

export default simplifyHtml;
