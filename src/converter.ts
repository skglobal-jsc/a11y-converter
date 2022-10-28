import * as cheerio from 'cheerio';

const simplifyHtml = async (html: string) => {
  // this function is used to flatten the html to a single line
  const $ = cheerio.load(html, { decodeEntities: false }, false);

  // https://cheerio.js.org/classes/Cheerio.html#unwrap

  // loop through all the elements and unwrap them from their parents
  // this will flatten the html to a single line
  $('* p').each((i, el) => {
    $(el).unwrap();
  });

  // return the html
  return $.html();
};

export default simplifyHtml;
