import jsdom, { JSDOM } from 'jsdom';

const options: jsdom.ConstructorOptions = {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  includeNodeLocations: true,
};

let window: JSDOM['window'];

JSDOM.fromURL(
  'https://d3javs2py746ea.cloudfront.net/ragt-editor/a11y.html',
  options
).then(async (dom) => {
  window = dom.window;
});

export const renderHtmlToEditor = async (html: string) => {
  // render the html
  window.editor.blocks.renderFromHTML(html);

  // save the data
  const data = await window.editor.save();

  // return the data
  return data;
};
