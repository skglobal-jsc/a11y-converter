import * as cheerio from 'cheerio';
import * as url from 'url';
import { MetaOptions } from './converter';

export const convertRelativeUrlsToAbsolute = (
  baseUrl: string,
  href: string
) => {
  const parsedUrl = url.parse(href);
  if (!parsedUrl.host) {
    return url.resolve(baseUrl, href);
  }
  return href;
};

const evalFunction = (extendOutputFunction: string) => {
  let extendOutputFunctionEvaled: any;
  if (extendOutputFunction) {
    try {
      extendOutputFunctionEvaled = eval(extendOutputFunction);
    } catch (e) {
      throw new Error(
        `extendOutputFunction is not a valid JavaScript! Error: ${e}`
      );
    }
    if (typeof extendOutputFunctionEvaled !== 'function') {
      throw new Error(
        `extendOutputFunction is not a function! Please fix it or use just default output!`
      );
    }
  }
  return extendOutputFunctionEvaled;
};

export const executeHookFn = async (
  extendOutputFunction: string,
  $: cheerio.CheerioAPI
) => {
  try {
    const fn = evalFunction(extendOutputFunction);
    await fn($);
  } catch (e) {
    console.warn(
      `extendOutputFunction crashed! Pushing default output. Please fix your function if you want to update the output. Error: ${e}`
    );
    throw e;
  }
};

export const buildMetaOptions = (opt: {
  lang?: string;
  title?: string;
  description?: string;
  keywords?: string;
  favicon?: string;
  image?: string;
  type?: string;
}): MetaOptions => {
  const metaOptions: MetaOptions = {
    lang: opt?.lang ?? '',
  };
  metaOptions.meta = {
    ...(!!opt.description && { description: opt.description }),
    ...(!!opt.keywords && { keywords: opt.keywords }),
  };
  metaOptions.socialMeta = {
    ...(!!opt.title && { 'og:title': opt.title }),
    ...(!!opt.description && { 'og:description': opt.description }),
    ...(!!opt.image && { 'og:image': opt.image }),
    ...(!!opt.type && { 'og:type': opt.type }),
  };
  !!opt.title && (metaOptions.title = opt.title);
  !!opt.favicon && (metaOptions.favicon = opt.favicon);

  return metaOptions;
};
