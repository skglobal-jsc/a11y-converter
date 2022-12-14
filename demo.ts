import { A11yConverter } from './src/index';

import { writeFileSync } from 'fs';
(async () => {
  const a11yConverter = new A11yConverter();
  const res = await a11yConverter.convert({
    url: 'https://skg-development-dev.s3.ap-southeast-1.amazonaws.com/public/original.html',
    method: 'GET',
  });

  const { html } = res;
  writeFileSync('output.html', html);
})();
