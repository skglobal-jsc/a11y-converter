import { A11yConverter } from './src/index';

import { writeFileSync } from 'fs';
(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      url: 'https://skg-development-dev.s3.ap-southeast-1.amazonaws.com/public/original.html',
      method: 'GET',
      scrapingOptions: {
        // contentSelector: '#dark_theme > section.section.page-detail.top-detail',
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
