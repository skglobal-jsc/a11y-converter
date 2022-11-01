import * as cheerio from 'cheerio';

const ALLOWED_TEXT_TAG_TYPES = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a',
  'p',
  'span',
];

const unwrapHtml = async ($: cheerio.CheerioAPI, el: cheerio.Cheerio<any>) => {
  const $el = $(el);

  // get the children of the element
  const children = $el.children();
  // loop through all children of the element
  children.each((i, child) => {
    const childTagName = child.tagName;

    // get children of the child
    const childChildren = $(child).children();

    // if the child has children
    if (childChildren.length > 0) {
      console.log('child has children', childTagName, childChildren.length);
      // if the child has children, and the child is allowed
      if (ALLOWED_TEXT_TAG_TYPES.includes(childTagName)) {
        // unwrap all children of the child
        unwrapHtml($, $(child));
      } else {
        const c: any = $(child).contents().unwrap();
        unwrapHtml($, c);
      }
    } else {
      // if the child does not have children, it is a leaf node
      console.log('child has no children', childTagName, childChildren.length);
      // if the child is allowed
      if (ALLOWED_TEXT_TAG_TYPES.includes(childTagName)) {
        console.log('child is allowed', childTagName);
        // unwrap the child
        $(child).unwrap();
      } else {
        console.log('child is not allowed', childTagName);
      }
    }
  });
};

const simplifyHtml = async (html: string) => {
  // this function is used to flatten the html to a single line
  const $ = cheerio.load(html, { decodeEntities: false }, true);

  // get all children of the body
  const children = $('body').children();
  console.log('body children', children.length);

  // loop through all children
  children.each((i, el) => {
    unwrapHtml($, $(el));
  });

  // return the html
  return $.html();
};

export default simplifyHtml;
