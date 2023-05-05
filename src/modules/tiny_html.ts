import * as cheerio from 'cheerio';
const sanitizeHtml = require('sanitize-html');
import { executeHookFn, isIgnoreText } from '../utils/helper';
import {
  allowedTags,
  allowedAttributes,
  transformImgTag,
  transformLinkTag,
  exclusiveFilter,
} from '../utils/sanitize-html';
import { ALLOWED_TAG_NO_TEXT_CONTENT } from '../constant/index';
import { ProcessOptions } from '../index';

const _checkAndRemoveEmptyTag = ($, el) => {
  if (ALLOWED_TAG_NO_TEXT_CONTENT.includes(el.name)) return;
  if (!$(el).text() || isIgnoreText($(el).text())) return $(el).remove();

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
  return sanitizeHtml($.html(), {
    allowedTags: allowedTags, // allow only these tags
    allowedAttributes: allowedAttributes,
    allowedStyles: {}, // allow only these styles
    textFilter: (text) => text.trim().replace(/\s\s+/g, ' '),
    transformTags: {
      img: (tagName, attribs) => transformImgTag(options, tagName, attribs),
      a: (tagName, attribs) => transformLinkTag(options, tagName, attribs),
    },
    exclusiveFilter: (frame) => exclusiveFilter(options, frame),
  });
};

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

  // select the content of the page using contentSelectors. If doesn't exist then select the whole body
  if (options.contentSelectors && options.contentSelectors.length > 0) {
    const $content = $(options.contentSelectors!.join(','));
    const $body = cheerio.load('<body></body>', { decodeEntities: true }, true);

    // Content selector is body
    if ($content.length === 1 && ($content[0] as any)?.name === 'body') {
      $('body').replaceWith($content);
    } else {
      // append the content to the new body
      $body('body').append($content);
      // replace the body with the new body
      $('body').replaceWith($body('body'));
    }
  }

  // execute the cleaning process
  if (options.hooks?.before) {
    await executeHookFn(options.hooks.before, $);
  }

  // Sanitize html
  const sanitizedHtml = _sanitizeHtml($.html(), options);
  $ = cheerio.load(sanitizedHtml);

  // Flatter html
  _flattenHtml($)

  // Reduce html
  _reduceHtml($, options);

  // execute the after hook
  if (options.hooks?.after) {
    await executeHookFn(options.hooks.after, $);
  }

  return {
    html: $.html(),
    body: $('body').html(),
  };
};

export default tinyhtml;
