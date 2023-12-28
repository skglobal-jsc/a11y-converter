import { Client, RequestsOptions } from './utils/client';

import {
  html2Text,
  tinyhtml,
  json2Text,
  htmlSimplified2EditorJson,
  htmlSimplified2RagtJson,
} from './modules';
import { IArticle } from './@types';
import { editorJson2RagtJson } from './modules/editor_json_2_ragt_json';
import { ragtJson2A11Y } from './modules/ragt_json_2_a11y';

export interface ProcessOptions {
  removeComments?: boolean;
  removeEmptyElements?: boolean;
  removeScriptTypeAttributes?: boolean;
  removeOptionalTags?: string[];
  removeSmallImages?: {
    minWidth: number;
    minHeight: number;
  };
  url?: string; // url of the page
  contentSelectors?: string[];
  titleSelector?: string; // selector of the content
  iArticle?: IArticle | null;
  hooks?: {
    before?: string;
    after?: string;
  };
}

const fromUrl = async ({
  url,
  requestOpt,
  opt,
}: {
  url: string;
  requestOpt?: RequestsOptions;
  opt?: ProcessOptions;
}) => {
  const requestOptions: RequestsOptions = {
    url,
    method: requestOpt?.method || 'GET',
    headers: requestOpt?.headers || {},
    payload: requestOpt?.payload,
  };
  const client = new Client(requestOptions);
  const { body = '' } = await client.getHtml();
  return tinyhtml(body, { ...opt, url });
};

export {
  fromUrl,
  htmlSimplified2EditorJson,
  htmlSimplified2RagtJson,
  editorJson2RagtJson,
  ragtJson2A11Y,
  json2Text,
  html2Text,
  tinyhtml,
};
