import * as cheerio from 'cheerio';
const sanitizeHtml = require('sanitize-html');
import { buildMetaOptions, clearImageExtensions } from '../utils/helper';
import { BLOCK_TAGS, BLOCK_TYPE, HEADER_LEVEL, LIST_STYLE } from '../constant';
import { useLocale } from '../locale';

const cleanInline = (html) => {
  return sanitizeHtml(html, {
    allowedTags: ['a', 'mark', 'br', 'img'],
  });
};

const parseListItems = ($, items) => {
  const res: any[] = [];
  items.forEach((item) => {
    if (item.name === 'li') {
      res.push({
        content: cleanInline($(item).html()),
        items: [],
      });
    }
    if (['ul', 'ol'].includes(item.name)) {
      if (!res[res.length - 1]?.items) {
        res.push({
          content: '',
          items: [],
        });
      }
      res[res.length - 1].items.push(...parseListItems($, item.children));
    }
  });
  return res;
};

const htmlSimplified2EditorJson = (html) => {
  let blocks: any[] = [];

  // Build meta option content
  const $ = cheerio.load(html);
  const meta = {
    lang: $('html')?.attr('lang'),
    title:
      $('title')?.text() ?? $('meta[property="og:title"]')?.attr('content'),
    description:
      $('meta[name="description"]')?.attr('content') ??
      $('meta[property="og:description"]')?.attr('content'),
    keywords: $('meta[name="keywords"]')?.attr('content'),
    favicon: $('link[rel*="icon"]')?.attr('href'),
    image: $('meta[property="og:image"]')?.attr('content'),
    type: $('meta[property="og:type"]')?.attr('content'),

    socialMeta: {
      title: $('meta[property="og:title"]')?.attr('content') || '',
      type: $('meta[property="og:type"]')?.attr('content') || '',
      image: $('meta[property="og:image"]')?.attr('content') || '',
      description: $('meta[property="og:description"]')?.attr('content') || '',
    },
    twitterMeta: {
      title: $('meta[name="twitter:title"]')?.attr('content') || '',
      type: $('meta[name="twitter:type"]')?.attr('content') || '',
      image: $('meta[name="twitter:image"]')?.attr('content') || '',
      description: $('meta[name="twitter:description"]')?.attr('content') || '',
    },
  };
  const metaOpts = buildMetaOptions(meta);
  let groupUnSupportTag: string[] = [];

  // Build "Start Article sentence"
  blocks.push({
    id: Math.random().toString(36).substring(7),
    type: BLOCK_TYPE.PARAGRAPH,
    data: {
      text: useLocale({
        key: 'StartArticle',
        lang: metaOpts?.lang,
      }),
    },
  });

  $('body')
    .contents()
    .each((i, el) => {
      if (el.type === 'tag') {
        // random attribute id
        const id = Math.random().toString(36).substring(7);
        // Wrap group other tag into paragraph
        if (BLOCK_TAGS.includes(el.name)) {
          if (groupUnSupportTag.length) {
            const unsupportedId = Math.random().toString(36).substring(7);
            blocks.push({
              id: unsupportedId,
              type: BLOCK_TYPE.PARAGRAPH,
              data: {
                text: cleanInline(groupUnSupportTag.join('')),
              },
            });
            groupUnSupportTag = [];
          }
          //TODO: Paragraph
          if (el.name === 'p') {
            const imgTagPattern = /<img.*\/?>/g;
            if ($(el).text().trim() || imgTagPattern.test($(el).html() || '')) {
              blocks.push({
                id,
                type: BLOCK_TYPE.PARAGRAPH,
                data: {
                  text: cleanInline($(el).html()),
                },
              });
            }
          }
          //TODO: A
          if (el.name === 'a') {
            blocks.push({
              id,
              type: BLOCK_TYPE.PARAGRAPH,
              data: { text: $(el).toString() },
            });
          }
          //TODO: Header
          if (['h1', 'h2', 'h3'].includes(el.name)) {
            blocks.push({
              id,
              type: BLOCK_TYPE.HEADER,
              data: {
                text: cleanInline($(el).html()),
                level: HEADER_LEVEL[el.name],
              },
            });
          }
          if (['h4', 'h5', 'h6'].includes(el.name)) {
            blocks.push({
              id,
              type: BLOCK_TYPE.PARAGRAPH,
              data: {
                text: cleanInline($(el).html()),
              },
            });
          }
          //TODO: List
          if (['ul', 'ol'].includes(el.name)) {
            const items = parseListItems($, el.children);
            blocks.push({
              id,
              type: BLOCK_TYPE.LIST,
              data: {
                style: LIST_STYLE[el.name],
                items,
              },
            });
          }
          //TODO: Image
          if (el.name === 'img') {
            blocks.push({
              id,
              type: BLOCK_TYPE.IMAGE,
              data: {
                file: {
                  url: $(el)?.attr('src') ?? '',
                },
                caption: clearImageExtensions($(el)?.attr('alt') ?? ''),
                withBorder: false,
                stretched: false,
                withBackground: false,
              },
            });
          }

          //TODO: Table
          if (el.name === 'table') {
            const captionElement = $(el).find('caption');
            const firstRow = $(el).find('tr')?.[0];
            const rows = Array.from($(el).find('tr'));
            let totalCols = 0;
            const content = rows.map((row) => {
              const cols = [
                ...Array.from($(row).find('th')),
                ...Array.from($(row).find('td')),
              ];
              if (cols.length > totalCols) {
                totalCols = cols.length;
              }
              let newCols: any = [];
              cols.forEach((element) => {
                const rowSpan = parseInt($(element)?.attr('rowspan') || '1');
                const colSpan = parseInt($(element)?.attr('colspan') || '1');
                newCols.push({ data: $(element).html(), rowSpan, colSpan });
                // for (let i = 0; i < colSpan - 1; i++) { // Add empty col for merge cell case
                //   newCols.push({ data: '', rowSpan: 1, colSpan: 1 })
                // }
              });
              return newCols;
            });
            const isHeaders = $(firstRow)?.find('th')?.length > 0;
            const headers = Array.from($(el).find('th'))?.map((th) =>
              $(th)?.html()
            );

            const data = {
              withHeadings: isHeaders,
              content,
              ...(captionElement.length && {
                caption: $(captionElement).html()?.trim(),
              }),
            };

            blocks.push({
              id,
              type: BLOCK_TYPE.TABLE,
              data,
            });
          }
        } else {
          //Group tag in case not supporting
          groupUnSupportTag.push($.html(el));
        }
      } else if (el.type === 'text') {
        // random attribute id
        const id = Math.random().toString(36).substring(7);
        const text = $(el).text().trim();
        if (!!text) {
          blocks.push({
            id,
            type: BLOCK_TYPE.PARAGRAPH,
            data: {
              text: text,
            },
          });
        }
      }
    });

  // Build "End Article sentence"
  blocks.push({
    id: Math.random().toString(36).substring(7),
    type: BLOCK_TYPE.PARAGRAPH,
    data: {
      text: useLocale({ key: 'EndArticle', lang: metaOpts?.lang, value: null }),
    },
  });

  return {
    blocks,
    metaOpt: metaOpts,
  };
};

export default htmlSimplified2EditorJson;
