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

export const executeHookFn = async (
  $: cheerio.CheerioAPI,
  fnString: string
) => {
  const evaluateFunction = async (fnString: string) => {
    const fn = eval(fnString);
    try {
      const userResult = await fn($);
      return {
        userResult,
      };
    } catch (e: any) {
      return {
        error: e.toString(),
      };
    }
  };

  const resultOrError = await evaluateFunction(fnString);
  if (resultOrError.error) {
    console.warn(
      `extendOutputFunctionfailed. Returning default output. Error: ${resultOrError.error}`
    );
    throw new Error(resultOrError.error);
  } else {
    return resultOrError.userResult;
  }
};
