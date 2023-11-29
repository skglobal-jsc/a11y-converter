import { convertRelativeUrlsToAbsolute } from '../utils/helper';

export const allowedAttributes = {
  html: ['lang', 'xml', 'xml:lang', 'xmlns'],
  title: [],
  meta: ['charset', 'http-equiv', 'content', 'name', 'property'],
  link: ['href', 'rel', 'type', 'as', 'media'],

  // body
  p: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  a: ['href', 'target'],
  img: ['src', 'alt', 'height', 'width'],
  table: [],
  tr: [],
  th: ['rowspan', 'colspan'],
  td: ['rowspan', 'colspan'],
  ul: [],
  ol: [],
  li: [],
  span: [],
  strong: [],
  br: [],
};
export const allowedTags = [
  'html',
  'body',
  'head',

  // header
  'meta',
  'title',
  'link',

  // body
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a',
  'img',
  'table',
  'caption',
  'tr',
  'th',
  'td',
  'ul',
  'ol',
  'li',
  'span',
  'br',
  'strong',
  'em',
  'small',
  'big',
  'sub',
  'strike',
  'samp',
  's',
];

export const transformImgTag = (baseURL, attribs) => {
  const originalSrc = attribs?.src || attribs['data-src'] || ''
  const src = convertRelativeUrlsToAbsolute(baseURL, originalSrc) || '';
  return {
    tagName: 'img',
    attribs: { ...attribs, src },
  };
};

export const transformATag = (baseURL, attribs) => {
  const href = convertRelativeUrlsToAbsolute(baseURL, attribs.href) || ''
  return {
    tagName: !attribs.href ? 'p' : 'a',
    attribs: { ...attribs, ...(attribs.href ? { href } : {}) },
  }
};

export const transformLinkTag = (baseURL, attribs) => {
  const href = convertRelativeUrlsToAbsolute(baseURL, attribs.href) || ''
  return {
    tagName: 'link',
    attribs: { ...attribs, href },
  };
};

export const exclusiveFilter = (options, frame) => {
  // remove link tags with rel="stylesheet" attribute
  if (frame.tag === 'link') {
    return frame?.attribs?.rel === 'stylesheet';
  }

  // Remove images if src isn't exits or width & height < options?.min(Width/Height)
  if (frame.tag === 'img') {
    const { width, height, src } = frame.attribs || {}
    return (
      !src ||
      (width && height &&
        parseInt(width) < options?.removeSmallImages?.minWidth &&
        parseInt(height) < options?.removeSmallImages?.minHeight)
    );
  }

  // Remove a (Business of UV system)
  if (frame.tag === 'a') {
    const urlPattern =
      /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/gi;
    const href = frame.attribs?.href || '';
    return (
      href?.includes('adobe') ||
      href?.includes('twitter.com') ||
      href?.includes('line.me') ||
      href?.includes('facebook.com') ||
      href?.includes('hatena.ne') ||
      (href.startsWith('http') && !urlPattern.test(href))
    );
  }
};
