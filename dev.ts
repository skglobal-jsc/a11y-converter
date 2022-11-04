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
  const res = await fromUrl({
    url: 'https://vnexpress.net/g7-va-australia-nhat-tri-ap-gia-co-dinh-voi-dau-nga-4532045.html',
    opt: {
      contentSelectors: [
        '#dark_theme > section.section.page-detail.top-detail > div > div.sidebar-1 > h1',
        '#dark_theme > section.section.page-detail.top-detail > div > div.sidebar-1 > p',
        '#dark_theme > section.section.page-detail.top-detail > div > div.sidebar-1 > article'
      ],
    },
  });
  await saveHtmlToFile('./data/test1-out.html', res);
})();
