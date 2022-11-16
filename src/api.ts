import jsdom, { JSDOM } from 'jsdom';

const options: jsdom.ConstructorOptions = {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  includeNodeLocations: true,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitUntil = async (condition: () => boolean, timeout = 10000) => {
  const start = Date.now();
  while (!condition()) {
    if (Date.now() - start > timeout) {
      throw new Error('Timeout');
    }
    await sleep(100);
  }
};

let window: JSDOM['window'] | null = null;

if (!window) {
  // re-use the same window for all tests in order to save time
  console.log('Creating new JSDOM instance...');
  JSDOM.fromURL(
    'https://d3javs2py746ea.cloudfront.net/ragt-editor/ragt.html',
    options
  ).then(async (dom) => {
    window = dom.window;
  });
}

export const renderHtmlToEditor = async (html: string) => {
  // wait until the window is ready
  await waitUntil(() => !!window?.editor);

  // render the html
  window?.editor.blocks.renderFromHTML(html);

  // save the data
  const data = await window?.editor.save();

  // return the data
  return data;
};
