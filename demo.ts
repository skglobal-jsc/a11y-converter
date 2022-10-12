import { A11yConverter } from './src/index';

import { writeFileSync } from 'fs';
(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      url: 'https://vnexpress.net/chu-tich-nuoc-phai-giai-quyet-dut-diem-quy-hoach-treo-o-cu-chi-4522305.html',
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
