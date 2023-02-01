import * as cheerio from 'cheerio';
import {
  executeHookFn,
  convertRelativeUrlsToAbsolute,
  isIgnoreText,
} from '../utils/helper';
import {
  UN_SUPPORTED_STYLE_TAGS,
  UN_SUPPORTED_TAGS,
  BLOCK_TAGS,
  SECTION_TAGS,
  EDITOR_BLOCK_TAGS,
} from '../constant/index';
import { ProcessOptions } from '../index';

const reduceHtml = ($: cheerio.CheerioAPI, opt: ProcessOptions) => {
  // clean head first
  $('head')
    .contents()
    .each((i, el) => {
      if (el.type === 'tag') {
        // remove  all except title
        // we need to keep title because it is used to generate the slug
        // if (el.name !== 'title') {
        //   $(el).remove();
        // }
      } else {
        $(el).remove();
      }
    });

  $('body *')
    .contents()
    .each((i, el) => {
      if (el.type === 'tag') {
        // Converts the markup to HTML5 (if it is XHTML for example)
        el.name = el.name.toLowerCase();

        // remove unsupported tags
        if (UN_SUPPORTED_TAGS.includes(el.name)) {
          $(el).remove();
        }

        // if element is a style tag then keep children and remove the style tag
        if (UN_SUPPORTED_STYLE_TAGS.includes(el.name)) {
          $(el).replaceWith($(el).contents());
        }
        // remove optional tags
        if (
          opt.removeOptionalTags &&
          opt.removeOptionalTags.includes(el.name)
        ) {
          $(el).remove();
        }
        //table 1 cell is not table
        if (el.name === 'table') {
          const rows = $(el).find('tr:not(tr tr)').length;
          const cols = $(el).find('td:not(tr tr td), th:not(tr tr th)').length;
          if (rows === 1 && cols === 1) {
            $(el).replaceWith(
              $(el).find('td:not(tr tr td), th:not(tr tr th)').contents()
            );
          }
        }

        // fix dom: make sure inside p tag there is no any block tags
        if (el.name === 'p') {
          $(el)
            .contents()
            .each((i, el) => {
              if (el.type === 'tag') {
                if (el.name === 'img') {
                  $(el).unwrap();
                } else if (BLOCK_TAGS.includes(el.name)) {
                  $(el).replaceWith($(el).contents());
                }
              }
            });
        }

        // replace section tags with div. section tags are not supported by EditorJS
        if (SECTION_TAGS.includes(el.name)) {
          el.name = 'div';
        }
        // if element is EDITOR_BLOCK_TAGS and parent is div then unwrap the element
        if (EDITOR_BLOCK_TAGS.includes(el.name)) {
          let child = $(el);
          if ($(el).parent().is('div')) {
            $(el).unwrap();
          }
        }

        // remove unnecessary attributes
        const attributes = Object.keys(el.attribs);
        attributes.forEach((key) => {
          if (!['href', 'src', 'alt', 'height', 'width'].includes(key)) {
            delete el.attribs[key];
          }
        });

        // TODO: some cleanup is required here
        // remove empty tags with cheerio, but also keep images:
        if (
          opt.removeEmptyElements &&
          el.name !== 'img' &&
          $(el).find('img').length === 0 &&
          $(el).text().trim().length === 0
        ) {
          $(el).remove();
        }

        // if picture inside [picture] tag then unwrap img from picture
        if (el.name === 'picture') {
          const img = $(el).find('img');
          if (img.length > 0) {
            $(img).unwrap();
          }
        }

        // remove images with small width and height
        if (el.name === 'img' && opt.removeSmallImages) {
          const width = el.attribs.width;
          const height = el.attribs.height;
          if (
            width &&
            height &&
            parseInt(width) < opt.removeSmallImages.minWidth &&
            parseInt(height) < opt.removeSmallImages.minHeight
          ) {
            $(el).remove();
          }
        }
      } else if (el.type === 'text') {
        // if the element is text and parent is div then wrap it with p tag
        const text = $(el).text().trim();
        if (isIgnoreText(text)) {
          $(el).remove();
        } else if (
          text &&
          el.parent?.type === 'tag' &&
          el.parent?.name == 'div'
        ) {
          $(el).wrap('<p></p>');
        }
      } else if (el.type === 'comment') {
        if (opt.removeComments) {
          $(el).remove();
        }
      } else if (el.type === 'root') {
        // do nothing when element is root
      } else {
        // other types of elements are not supported, e.g. script, style, etc.
        $(el).remove();
        // console.warn(`Unsupported element type: ${el.type}`);
      }
    });

  // step 2: after cleaning the html, the DOM now cleaned
  $('body *').each((i, el) => {
    // if element is SECTION_TAGS then unwrap children of the element
    if (SECTION_TAGS.includes(el.name)) {
      $(el).replaceWith($(el).contents());
    }

    // some image has src is relative path, so we need to add domain to it
    if (el.name === 'img' && opt.url) {
      const src = el.attribs.src;
      if (src) {
        el.attribs.src = convertRelativeUrlsToAbsolute(opt.url, src);
      } else {
        $(el).remove();
      }
    }

    // some links has href is relative path, so we need to add domain to it
    if (el.name === 'a' && opt.url) {
      const href = el.attribs.href;
      if (href) {
        el.attribs.href = convertRelativeUrlsToAbsolute(opt.url, href);
      } else {
        $(el).remove();
      }
    }
    if (el.name === 'table') {
      const rows = $(el).find('tr:not(tr tr)').length;
      const cols = $(el).find('td:not(tr tr td), th:not(tr tr th)').length;
      if (rows === 1 && cols === 1) {
        $(el).replaceWith(
          $(el).find('td:not(tr tr td), th:not(tr tr th)').contents()
        );
      }
    }
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

  const cleanedHtml = html
    .replace(/\xA0/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  const $ = cheerio.load(cleanedHtml, { decodeEntities: true }, true);

  // execute the cleaning process
  if (options.hooks?.before) {
    await executeHookFn(options.hooks.before, $);
  }

  // select the content of the page using contentSelectors. If doesn't exist then select the whole body
  if (options.contentSelectors && options.contentSelectors.length > 0) {
    const $content = $(options.contentSelectors!.join(','));
    const $body = cheerio.load('<body></body>', { decodeEntities: true }, true);
    // append the content to the new body
    $body('body').append($content);
    // replace the body with the new body
    $('body').replaceWith($body('body'));
  }
  // clean and reduce html
  reduceHtml($, options);
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