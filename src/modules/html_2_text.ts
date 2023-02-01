import tinyhtml from './tiny_html';
import htmlSimplified2EditorJson from './html_simplified_2_editor_json';
import ragtJson2Text from './ragt_json_2_text';

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
  iArticle,
}: {
  html: string;
  contentSelectors?: string[];
  iArticle: IArticle;
}) => {
  // Step1: Simplify html
  const { html: htmlSimplified } = await tinyhtml(html, { contentSelectors });

  // Step2: Convert html simplified to ragt json
  const ragtJson = htmlSimplified2EditorJson(htmlSimplified);

  // Step3: Convert ragt json to plain text
  const plainText = ragtJson2Text({ ragtJson, iArticle });

  return plainText;
};

export default html2Text;
