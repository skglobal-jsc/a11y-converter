import { A11yConverter } from './src/index';

import Html2Blocks from './src/main';

import { writeFileSync } from 'fs';

import cheerio from 'cheerio';

const axios = require('axios');

const fetchHtml = async (url: string, contentSelector: string[] = ['body']) => {
  const res = await axios.get(url);

  const html = res.data;

  // load html into cheerio
  const $ = cheerio.load(html);

  // loop through each content selector and get the html
  const content = contentSelector.map((selector) => $(selector).html());

  return content.join('');
};

(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      url: 'https://www.jiji.com/jc/article?k=2022101700794&g=pol',
      loadedUrl: 'https://www.jiji.com/jc/article?k=2022100501260&g=pol',
      method: 'GET',
      googleAnalyticsId: 'UA-XXXXX-Y',
      scrapingOptions: {
        contentSelector: '#11',
      },
      // extendFunction: async ({ html, $, contentType }) => {},
      extendFunction: ({ $ }) => {
        console.log('extendFunction');
        // add class to table
        // $('table').addClass('uv_binh111');
      },
      stylesheets: [
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,300&display=swap',
      ],
    });

    const { html } = res;
    writeFileSync('./output/a11y.html', html);
  }

  async function htmltoBlocks(html: string) {
    const htmlToBlocks = new Html2Blocks();
    const blocks = await htmlToBlocks.convert(html);
    writeFileSync('./output/a11y.json', JSON.stringify(blocks, null, 2));
  }

  const selectors = [
    '#main'
  ];
  const html = await fetchHtml(
    'https://univoice-test.s3.ap-northeast-1.amazonaws.com/sample_a11y.html',
    selectors
  );

  await htmltoBlocks(html);
})();
