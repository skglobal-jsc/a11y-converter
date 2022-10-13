import { A11yConverter } from './src/index';

import { writeFileSync } from 'fs';
(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      url: 'https://vnexpress.net/dao-dien-tran-van-thuy-xa-hoi-can-su-tu-te-tinh-nguoi-4522718.html',
      method: 'GET',
      scrapingOptions: {
        // contentSelector: '#dark_theme > section.section.page-detail.top-detail',
      }
    });

    const { html } = res;
    writeFileSync('./output/a11y.html', html);
  }

  await doConvert();
})();
