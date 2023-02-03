import tinyhtml from './tiny_html';
import htmlSimplified2EditorJson from './html_simplified_2_editor_json';
import editorJson2Text from './editor_json_2_text';
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
}: {
  html: string;
  contentSelectors?: string[];
  titleSelector?: string;
  iArticle: IArticle;
}) => {
  // Step1: Simplify html
  const { html: htmlSimplified } = await tinyhtml(html, {
    contentSelectors,
    titleSelector,
  });

  // Step2: Convert html simplified to ragt json
  const editorJson = htmlSimplified2EditorJson(htmlSimplified);

  // Step3: Convert editor json to plain text
  const plainText = editorJson2Text({ editorJson: editorJson, iArticle });

  // Step4: Convert editor json 2 ragt json
  const ragtJson = editorJson2RagtJson(editorJson);

  // Step4: Convert ragt json to a11y
  const a11yHTML = ragtJson2A11Y(ragtJson);

  return { plainText, a11yHTML };
};

export default html2Text;
