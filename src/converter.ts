import * as cheerio from 'cheerio';

const ALLOWED_TEXT_TAG_TYPES = [
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'P',
  'TABLE',
  'DIV',
  'A',
  'UL',
  'OL',
];
const simplifyHtml = async (html: string) => {
  // this function is used to flatten the html to a single line
  const $ = cheerio.load(html, { decodeEntities: false }, false);

  // https://cheerio.js.org/classes/Cheerio.html#unwrap
  // loop through all the elements and unwrap them
  $('*').each((i, el) => {
    // get the tag name of the element
    const tagName = $(el).prop('tagName');

    let children = $(el).children();
    let hasChildren = children.length > 0;


    console.group('processing:', tagName);

    // loop until no more children
    while (hasChildren) {
      // get the first child
      const child = children.first();

      // get the child's tag name
      const childTagName = child.prop('tagName') || '';

      console.log('child tag', childTagName);

      // if the child is a text tag, then unwrap it
      if (ALLOWED_TEXT_TAG_TYPES.includes(childTagName)) {
        child.unwrap();
      }

      const newChildren = $(el).children();

      // if the new children is the same as the old children, then we're done
      if (newChildren.length === children.length) {
        console.log('---DONE---');
        hasChildren = false;
      } else {
        // otherwise, set the new children as the children
        children = newChildren;
      }

      // if the element has no children, then we're done
      if (children.length === 0) {
        hasChildren = false;
      }
    }

    console.groupEnd();
  });

  // return the html
  return $.html();
};

export default simplifyHtml;
