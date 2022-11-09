import { tinyhtml, fromUrl, editorJson2A11yHtml } from './src/index';

import { renderHtmlToEditor } from './src/api';

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
  const beforeFn = ` ($) => {
    console.log('beforeFn hook');
  }`;
  const afterFn = ` ($) => {
    console.log('afterrr hook');
  }`;
  const url =
    'https://skg-development-dev.s3.ap-southeast-1.amazonaws.com/public/original.html';
  const { html, body } = await fromUrl({
    url,
    opt: {
      contentSelectors: ['main'],
      hooks: {
        before: beforeFn,
        after: afterFn,
      },
    },
  });
  await saveHtmlToFile('./data/test1-out.html', html || '');

  const data = await renderHtmlToEditor(body || '');

  console.log(data);
})();
