import * as cheerio from 'cheerio';
import * as url from 'url';

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
}) => {
  const metaOptions = {
    ...(!!opt.lang && { lang: opt.lang }),
    ...(!!opt.title && { title: opt.title }),
    ...(!!opt.favicon && { favicon: opt.favicon }),
    meta: {
      ...(!!opt.description && { description: opt.description }),
      ...(!!opt.keywords && { keywords: opt.keywords }),

      ...(!!opt.title && { 'twitter:title': opt.title }),
      ...(!!opt.description && { 'twitter:description': opt.description }),
      ...(!!opt.image && { 'twitter:image': opt.image }),
      ...(!!opt.image && { 'twitter:card': 'summary_large_image' }),
    },
    socialMeta: {
      ...(!!opt.title && { 'og:title': opt.title }),
      ...(!!opt.description && { 'og:description': opt.description }),
      ...(!!opt.image && { 'og:image': opt.image }),
      ...(!!opt.type && { 'og:type': opt.type }),
    },
  };
  return metaOptions;
};

export const isIgnoreText = (text: string): boolean => {
  text = text.toLowerCase()
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
