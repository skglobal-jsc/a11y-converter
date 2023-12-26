import { MetaOptions } from '../@types';
import * as cheerio from 'cheerio';
import * as url from 'url';

export const convertRelativeUrlsToAbsolute = (
  baseUrl: string = '',
  href: string = ''
) => {
  const parsedUrl = url.parse(href);
  if (!parsedUrl.host) {
    return url.resolve(baseUrl, href);
  }
  return href;
};

const evalFunction = (extendOutputFunction: string) => {
  let extendOutputFunctionEvaluated: any;
  if (extendOutputFunction) {
    try {
      extendOutputFunctionEvaluated = eval(extendOutputFunction);
    } catch (e) {
      throw new Error(
        `extendOutputFunction is not a valid JavaScript! Error: ${e}`
      );
    }
    if (typeof extendOutputFunctionEvaluated !== 'function') {
      throw new Error(
        `extendOutputFunction is not a function! Please fix it or use just default output!`
      );
    }
  }
  return extendOutputFunctionEvaluated;
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

export const buildMetaOptions = (opt: MetaOptions) => {
  const socialMeta = opt?.socialMeta || {};
  const twitterMeta = opt?.twitterMeta || {};
  const metaOptions = {
    ...(!!opt.lang && { lang: opt.lang }),
    ...(!!opt.title && { title: opt.title }),
    ...(!!opt.favicon && { favicon: opt.favicon }),
    ...(!!opt.description && { description: opt.description }),
    ...(!!opt.keywords && { keywords: opt.keywords }),
    socialMeta: {
      ...(!!socialMeta.title && { 'og:title': socialMeta.title }),
      ...(!!socialMeta.description && {
        'og:description': socialMeta.description,
      }),
      ...(!!socialMeta.image && { 'og:image': socialMeta.image }),
      ...(!!socialMeta.type && { 'og:type': socialMeta.type }),
    },
    twitterMeta: {
      ...(!!twitterMeta.title && { 'twitter:title': twitterMeta.title }),
      ...(!!twitterMeta.description && {
        'twitter:description': twitterMeta.description,
      }),
      ...(!!twitterMeta.image && { 'twitter:image': twitterMeta.image }),
      ...(!!twitterMeta.image && { 'twitter:card': 'summary_large_image' }),
    },
  };
  return metaOptions;
};

export const isIgnoreText = (text: string): boolean => {
  text = text.toLowerCase();
  if (
    text.includes('acrobat') ||
    text.includes('adobe') ||
    text.toLowerCase().includes('adobe.com/jp') ||
    text.toLowerCase().includes('function(') ||
    text.toLowerCase().includes('connect.facebook.net') ||
    text.toLowerCase().includes('facebook.com/share') ||
    text.toLowerCase().includes('javascript') ||
    text.toLowerCase().includes('line-website.com') ||
    text.toLowerCase().includes('line.me') ||
    text.toLowerCase().includes('document.write(') ||
    text.toLowerCase().includes('twitter.com') ||
    text.toLowerCase().includes('hatena') ||
    text.includes('＜外部リンク＞')
  ) {
    return true;
  }

  return false;
};

export const clearImageExtensions = (text: string) => {
  // Define a regular expression pattern to match common image extensions
  const imageExtensionsRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;

  // Use the replace method with the regex pattern to remove the extension
  const cleanedFilename = text?.replace(imageExtensionsRegex, '');

  return cleanedFilename || '';
};
