import { version } from '../../package.json';

import tinyhtml from './tiny_html';
import htmlSimplified2EditorJson from './html_simplified_2_editor_json';
import json2Text from './json_2_text';
import RagtService from '../services/ragt';
import { A11YSetting, IArticle } from '../@types';
import { editorJson2RagtJson } from './editor_json_2_ragt_json';
import { ragtJson2A11Y } from './ragt_json_2_a11y';

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
  a11ySetting?: A11YSetting;
}) => {
  try {
    console.log('Version: ', version);

    // Step1: Simplify html
    const { html: simplifiedHTML } = await tinyhtml(html, {
      contentSelectors,
      titleSelector,
      iArticle,
    });

    // Step2: Convert html simplified to ragt json
    const editorJson = await htmlSimplified2EditorJson(simplifiedHTML);

    // Step4: Convert editor json 2 ragt json
    const ragtJson = await editorJson2RagtJson(editorJson);

    const playerBar = a11ySetting?.playerBar || {};
    let ragtRes;
    if (playerBar?.isEnable && playerBar?.ragtApiKey) {
      const ragtApi = new RagtService({
        ragtApiKey: playerBar?.ragtApiKey,
      });
      ragtRes = await ragtApi.upsertMetadata({
        data: { json: ragtJson, html: '<html></html>' },
      });
    }
    // Step3: Convert editor json to plain text
    const plainText = await json2Text({ json: ragtJson, iArticle });

    // Step4: Convert ragt json to a11y
    const a11yHTML = await ragtJson2A11Y(ragtJson, {
      ...a11ySetting,
      playerBar: { ...(a11ySetting?.playerBar || {}), id: ragtRes?.id },
    });

    return { plainText, a11yHTML, simplifiedHTML, ragtJson };
  } catch (error) {
    return {};
  }
};

export default html2Text;
