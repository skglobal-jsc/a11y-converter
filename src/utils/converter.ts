import * as cheerio from 'cheerio';

import {
  _applyCssRules,
  _applyMeta,
  _applySocialMeta,
  _applyAccessibilityAttributes,
  _applyGoogleAnalytics,
} from './css';
import { replaceTextLinkToText, replaceTextLinkToHyperlink } from './hyperlink'
import { BLOCK_TYPE } from '../constant/index';

//TODO: Auto detect and hyperlink List block
const recursiveReplaceTextLinkToHyperlinkList = (items: any[], metaOpt: any) => {
  for (let i = 0; i < items.length; i++) {
    const row = items[i]; // contain "content" and "items"
    if (row.content) {
      row.content = replaceTextLinkToText(row.content, metaOpt.lang);
    }
    if (row.items) {
      recursiveReplaceTextLinkToHyperlinkList(row.items, metaOpt);
    }
  }
};

const convertRagtJsonTextToHyperlink = (ragtJson: any) => {
  const { blocks, metaOpt } = ragtJson;
  // loop function to get all text from meta in ragtJson
  for (let i = 0; i < blocks.length; i++) {
    const { type, data, meta } = blocks[i];
    if (type === 'table') {
      // only replace for table type
      const { content } = data;
      for (let i = 0; i < content.length; i++) {
        const row = content[i];
        for (let j = 0; j < row.length; j++) {
          row[j] = replaceTextLinkToHyperlink(row[j], metaOpt.lang);
        }
      }
    } else if (type === 'list') {
      // only replace for list type
      const { items } = data;
      recursiveReplaceTextLinkToHyperlinkList(items, metaOpt);
    }
    meta.map((item) => {
      // replace text link to hyperlink for each object.ui in meta array
      if (!['list'].includes(type)) {
        // except table and list type
        item.ui = replaceTextLinkToHyperlink(item.ui, metaOpt.lang);
      }
      item.polly = replaceTextLinkToText(item.polly, metaOpt.lang);
    });
  }
  return ragtJson;
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
    /<(?:([A-Za-z0-9][A-Za-z0-9]*)\b[^>]*>(?:.*?)<\/\1>|[A-Za-z0-9][A-Za-z0-9]*\b[^>]*\/>)/gms;
  const htmlElements = rawText.match(htmlElementRegex) ?? [];
  let noHtml = rawText;
  htmlElements.forEach(
    (element, idx) => (noHtml = noHtml.replace(element, `[htmlElementNo${idx}]`))
  );
  const regexSplitSentences =
    lang === 'ja'
      ? /(?<!\w\.\w.)(?<=\。|\？|\！|\：|\n)/g
      : /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\:|\!|\n)\s/g;
  const noHtmlSentences = noHtml
    .split(regexSplitSentences)
  const sentences = noHtmlSentences.map((sentence) => {
    htmlElements.forEach(
      (element, idx) => {
        sentence = sentence.replace(`[htmlElementNo${idx}]`, element);
      }
    );
    return sentence;
  });
  return sentences;
};

const editorJson2RagtJson = (editorJson) => {
  const metaOpt = editorJson?.metaOpt || {};
  const lang = metaOpt?.lang || 'en';
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
    if (alt) {
      const annotation = {
        ja: `ここに<span class="annotation-text">「${alt}」</span>の画像があります。`,
        vi: `Đây là hình ảnh về <span class="annotation-text">${alt}</span>.`,
        en: `This image is about <span class="annotation-text">${alt}</span>.`,
      };
      return annotation[lang] || annotation.en;
    } else {
      const annotation = {
        ja: 'ここに画像があります。',
        vi: 'Đây là một bức hình',
        en: 'There is a image',
      };
      return annotation[lang] || annotation.en;
    }
  };

  const buildMetaTable = (data) => {
    const withHeadings = data.withHeadings;
    const content = [...data.content];
    const totalRows = content?.length ?? 0;
    const totalCols = content[0]?.length ?? 0;

    if (lang === 'ja') {
      let annotation = `この下に、<span class="annotation-text">縦${totalRows}行</span>、<span class="annotation-text">横${totalCols}列</span>の表(ひょう)があります。<br/>`;
      if (data.caption) {
        annotation += `表(ひょう)のタイトルは、<span class="annotation-text">${data.caption}</span>、です。<br/>`;
      }
      if (withHeadings) {
        annotation += `見出し行は左から、${content[0].reduce((res, item) =>
          res + `<span class="annotation-text">${cheerio?.load(item)?.text()}</span>、`
          , ''
        )}です。`;
      }
      const meta: any = [
        {
          id: Math.random().toString(36).substring(7),
          ui: annotation,
          polly: cheerio?.load(annotation)?.text(),
          ssml: '',
          user: '',
          actions: [],
          isAutogenerated: true,
        },
      ];
      content.forEach((row, idx) => {
        let polly =
          idx === 0
            ? `データの1行目、${row.join('、')}、`
            : idx === row.length - 1
            ? `${idx + 1}行目、${row.join('、')}です。`
            : `${idx + 1}行目、${row.join('、')}、`;
        polly = cheerio.load(polly).text();
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
      let annotation = `Đây là dữ liệu dạng bảng, <span class="annotation-text">có ${totalRows} dòng</span>, <span class="annotation-text">${totalCols} cột</span>.<br/>`;
      if (data.caption) {
        annotation += `Tiêu đề của bảng là <span class="annotation-text">${data.caption}</span>.<br/>`;
      }
      if (withHeadings) {
        annotation += `Các ô tiêu đề của bảng là ${content[0].reduce((res, item, index) =>
          res + `<span class="annotation-text">${cheerio?.load(item)?.text()}</span>${index !== (content[0]?.length - 1) ? ', ' : ''}`
          , ''
        )}.`;
      }
      const meta: any = [
        {
          id: Math.random().toString(36).substring(7),
          ui: annotation,
          polly: cheerio?.load(annotation)?.text(),
          ssml: '',
          user: '',
          actions: [],
          isAutogenerated: true,
        },
      ];
      content.forEach((row, idx) => {
        let polly =
          idx === 0
            ? `Dữ liệu hàng thứ nhất là ${row.join(', ')}.`
            : `Hàng thứ ${idx + 1}: ${row.join(', ')}.`;
        polly = cheerio.load(polly).text();
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
      let annotation = `This is table with <span class="annotation-text">${totalRows} rows</span>, <span class="annotation-text">${totalCols} columns</span>.<br/>`;
      if (data.caption) {
        annotation += `The title of the table is <span class="annotation-text">${data.caption}</span>.<br/>`;
      }
      if (withHeadings) {
        annotation += `The table headers are ${content[0]?.reduce((res, item, index) =>
          res + `<span class="annotation-text">${cheerio?.load(item)?.text()}</span>${index !== (content[0]?.length - 1) ? ', ': ''}`
          , ''
        )}.`;
      }
      console.log('annotation: ', annotation)
      const meta: any = [
        {
          id: Math.random().toString(36).substring(7),
          ui: annotation,
          polly: cheerio?.load(annotation)?.text(),
          ssml: '',
          user: '',
          actions: [],
          isAutogenerated: true,
        },
      ];
      content.forEach((row, idx) => {
        let polly =
          idx === 0
            ? `The first line of data is ${row.join(', ')}.`
            : `Line ${idx + 1}: ${row.join(', ')}.`;
        polly = cheerio.load(polly).text();
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
  const blocks = (editorJson?.blocks || []).map((block) => {
    let meta: any = [];
    //TODO: Paragraph, Header
    if ([BLOCK_TYPE.HEADER, BLOCK_TYPE.PARAGRAPH].includes(block.type)) {
      const sentences = splitSentences(block.data.text, lang);
      meta = sentences
        .map((sentence) => {
          const htmlTagRegex = /<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim;
          const aTagRegex =
            /<a.+?\s*href\s*=\s*["\']?(?<href>[^"\'\s>]+)["\']?/gi;
          return {
            ui: sentence.replace('\n', '<br \>'),
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
          ui: getImageAnnotation(block.data.caption),
          polly: cheerio?.load(getImageAnnotation(block.data.caption))?.text(),
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
        caption: block.data?.caption || '',
      };
    }
    return {
      ...block,
      meta,
    };
  });

  const ragtJson = convertRagtJsonTextToHyperlink({ ...editorJson, blocks })

  return ragtJson
};

const ragtJson2A11Y = (ragtJson, a11ySetting = {}) => {
  let metaOpt = { ...ragtJson?.metaOpt, ...a11ySetting } || {},
    blocks = ragtJson?.blocks || [];
  const htmlDefault = `<!DOCTYPE html><html><head></head><body></body></html>`;

  const $ = cheerio.load(htmlDefault);

  // add lang attribute to html tag
  $('html').attr('lang', $('html').attr('lang') || metaOpt?.lang || 'en');

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

  blocks.forEach((block) => {
    //TODO: Paragraph
    if (block.type === BLOCK_TYPE.PARAGRAPH) {
      $('body').append(
        `<p id="${block.id}" tabindex="0">
          ${(block?.meta || [])?.map((item) => {
            return item.ui
          })?.join(' ')}
        </p>`
      );
    }
    //TODO: Header
    if (block.type === BLOCK_TYPE.HEADER) {
      $('body').append(
        `<h${block.data.level} id="${block.id}" tabindex="0">
          ${(block?.meta || [])?.map((item) => item.ui)?.join(' ')}
        </h${block.data.level}>`
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
        `<p tabindex="0" class="annotation">${block.meta[0]?.ui}</p>`
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
        `<p id="${block.meta[0].id}" tabindex="0" class="annotation">${block.meta[0].ui}</p>`
      );
      let bodyTable = ''
      for(let i = 1; i < block?.meta?.length - 1; i++) {
        bodyTable += block?.meta[i]?.ui || ''
      }
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

  // Clean "break-line" character from 2 up
  const regexPattern = /(<br\s*\/?>\s*){3,}|(\\n\s*\s*){3,}/gi
  const a11yHTML = $.html().replace(regexPattern, '<br><br>')

  return a11yHTML;
};

export { editorJson2RagtJson, ragtJson2A11Y };
