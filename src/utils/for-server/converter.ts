import * as cheerio from 'cheerio';
const sanitizeHtml = require('sanitize-html');

import {
  _applyCssRules,
  _applyMeta,
  _applySocialMeta,
  _applyAccessibilityAttributes,
  _applyGoogleAnalytics,
} from './css';
import { buildMetaOptions } from './helper';

export interface MetaOptions {
  title?: string;
  cssLinks?: string[];
  meta?: {};
  socialMeta?: {};
  lang?: string;
  favicon?: string;
  googleAnalyticsId?: string;
}

declare type MetaItem = {
  id?: string;
  ui?: string;
  polly?: string;
  ssml?: string;
  user?: string;
  actions?: string[];
  isAutogenerated?: boolean;
};

//TODO: Define constant
const BLOCK_TYPE = {
  PARAGRAPH: 'paragraph',
  HEADER: 'header',
  LIST: 'list',
  IMAGE: 'image',
  TABLE: 'table',
};
const BLOCK_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'table',
  'p',
  'img',
];

const HEADER_LEVEL = {
  h1: 1,
  h2: 2,
  h3: 3,
};
const LIST_STYLE = {
  ul: 'unordered',
  ol: 'ordered',
};

//TODO: Util functions
const dfsTree = (root, arr) => {
  arr.push(root.content);
  root.items.forEach((item) => {
    dfsTree(item, arr);
  });
};

const getMetaByDfs = (root, parentId, arr) => {
  if (root.content) {
    // random attribute id
    const id = Math.random().toString(36).substring(7);
    const sentences = splitSentences(root.content);
    sentences.forEach((sentence) => {
      const htmlTagRegex = /<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim;
      const aTagRegex = /<a.+?\s*href\s*=\s*["\']?(?<href>[^"\'\s>]+)["\']?/gi;
      arr.push({
        parentId,
        id,
        ui: sentence,
        polly: sentence.replace(htmlTagRegex, ''),
        ssml: '',
        user: '',
        actions: [...sentence.matchAll(aTagRegex)]
          .map((item) => item.groups?.href)
          .filter((item) => !!item),
      });
    });
    root.items.forEach((item) => {
      getMetaByDfs(item, id, arr);
    });
  } else {
    root.items.forEach((item) => {
      getMetaByDfs(item, 'root', arr);
    });
  }
};
const splitSentences = (rawText, lang = 'en') => {
  const htmlElementRegex =
    /<(?:([A-Za-z0-9][A-Za-z0-9]*)\b[^>]*>(?:.*?)<\/\1>|[A-Za-z0-9][A-Za-z0-9]*\b[^>]*\/>)/gm;
  const htmlElements = rawText.match(htmlElementRegex) ?? [];
  let noHtml = rawText;
  htmlElements.forEach(
    (element, idx) => (noHtml = noHtml.replace(element, `htmlElementNo${idx}`))
  );
  const regexSplitSentences =
    lang === 'ja'
      ? /(?<!\w\.\w.)(?<=\。|\？|\！|\：|\n)/g
      : /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\:|\!|\n)\s/g;
  const noHtmlSentences = noHtml
    .split(regexSplitSentences)
    .filter((sentences) => !!sentences);
  const sentences = noHtmlSentences.map((sentence) => {
    htmlElements.forEach(
      (element, idx) =>
        (sentence = sentence.replace(`htmlElementNo${idx}`, element))
    );
    return sentence;
  });
  return sentences;
};

const editorJson2RagtJson = (editorJson, lang = 'en') => {
  const getListAnnotation = (data) => {
    let itemsArr = [];
    dfsTree(data, itemsArr);

    itemsArr = itemsArr.filter((item) => item);
    if (lang === 'ja') {
      return `これは${
        data.style === 'ordered' ? '番号付き' : '箇条書きの'
      }リストで, ${data.items.length}個の項目と${
        itemsArr.length - data.items.length
      }個のサブ項目があります。`;
    }
    if (lang === 'vi') {
      return `Đây là danh sách được ${
        data.style === 'ordered' ? 'đánh số' : 'gạch đầu dòng'
      }, danh sách có ${data.items.length} mục chính và ${
        itemsArr.length - data.items.length
      } mục phụ.`;
    }
    return `This is ${
      data.style === 'ordered' ? 'Numbered' : 'Bulleted'
    } list, there are ${data.items.length} items and ${
      itemsArr.length - data.items.length
    } sub items`;
  };
  const getImageAnnotation = (alt) => {
    if (lang === 'ja') {
      return `ここに「${alt}」の画像があります。`;
    }
    if (lang === 'vi') {
      return `Đây là hình ảnh về ${alt}`;
    }
    return `This image is about ${alt}.`;
  };

  const buildMetaTable = (data) => {
    const content = [...data.content];
    const withHeadings = data.withHeadings;
    const totalRows = content?.length ?? 0;
    const totalCols = content[0]?.length ?? 0;
    if (lang === 'ja') {
      let annotation = `この下に、縦${totalRows}行、横${totalCols}列の表があります。\n`;
      if (data.caption) {
        annotation += `表のタイトルは${data.caption}、です。\n`;
      }
      if (data.headers?.length) {
        annotation += `見出し行は左から${data.headers.join('、')}です。`;
      } else if (withHeadings) {
        annotation += `見出し行は左から${content[0].join('、')}です。`;
      }
      const meta: MetaItem[] = [
        {
          id: Math.random().toString(36).substring(7),
          ui: annotation,
          polly: annotation,
          ssml: '',
          user: '',
          actions: [],
          isAutogenerated: true,
        },
      ];
      content.forEach((row, idx) => {
        const polly =
          idx === 0
            ? `データの1行目、${row.join('、')}、`
            : idx === row.length - 1
            ? `${idx + 1}行目、${row.join('、')}です。`
            : `${idx + 1}行目、${row.join('、')}、`;
        let ui = `<tr tabindex="0" aria-label="${polly}">`;
        row.forEach((cell) => {
          ui =
            withHeadings && idx === 0
              ? ui.concat(`<th aria-hidden="true">${cell}</th>`)
              : ui.concat(`<td aria-hidden="true">${cell}</td>`);
        });
        ui = ui.concat('</tr>');
        meta.push({
          ui,
          polly,
          ssml: '',
          user: '',
          actions: [],
        });
      });
      meta.push({
        id: Math.random().toString(36).substring(7),
        ui: `表の終わりです。`,
        polly: `表の終わりです。`,
        ssml: '',
        user: '',
        actions: [],
        isAutogenerated: true,
      });
      return meta;
    } else if (lang === 'vi') {
      let annotation = `Đây là dữ liệu dạng bảng, có ${totalRows} dòng, ${totalCols} cột.\n`;
      if (data.caption) {
        annotation += `Tiêu đề của bảng là ${data.caption}.\n`;
      }
      if (data.headers?.length) {
        annotation += `Các ô tiêu đề của bảng là ${data.headers.join(', ')}.`;
      } else if (withHeadings) {
        annotation += `Các ô tiêu đề của bảng là ${content[0].join(', ')}.`;
      }
      const meta: MetaItem[] = [
        {
          id: Math.random().toString(36).substring(7),
          ui: annotation,
          polly: annotation,
          ssml: '',
          user: '',
          actions: [],
          isAutogenerated: true,
        },
      ];
      content.forEach((row, idx) => {
        const polly =
          idx === 0
            ? `Dữ liệu hàng thứ nhất là ${row.join(', ')}.`
            : `Hàng thứ ${idx + 1}: ${row.join(', ')}.`;
        let ui = `<tr tabindex="0" aria-label="${polly}">`;
        row.forEach((cell) => {
          ui =
            withHeadings && idx === 0
              ? ui.concat(`<th aria-hidden="true">${cell}</th>`)
              : ui.concat(`<td aria-hidden="true">${cell}</td>`);
        });
        ui = ui.concat('</tr>');
        meta.push({
          ui,
          polly,
          ssml: '',
          user: '',
          actions: [],
        });
      });
      meta.push({
        id: Math.random().toString(36).substring(7),
        ui: `Kết thúc bảng.`,
        polly: `Kết thúc bảng.`,
        ssml: '',
        user: '',
        actions: [],
        isAutogenerated: true,
      });
      return meta;
    } else {
      let annotation = `This is table with ${totalRows} rows, ${totalCols} columns.\n`;
      if (data.caption) {
        annotation += `The title of the table is ${data.caption}.\n`;
      }
      if (data.headers?.length) {
        annotation += `The table headers are ${data.headers.join(', ')}.`;
      } else if (withHeadings) {
        annotation += `The table headers are ${content[0].join(', ')}.`;
      }
      const meta: MetaItem[] = [
        {
          id: Math.random().toString(36).substring(7),
          ui: annotation,
          polly: annotation,
          ssml: '',
          user: '',
          actions: [],
          isAutogenerated: true,
        },
      ];
      content.forEach((row, idx) => {
        const polly =
          idx === 0
            ? `The first line of data is ${row.join(', ')}.`
            : `Line ${idx + 1}: ${row.join(', ')}.`;
        let ui = `<tr tabindex="0" aria-label="${polly}">`;
        row.forEach((cell) => {
          ui =
            withHeadings && idx === 0
              ? ui.concat(`<th aria-hidden="true">${cell}</th>`)
              : ui.concat(`<td aria-hidden="true">${cell}</td>`);
        });
        ui = ui.concat('</tr>');
        meta.push({
          ui,
          polly,
          ssml: '',
          user: '',
          actions: [],
        });
      });
      meta.push({
        id: Math.random().toString(36).substring(7),
        ui: `End table.`,
        polly: `End table.`,
        ssml: '',
        user: '',
        actions: [],
        isAutogenerated: true,
      });
      return meta;
    }
  };

  //TODO: Generate meta data for each block
  const blocks = editorJson.blocks.map((block) => {
    let meta: any = [];
    //TODO: Paragraph, Header
    if ([BLOCK_TYPE.HEADER, BLOCK_TYPE.PARAGRAPH].includes(block.type)) {
      const sentences = splitSentences(block.data.text, lang);
      meta = sentences.map((sentence) => {
        const htmlTagRegex = /<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim;
        const aTagRegex =
          /<a.+?\s*href\s*=\s*["\']?(?<href>[^"\'\s>]+)["\']?/gi;
        return {
          ui: sentence,
          polly: sentence.replace(htmlTagRegex, ''),
          ssml: '',
          user: '',
          actions: [...sentence.matchAll(aTagRegex)]
            .map((item) => item.groups?.href)
            .filter((item) => !!item),
        };
      });
    }

    //TODO: List
    if (block.type === BLOCK_TYPE.LIST) {
      let items = [];
      getMetaByDfs(block.data, 'id', items);
      meta = [...items];
      meta = [
        {
          polly: getListAnnotation(block.data),
          ssml: '',
          user: '',
          actions: [],
          isAutogenerated: true,
        },
        ...meta,
      ];
    }

    //TODO: Image
    if (block.type === BLOCK_TYPE.IMAGE) {
      meta = [
        {
          polly: getImageAnnotation(block.data.caption),
          ssml: '',
          user: '',
          actions: [],
        },
      ];
    }

    //TODO: Table
    if (block.type === BLOCK_TYPE.TABLE) {
      meta = buildMetaTable(block.data);
      block.data = {
        withHeadings: block.data.heading,
        content: block.data.content,
      };
    }
    return {
      ...block,
      meta,
    };
  });

  return {
    ...editorJson,
    blocks,
  };
};

const ragtJson2a11y = (ragtJson, metaOpt: MetaOptions = {}) => {
  const htmlDefault = `<!DOCTYPE html><html><head></head><body></body></html>`;

  const $ = cheerio.load(htmlDefault);

  // add lang attribute to html tag
  $('html').attr('lang', $('html').attr('lang') || metaOpt.lang || 'en');

  // namespace html tag
  $('html').attr('xmlns', 'http://www.w3.org/1999/xhtml');

  // add title attribute to head tag
  if (metaOpt.title) {
    $('head').append(`<title>${metaOpt.title}</title>`);
  }

  // add favicon attribute to head tag
  if (metaOpt.favicon) {
    $('head').append(
      `<link rel="icon" type="image/x-icon" href="${metaOpt.favicon}">`
    );
  }

  // apply meta tags
  _applyMeta($, metaOpt.meta);
  _applySocialMeta($, metaOpt.socialMeta);

  // apply google analytics, if needed
  if (metaOpt.googleAnalyticsId) {
    _applyGoogleAnalytics($, metaOpt.googleAnalyticsId);
  }

  // apply css
  _applyCssRules($, metaOpt.cssLinks);

  ragtJson.blocks.forEach((block) => {
    //TODO: Paragraph
    if (block.type === BLOCK_TYPE.PARAGRAPH) {
      $('body').append(
        `<p id="${block.id}" tabindex="0">${block.data.text}</p>`
      );
    }
    //TODO: Header
    if (block.type === BLOCK_TYPE.HEADER) {
      $('body').append(
        `<h${block.data.level} id="${block.id}" tabindex="0">${block.data.text}</h${block.data.level}>`
      );
    }

    //TODO: List
    const dfsRender = ($, parentNode, style, items, id?: any) => {
      if (id) {
        parentNode.append(`<${style} id="${id}"></${style}>`);
        items.forEach((item) => {
          $(`#${id}`).append(`<li tabindex="0">${item.content}</li>`);
          if (item.items.length > 0) {
            dfsRender($, $(`#${id}`), style, item.items);
          }
        });
      } else {
        // random an id
        const autoId = Math.random().toString(36).substring(2, 15);
        parentNode.append(`<${style} id="${autoId}"></${style}>`);
        items.forEach((item) => {
          $(`#${autoId}`).append(`<li tabindex="0">${item.content}</li>`);
          if (item.items.length > 0) {
            dfsRender($, $(`#${autoId}`), style, item.items);
          }
        });
        $(`#${autoId}`).removeAttr('id');
      }
    };
    if (block.type === BLOCK_TYPE.LIST) {
      const styleTag = block.data.style === 'unordered' ? 'ul' : 'ol';
      dfsRender($, $('body'), styleTag, block.data.items, block.id);
    }
    //TODO: Image
    if (block.type === BLOCK_TYPE.IMAGE) {
      $('body').append(
        `<p tabindex="0" class="annotation">${block.meta[0].polly}</p>`
      );
      $('body').append(
        `<img id="${block.id}" src="${block.data?.file?.url || ''}" alt="${
          block.data.caption
        }" aria-hidden="true"></img>`
      );
    }

    //TODO: Table
    if (block.type === BLOCK_TYPE.TABLE) {
      $('body').append(
        `<p id="${block.meta[0].id}" tabindex="0" class="annotation">${block.meta[0].polly}</p>`
      );
      const bodyTable = block.meta.reduce((res, cur, idx) => {
        if (idx !== 0 && idx !== block.meta.length - 1) {
          return res.concat(cur.ui);
        } else {
          return res;
        }
      }, '');
      const table = `<table id="${block.id}">${bodyTable}</table>`;
      $('body').append(table);
      $('body').append(
        `<p id="${
          block.meta[block.meta.length - 1].id
        }" tabindex="0" class="annotation">${
          block.meta[block.meta.length - 1].polly
        }</p>`
      );
    }
  });
  return $.html();
};

/**
 *
 * @param ragtJson ragt json (EditorJS JSON + voice meta)
 * @returns
 */
const ragtJson2text = (ragtJson) => {
  let plainText: any = [];
  ragtJson.blocks.forEach((block) => {
    block?.meta?.forEach((sentence: any) => {
      plainText.push(sentence.polly);
      sentence?.actions?.forEach((action: any) => plainText.push(action));
    });
  });
  return plainText.join('\n');
};

/**
 * Convert editorjs JSON to A11y HTML
 * @param data EditorJS JSON
 * @returns A11y HTML
 */
const editorJson2A11yHtml = (data, metaHtml: MetaOptions = {}) => {
  // Convert editorjs JSON to ragt JSON
  const ragJson = editorJson2RagtJson(data, metaHtml.lang);
  // Convert ragt JSON to A11y HTML
  const a11yHtml = ragtJson2a11y(ragJson, metaHtml);

  return {
    html: a11yHtml,
    meta: ragJson,
  };
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

const cleanInline = (html) => {
  return sanitizeHtml(html, {
    allowedTags: ['a', 'mark'],
  });
};

const html2editorJson = (html) => {
  let res: { blocks: any[] } = {
    blocks: [],
  };
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
  };
  const metaOpts = buildMetaOptions(meta);
  let groupUnSupportTag: string[] = [];
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
            res.blocks.push({
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
            res.blocks.push({
              id,
              type: BLOCK_TYPE.PARAGRAPH,
              data: {
                text: cleanInline($(el).html()),
              },
            });
          }
          //TODO: Header
          if (['h1', 'h2', 'h3'].includes(el.name)) {
            res.blocks.push({
              id,
              type: BLOCK_TYPE.HEADER,
              data: {
                text: cleanInline($(el).html()),
                level: HEADER_LEVEL[el.name],
              },
            });
          }
          //TODO: List
          if (['ul', 'ol'].includes(el.name)) {
            const items = parseListItems($, el.children);
            res.blocks.push({
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
            res.blocks.push({
              id,
              type: BLOCK_TYPE.IMAGE,
              data: {
                file: {
                  url: $(el)?.attr('src') ?? '',
                },
                caption: $(el)?.attr('alt') ?? '',
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
            const content = rows
              .map((row) => {
                const cols = [
                  ...Array.from($(row).find('th')),
                  ...Array.from($(row).find('td')),
                ];
                if (cols.length > totalCols) {
                  totalCols = cols.length;
                }
                return cols.map((cell) => $(cell).html());
              })
              .map((row) => {
                return row.length < totalCols
                  ? Array(totalCols)
                      .fill('')
                      .map((_, i) => (row[i] ? row[i] : ''))
                  : row;
              });
            const firstRowHeading =
              $(firstRow)?.find('th')?.length === totalCols;
            const headers = Array.from($(el).find('th'))?.map((th) =>
              $(th)?.html()
            );
            const data = {
              withHeadings: !!firstRowHeading,
              content,
              ...(captionElement.length && {
                caption: $(captionElement).html()?.trim(),
              }),
              headers,
            };
            res.blocks.push({
              id,
              type: BLOCK_TYPE.TABLE,
              data,
            });
          }
        } else {
          //Group tag in case not supporting
          groupUnSupportTag.push($.html(el));
        }
      }
      if (el.type === 'text') {
        // random attribute id
        const id = Math.random().toString(36).substring(7);
        const text = $(el).text().trim();
        if (!!text) {
          res.blocks.push({
            id,
            type: BLOCK_TYPE.PARAGRAPH,
            data: {
              text: text,
            },
          });
        }
      }
    });
  return {
    json: res,
    meta: metaOpts,
  };
};

export {
  html2editorJson,
  editorJson2A11yHtml,
  ragtJson2text,
  editorJson2RagtJson,
  ragtJson2a11y,
};
