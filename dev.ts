import { tinyhtml, fromUrl } from './src/tinyhtml';

import { readFile, writeFile } from 'fs';

const loadHtmlFromFile = async (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
};

const saveHtmlToFile = async (path: string, html: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    writeFile(path, html, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

(async () => {
  const url =
    'https://skg-development-dev.s3.ap-southeast-1.amazonaws.com/public/original.html';
  const res = await fromUrl({
    url,
    opt: {
      contentSelectors: ['main'],
      url,
      hooks: {
        beforeProcess: async ($) => {},
        afterProcess: async ($) => {},
      },
    },
  });
  await saveHtmlToFile('./data/test1-out.html', res);
})();
