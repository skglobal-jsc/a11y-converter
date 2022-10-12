import { A11yConverter } from './src/index';

import { writeFileSync } from 'fs';
(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      url: 'https://vnexpress.net/nhieu-nguoi-ha-noi-do-di-mua-xang-trong-dem-4522222.html',
      method: 'GET',
      scrapingOptions: {
        contentSelector: 'div.sidebar-1',
      }
    });

    const { html } = res;
    writeFileSync('./output/a11y.html', html);
  }

  await doConvert();
})();
