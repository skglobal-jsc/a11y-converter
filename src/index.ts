import { Client, RequestsOptions } from './utils/client';

import { ragtJson2A11Y, editorJson2RagtJson } from './utils/converter';

import {
  html2Text,
  tinyhtml,
  ragtJson2Text,
  htmlSimplified2EditorJson,
} from './modules/index';

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
  editorJson2RagtJson,
  ragtJson2A11Y,
  ragtJson2Text,
  html2Text,
  tinyhtml,
};
