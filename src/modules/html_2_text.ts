import tinyhtml from './tiny_html';
import htmlSimplified2EditorJson from './html_simplified_2_editor_json';
import json2Text from './json_2_text';
import { editorJson2RagtJson, ragtJson2A11Y } from '../utils/converter';

export interface IArticle {
  id?: string;
  title: string;
  publishDate: string;
  crawledAt?: string;
  URL?: string;
  description?: string;
  thumbnailURL?: string;
  topic?: string | string[];
  loadedUrl?: string;

  // IF can be added many more fields
  [key: string]: any;
}

const html2Text = async ({
  html,
  contentSelectors,
  titleSelector,
  iArticle,
  a11ySetting,
}: {
  html: string;
  contentSelectors?: string[];
  titleSelector?: string;
  iArticle: IArticle;
  a11ySetting?: {
    lang?: string;
    cssLinks?: string[];
    meta?: {};
    socialMeta?: {};
    favicon?: string;
    googleAnalyticsId?: string;
  };
}) => {
  // Step1: Simplify html
  const { html: simplifiedHTML } = await tinyhtml(html, {
    contentSelectors,
    titleSelector,
    iArticle
  });

  // Step2: Convert html simplified to ragt json
  const editorJson = await htmlSimplified2EditorJson(simplifiedHTML);

  // Step3: Convert editor json to plain text
  const plainText = await json2Text({ json: editorJson, iArticle });

  // Step4: Convert editor json 2 ragt json
  const ragtJson = await editorJson2RagtJson(editorJson);

  // Step4: Convert ragt json to a11y
  const a11yHTML = await ragtJson2A11Y(ragtJson, a11ySetting);

  return { plainText, a11yHTML, simplifiedHTML };
};

export default html2Text;
