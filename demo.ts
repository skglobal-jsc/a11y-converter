import { A11yConverter } from './src/index';

import { writeFileSync } from 'fs';
(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      url: 'https://univoice-test.s3.ap-northeast-1.amazonaws.com/sample_original.html',
      method: 'GET',
      scrapingOptions: {
        contentSelector: 'main',
      }
    });

    const { html } = res;
    writeFileSync('./output/a11y.html', html);
  }

  await doConvert();
})();
