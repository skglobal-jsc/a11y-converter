import { tinyhtml, fromUrl, editorJson2A11yHtml } from './src/index';

import { renderHtmlToEditor } from './src/api';

import { readFile, writeFile } from 'fs';
import { MetaOptions } from './src/utils/converter';

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
    'https://www.city.fukuoka.lg.jp/hofuku/coronavaccine/wakutin.html';
  const { html, body } = await fromUrl({
    url,
    opt: {
      contentSelectors: ['.wb-contents'],
      hooks: {
        before: beforeFn,
        after: afterFn,
      },
    },
  });
  await saveHtmlToFile('./data/test1-out.html', html || '');

  const data = await renderHtmlToEditor(body || '');

  const metaOpts: MetaOptions = {};

  const { html: a11yHtml, meta } = editorJson2A11yHtml(data, metaOpts);

  // save meta data
  await saveHtmlToFile('./data/test1-meta.json', JSON.stringify(meta));

  await saveHtmlToFile('./data/test2-ragt.html', a11yHtml || '');
})();
