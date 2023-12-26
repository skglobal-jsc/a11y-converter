import * as cheerio from 'cheerio';

export const commonCssLinks = {
  ja: [
    'https://unpkg.com/a11y-css-reset/combo.css',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap',
    'https://ragt-dev.s3.ap-southeast-1.amazonaws.com/public/ragt-editor/ja.css',
  ],
  en: [
    'https://unpkg.com/a11y-css-reset/combo.css',
    'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;300;400;500;700;900&display=swap',
    'https://ragt-dev.s3.ap-southeast-1.amazonaws.com/public/ragt-editor/en.css',
  ],
};

export const commonScriptLinks = [
  'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js',
];

import {
  buildHeadingComponent,
  buildImageComponent,
  buildLinkComponent,
  buildListComponent,
  buildTableComponent,
  buildTextComponent,
} from './uv-components';
import { A11YSetting, MetaOptions } from '../@types/index';

export const _setupHead = ({
  $,
  scriptLinks,
  a11ySetting,
}: {
  $: cheerio.CheerioAPI;
  scriptLinks?: string[];
  a11ySetting?: A11YSetting;
}) => {
  _setupMetaHead($, a11ySetting?.meta);

  // TODO: First, remove head style tag
  $('head style').remove();

  const $body = $('body');

  // TODO: Remove all attributes of body
  $body.removeAttr('class id style');

  // TODO: Should use class instead of id
  $body.attr('id', 'skg-style');

  let $head = $('head');

  // TODO: Check find head tag
  if ($head.length === 0) {
    console.warn('head tag not found, create new head tag');
  }

  // TODO: Remove all link of head, it will be added later
  $head.find('link').remove();

  // TODO: Detect lang for import font style
  const lang = $('html')?.attr('lang') === 'ja' ? 'ja' : 'en';

  // TODO: Apply CSS links
  _applyCssLinks($head, lang, a11ySetting?.cssLinks);

  // TODO: Apply Script links
  _applyScriptLinks($head, scriptLinks);

  // TODO: Apply google analytics, if needed
  if (a11ySetting?.googleAnalyticsId) {
    _applyGoogleAnalytics($, a11ySetting.googleAnalyticsId);
  }
};

export const _applyCssLinks = (
  $head: cheerio.Cheerio<cheerio.Element>,
  lang: string = 'ja',
  cssLinks: string[] = []
) => {
  // apply some required css rules
  $head.append('<link rel="preconnect" href="https://fonts.googleapis.com">');
  $head.append(
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
  );

  // apply a11y stylesheets link
  const allCssLinks = [...cssLinks, ...commonCssLinks[lang]];
  allCssLinks.forEach((link) => {
    $head.append(`<link rel="stylesheet" href="${link}">`);
  });
};

export const _applyScriptLinks = (
  $head: cheerio.Cheerio<cheerio.Element>,
  scriptLinks: string[] = []
) => {
  const allScriptLinks = [...scriptLinks, ...commonScriptLinks];
  allScriptLinks.forEach((link) => {
    $head.append(`<script src="${link}">`);
  });
};

export const _setupMetaHead = (
  $: cheerio.CheerioAPI,
  metaOptions?: MetaOptions
) => {
  const $head = $('head');
  $head.find('meta').remove();

  // TODO: Add lang attribute to html tag
  $('html').attr('lang', $('html').attr('lang') || metaOptions?.lang || 'ja');

  // TODO: Namespace html tag
  $('html').attr('xmlns', 'http://www.w3.org/1999/xhtml');

  // TODO: Apply meta head
  _applyMetaHead($head, metaOptions);
};
export const _applyMetaHead = (
  $head: cheerio.Cheerio<cheerio.Element>,
  metaOptions?: MetaOptions
) => {
  // TODO: Apply common meta head
  $head.append(
    '<meta name="viewport" content="width=device-width, initial-scale=1">'
  );
  $head.append('<meta charset="utf-8">');
  $head.append('<meta http-equiv="X-UA-Compatible" content="IE=edge">');

  // TODO: Add title attribute to head tag
  if (metaOptions?.title) {
    $head.append(`<title>${metaOptions.title}</title>`);
  }

  // TODO: Add description to head tag
  if (metaOptions?.description) {
    $head.append(
      `<meta name="description" content="${metaOptions.description}">`
    );
  }

  // TODO: Add keyword to head tag
  if (metaOptions?.keywords) {
    $head.append(`<meta name="keywords" content="${metaOptions.keywords}">`);
  }

  // TODO: Add favicon attribute to head tag
  if (metaOptions?.favicon) {
    $head.append(
      `<link rel="icon" type="image/x-icon" href="${metaOptions.favicon}">`
    );
  }

  // TODO: Add social meta
  if (metaOptions?.socialMeta) {
    Object.entries(metaOptions.socialMeta).forEach(([key, value]) => {
      $head.append(`<meta name="${key}" content="${value}">`);
    });
  }

  // TODO: Add twitter meta
  if (metaOptions?.twitterMeta) {
    Object.entries(metaOptions.twitterMeta).forEach(([key, value]) => {
      $head.append(`<meta name="${key}" content="${value}">`);
    });
  }
};

export const _applyAccessibilityAttributes = ($: cheerio.CheerioAPI) => {
  const $body = $('body');
  $body.attr('role', 'main');

  // let apply skg style to each element
  $body.find('*').each((i, el) => {
    const $el = $(el);
    const tagName = $el.prop('tagName');
    // remove class attribute
    $el.removeAttr('class');

    switch (tagName) {
      case 'P':
        // TODO: apply a11y attributes to p tag
        buildTextComponent($el);
        break;
      case 'H1':
      case 'H2':
      case 'H3':
      case 'H4':
      case 'H5':
      case 'H6':
        // TODO: apply a11y attributes to heading tag
        buildHeadingComponent($el);
        break;
      case 'UL':
      case 'OL':
        // TODO: apply a11y attributes to list tag
        buildListComponent($el);
        break;
      case 'TABLE':
        // TODO: apply a11y attributes to table tag
        // example, add class to table
        buildTableComponent($el);
        break;
      case 'IMG':
        // TODO: apply a11y attributes to img tag
        buildImageComponent($el);
        break;
      case 'A':
        // TODO: apply a11y attributes to a tag
        buildLinkComponent($el);
        break;
      default:
        break;
    }
  });
};

export const _applyGoogleAnalytics = (
  $: cheerio.CheerioAPI,
  googleAnalyticsId: string
) => {
  if (googleAnalyticsId) {
    const $head = $('head');
    const $script = $('<script></script>');
    $script.attr('async', 'true');
    $script.attr(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
    );
    $head.append($script);

    const $script2 = $('<script></script>');
    $script2.text(`window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${googleAnalyticsId}');`);
    $head.append($script2);
  }
};
