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
    'https://www.city.fukuoka.lg.jp/hofuku/coronavaccine/wakutin.html';
  const res = await fromUrl({
    url,
    opt: {
      contentSelectors: ['.wb-contents'],
      url,
    },
  });
  await saveHtmlToFile('./data/test1-out.html', res);
})();
