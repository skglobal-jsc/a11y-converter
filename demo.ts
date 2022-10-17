import { A11yConverter } from './src/index';

import { writeFileSync } from 'fs';
(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      url: 'https://www.jiji.com/jc/article?k=2022101700794&g=pol',
      method: 'GET',
      scrapingOptions: {
        contentSelector: '#Main > div.MainInner.Individual > article',
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
