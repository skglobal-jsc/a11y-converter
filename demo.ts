import { A11yConverter } from './src/index';

import { writeFileSync } from 'fs';
(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      url: 'https://www.city.fukuoka.lg.jp/bousai/bichikusokushinweek.html',
      method: 'GET',
      scrapingOptions: {
        contentSelector: 'body > div.tpl1 > div > div.tpl1-1-2 > div > div',
      },
      // extendFunction: async ({ html, $, contentType }) => {},
      extendFunction: ({ $ }) => {
        console.log('extendFunction');
        // add class to table
        $('table').addClass('uv_binh111');
      },
    });

    const { html } = res;
    writeFileSync('./output/a11y.html', html);
  }

  await doConvert();
})();
