import { fromUrl, editorJson2A11yHtml, html2editorJson } from './src/index';

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
    // 'https://www.city.fukuoka.lg.jp/hofuku/coronavaccine/wakutin.html';
    'http://127.0.0.1:5500/index.html';
    // 'https://www.freecodecamp.org/news/html-tables-table-tutorial-with-css-example-code/';
  const { html, body } = await fromUrl({
    url,
    // opt: {
    //   contentSelectors: ['.post-content'],
    //   hooks: {
    //     before: beforeFn,
    //     after: afterFn,
    //   },
    // },
  });
  await saveHtmlToFile('./data/test1-out.html', html || '');

  const { json, meta: metaOpts } = html2editorJson(html);

  const { html: a11yHtml1, meta } = editorJson2A11yHtml(json, metaOpts);

  // save meta data
  await saveHtmlToFile('./data/test1-json.json', JSON.stringify(json));

  await saveHtmlToFile('./data/test1-ragt.html', a11yHtml1 || '');

  await saveHtmlToFile('./data/test1-meta.json', JSON.stringify(meta));
})();
