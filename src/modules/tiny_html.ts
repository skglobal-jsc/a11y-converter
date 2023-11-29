import * as cheerio from 'cheerio';
const sanitizeHtml = require('sanitize-html');
import { executeHookFn, isIgnoreText } from '../utils/helper';
import {
  allowedTags,
  allowedAttributes,
  transformImgTag,
  transformATag,
  transformLinkTag,
  exclusiveFilter,
} from '../utils/sanitize-html';
import { ALLOWED_TAG_NO_TEXT_CONTENT } from '../constant/index';
import { ProcessOptions } from '../index';

const _checkAndRemoveEmptyTag = ($, el) => {
  if (ALLOWED_TAG_NO_TEXT_CONTENT.includes(el.name)) {
    return;
  }
  const hasImg = $(el).find('img').length > 0
  if (!hasImg && (!$(el).text() || isIgnoreText($(el).text()))) {
    return $(el).remove();
  }

  $(el)
    .contents()
    .each((i, newEl) => {
      _checkAndRemoveEmptyTag($, newEl);
    });
};

const _flattenHtml = ($: cheerio.CheerioAPI) => {
  const _flattenElement = (el) => {
    if ($(el)?.parent()?.is('body')) return;
    let grandparent = $(el);
    while (!grandparent?.parent()?.is('body')) {
      grandparent = grandparent?.parent();
    }
    grandparent?.after($(el));
  };

  // Flatten img
  $('img').each((i, el) => {
    _flattenElement(el);
  });
}

const _reduceHtml = ($: cheerio.CheerioAPI, opts: ProcessOptions) => {
  // Clean head
  $('head')
    .contents()
    .each((i, el) => {
      if (el.type !== 'tag') {
        $(el).remove();
      }
    });

  // Clean body
  $('body')
    .contents()
    .each((i, el) => {
      if (el.type === 'tag') {
        // Converts the markup to HTML5 (if it is XHTML for example)
        el.name = el.name.toLowerCase();

        // Table 1 cell is not table
        if (el.name === 'table') {
          const rows = $(el).find('tr:not(tr tr)').length;
          const cols = $(el).find('td:not(tr tr td), th:not(tr tr th)').length;
          if (rows === 1 && cols === 1) {
            $(el).replaceWith(
              $(el).find('td:not(tr tr td), th:not(tr tr th)').contents()
            );
          }
        } else {
          _checkAndRemoveEmptyTag($, el);
        }
      }
    });

  //
};

const _sanitizeHtml = (html, options) => {
  const preCleanedHtml = html
    .replace(/\xA0/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  const $ = cheerio.load(preCleanedHtml);

  const baseURL = options?.iArticle?.url || options?.iArticle?.loadedUrl || ''
  return sanitizeHtml($.html(), {
    allowedTags: allowedTags, // allow only these tags
    allowedAttributes: allowedAttributes,
    allowedStyles: {}, // allow only these styles
    textFilter: (text) => {
      const data = text
        // .trim()
        .replace(/\s{2,}/g, ' ')
        .replace(/\t/g, '');
      return data
    },
    transformTags: {
      img: (_, attribs) => transformImgTag(baseURL, attribs),
      a: (_, attribs) => transformATag(baseURL, attribs),
      link: (_, attribs) => transformLinkTag(baseURL, attribs),

    },
    exclusiveFilter: (frame) => exclusiveFilter(options, frame),
  });
};

const _replaceDivWithParagraph = ($) => {
  // Get all div elements
  const divElements = $('div');

  // Iterate through each div element
  for (let i = 0; i < divElements.length; i++) {
      const divElement = divElements[i];

      // Check if the div contains only text nodes
      if (
          divElement.children.length === 1 &&
          divElement.children[0].type === 'text'
        ) {
          // Create a new paragraph element
          const p = $('<p>').text(divElement.children[0].data);

          // Replace the div with the paragraph
          $(divElement).replaceWith(p);
      }
  }
}

const _preTinyHTMlProcessing = async ($, options) => {
  // Remove unnecessary elements by title selector
  if (options.titleSelector) {
    const $content = $(options.contentSelectors?.join(',') || 'body');
    const $titleEl = $(options.titleSelector);

    $content.find('*').each((i, child) => {
      const $child = $(child);
      if (child.type === 'tag') {
        // Loop until meet the title element
        if ($titleEl.is($child)) {
          // Remove itself
          $child.remove();
          return false;
        } else {
          // If not titleEle, remove it
          $child.remove();
        }
      }
      return true;
    });
  }

  // Select the content of the page using contentSelectors. If doesn't exist then select the whole body
  if (
    options?.contentSelectors &&
    options.contentSelectors.length > 0 &&
    !options.contentSelectors.includes('body')
  ) {
    const $content = $(options.contentSelectors!.join(','))
    const $body = cheerio.load(
      '<body></body>',
      { decodeEntities: true },
      true
    );
    // append the content to the new body
    $body('body').append($content);
    // replace the body with the new body
    $('body').replaceWith($body('body'));
  }

  // Execute the cleaning process
  if (options.hooks?.before) {
    await executeHookFn(options.hooks.before, $);
  }

  // Replace all div(contains text only) to paragraph
  _replaceDivWithParagraph($);
}

const tinyhtml = async (html: string, opt?: ProcessOptions) => {
  const options: ProcessOptions = {
    removeComments: true,
    removeEmptyElements: true,
    removeSmallImages: {
      minWidth: 100,
      minHeight: 100,
    },
    removeOptionalTags: [],
    removeScriptTypeAttributes: true,
    ...opt,
  };

  // Load cheerio
  let $ = cheerio.load(html);

  // Pre processing of tiny HTML
  await _preTinyHTMlProcessing($, options)

  // Sanitize html
  const sanitizedHtml = _sanitizeHtml($.html(), options);
  $ = cheerio.load(sanitizedHtml);

  // Flatter html
  _flattenHtml($)

  // Reduce html
  _reduceHtml($, options);

  // Execute the after hook
  if (options.hooks?.after) {
    await executeHookFn(options.hooks.after, $);
  }

  return {
    html: $.html(),
    body: $('body').html(),
  };
};

export default tinyhtml;
