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
