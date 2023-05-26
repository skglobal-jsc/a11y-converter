import * as cheerio from 'cheerio';

export const commonCssLinks = {
  ja: [
    'https://unpkg.com/a11y-css-reset/combo.css',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap',
    'https://ragt-dev.s3.ap-southeast-1.amazonaws.com/public/ragt-convertor/ja.css',
  ],
  en: [
    'https://unpkg.com/a11y-css-reset/combo.css',
    'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;300;400;500;700;900&display=swap',
    'https://ragt-dev.s3.ap-southeast-1.amazonaws.com/public/ragt-convertor/en.css',
  ],
};

import {
  buildHeadingComponent,
  buildImageComponent,
  buildLinkComponent,
  buildListComponent,
  buildTableComponent,
  buildTextComponent,
} from './uv-components';

export const _applyCssRules = ($: cheerio.CheerioAPI, cssRules?: string[]) => {
  // first, remove head style tag
  $('head style').remove();

  const $body = $('body');

  // remove all attributes of body
  $body.removeAttr('class id style');

  // TODO: Should use class instead of id
  $body.attr('id', 'skg-style');

  let $head = $('head');

  // check find head tag
  if ($head.length === 0) {
    console.warn('head tag not found, create new head tag');
  }

  // remove all link of head addtag, it will be added later
  $head.find('link').remove();

  // apply some required css rules
  $head.append('<link rel="preconnect" href="https://fonts.googleapis.com">');
  $head.append(
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
  );

  // detect lang for import font style
  const lang = $('html')?.attr('lang') === 'ja' ? 'ja' : 'en';

  // apply a11y stylesheets link
  const cssList = [...new Set([
    ...(cssRules || []),
    ...(commonCssLinks[lang] || commonCssLinks.ja)
  ])]
  cssList.forEach((link) => {
    $head.append(`<link rel="stylesheet" href="${link}">`);
  });
};

export const _applyMetaHead = ($: cheerio.CheerioAPI, meta?: any) => {
  const $head = $('head');
  $head.find('meta').remove();

  // add lang attribute to html tag
  $('html').attr('lang', $('html').attr('lang') || meta?.lang || 'ja');

  // namespace html tag
  $('html').attr('xmlns', 'http://www.w3.org/1999/xhtml');

  $head.append(
    '<meta name="viewport" content="width=device-width, initial-scale=1">'
  );
  $head.append('<meta charset="utf-8">');
  $head.append('<meta http-equiv="X-UA-Compatible" content="IE=edge">');

  // add title attribute to head tag
  if (meta?.title) {
    $('head').append(`<title>${meta.title}</title>`);
  }

  // add description to head tag
  if (meta?.description) {
    $head.append(`<meta name="description" content="${meta.description}">`);
  }

  // add keyword to head tag
  if (meta?.keywords) {
    $head.append(`<meta name="keywords" content="${meta.keywords}">`);
  }

  // add favicon attribute to head tag
  if (meta?.favicon) {
    $('head').append(
      `<link rel="icon" type="image/x-icon" href="${meta.favicon}">`
    );
  }
  // add social meta
  Object.keys(meta?.socialMeta)?.filter(key => meta?.socialMeta[key]).forEach(key => {
    $head.append(`<meta name="${key}" content="${meta.socialMeta[key]}">`);
  });

  // add twitter meta
  Object.keys(meta?.twitterMeta)?.filter(key => meta?.twitterMeta[key]).forEach(key => {
    $head.append(`<meta name="${key}" content="${meta.twitterMeta[key]}">`);
  });

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
