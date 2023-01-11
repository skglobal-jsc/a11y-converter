import $ from 'jquery';

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

const _applyCssRules = (htmlDOM, cssRules?: string[]) => {
  // first, remove head style tag
  $('head style', htmlDOM).remove();

  const $body = $('body', htmlDOM);

  // remove all attributes of body
  $body.removeAttr('class id style');

  // TODO: Should use class instead of id
  $body.attr('id', 'skg-style');

  let $head = $('head', htmlDOM);

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
  const lang = $('html', htmlDOM)?.attr('lang') === 'ja' ? 'ja' : 'en';

  // apply a11y stylesheets link
  (cssRules || commonCssLinks[lang]).forEach((link) => {
    $head.append(`<link rel="stylesheet" href="${link}">`);
  });
};

const _applyMeta = (htmlDOM: any, meta?: any) => {
  const $head = $('head', htmlDOM);
  $head.find('meta').remove();

  $head.append(
    '<meta name="viewport" content="width=device-width, initial-scale=1">'
  );
  $head.append('<meta charset="utf-8">');
  $head.append('<meta http-equiv="X-UA-Compatible" content="IE=edge">');

  if (meta) {
    Object.keys(meta).forEach((key) => {
      $head.append(`<meta name="${key}" content="${meta[key]}">`);
    });
  }
};
const _applySocialMeta = (htmlDOM: any, socialMeta?: any) => {
  const $head = $('head', htmlDOM);
  if (!!socialMeta) {
    Object.keys(socialMeta).forEach((key) => {
      $head.append(`<meta property="${key}" content="${socialMeta[key]}">`);
    });
  } else {
    // default social meta
    // $head.append('<meta property="og:title" content="SK Global News" />');
    // $head.append('<meta property="og:type" content="article" />');
    // $head.append('<meta property="og:url" content="https://news.crawler.sk-global.io" />');
    // $head.append('<meta property="og:image" content="https://news.crawler.sk-global.io/news/images/sk-global-logo.png" />');
    // $head.append('<meta property="og:description" content="SK Global News" />');
    // $head.append('<meta property="og:site_name" content="SK Global News" />');
    // $head.append('<meta property="og:locale" content="en_US" />');
  }
};

const _applyGoogleAnalytics = (htmlDOM: any, googleAnalyticsId: string) => {
  if (googleAnalyticsId) {
    const $head = $('head', htmlDOM);
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

export { _applyCssRules, _applyMeta, _applyGoogleAnalytics, _applySocialMeta };
