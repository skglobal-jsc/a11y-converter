import * as cheerio from 'cheerio';

import {
  _applyCssRules,
  _applyMetaHead,
  _applyAccessibilityAttributes,
  _applyGoogleAnalytics,
} from './css';
import { replaceTextLinkToText, replaceTextLinkToHyperlink } from './hyperlink'
import { BLOCK_TYPE, CLASS_NAME, RAGT_PLAYER_INFO } from '../constant/index';
import { A11YSetting } from '../modules/html_2_text'
import { useLocale } from '../locale/index';

//TODO: Auto detect and hyperlink List block
const recursiveReplaceTextLinkToHyperlinkList = (items: any[], metaOpt: any) => {
  for (let i = 0; i < items.length; i++) {
    const row = items[i]; // contain "content" and "items"
    if (row.content) {
      row.content = replaceTextLinkToHyperlink(row.content, metaOpt.lang);
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

// level: { prefix: '', current: 0 }
const getMetaByDfs = (root, parentId, arr, prefixLevel = '') => {
  if (root.content) {
    // random attribute id
    const id = Math.random().toString(36).substring(7);
    const sentences = splitSentences(root.content);
    sentences.forEach((sentence, index) => {
      const htmlTagRegex = /<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim;
      const aTagRegex = /<a.+?\s*href\s*=\s*["\']?(?<href>[^"\'\s>]+)["\']?/gi;
      arr.push({
        parentId,
        id,
        ui: sentence,
        polly: (index === 0 ? prefixLevel : '') + sentence.replace(htmlTagRegex, ''),
        ssml: '',
        user: '',
        actions: [...sentence.matchAll(aTagRegex)]
          .map((item) => item.groups?.href)
          .filter((item) => !!item),
      });
    });
    root.items.forEach((item, index) => {
      getMetaByDfs(item, 'root', arr, prefixLevel + (index + 1) + '.');
    });
  } else {
    root.items.forEach((item, index) => {
      getMetaByDfs(item, 'root', arr, prefixLevel + (index + 1) + '.');
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
      ? /(?<!\w\.\w.)(?<=\。|\n)/g
      : /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\n)\s/g;
  const noHtmlSentences = noHtml.split(regexSplitSentences)

  let newNoHtmlSentences: Array<string> = [], j = 0;
  for(let i = 0; i < noHtmlSentences.length; i++) {
    if (i === 0) {
      newNoHtmlSentences[j] = noHtmlSentences[i]
    } else {
      if (newNoHtmlSentences[j].length <= 10) {
        newNoHtmlSentences[j] += noHtmlSentences[i]
      } else {
        j += 1;
        newNoHtmlSentences[j] = noHtmlSentences[i]
      }
    }
  }
  const sentences = newNoHtmlSentences.map((sentence) => {
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
    return useLocale({
      key: 'ListIntroduction',
      lang,
      value: {
        style: data?.style,
        rootItemNum: data?.items?.length,
        subItemNum: itemsArr?.length - data?.items?.length
      }
    })
  };

  const buildMetaTable = (data) => {
    const withHeadings = data.withHeadings;
    const content = [...data.content];
    const totalRows = content?.length ?? 0;
    const totalCols = content[0]?.length ?? 0;

    const annotation = useLocale({
      key: 'TableIntroduction',
      lang,
      value: { totalRows, totalCols }
    })
    const meta: any = [
      {
        id: Math.random().toString(36).substring(7),
        ui: annotation,
        polly: cheerio?.load(annotation)?.text(),
        ssml: '',
        user: '',
        actions: [],
        isAutogenerated: true,
        soundType: 'polly'
      },
    ];

    if (data.caption) {
      const caption = useLocale({
        key: 'TableCaptionForDisplay',
        lang,
        value: { caption: data.caption }
      })
      meta.push({
        id: Math.random().toString(36).substring(7),
        ui: data?.caption,
        polly: cheerio?.load(caption)?.text(),
        ssml: '',
        user: '',
        actions: [],
        isAutogenerated: true,
        soundType: 'polly'
      })
    }

    let index = 0;
    content.forEach((row, idx) => {
      let polly = ""
      if (idx === 0 && withHeadings) {
        const header = row.filter(item => item?.data).map(item => item.data).join(', ')
        polly = useLocale({
          key: "TableHeader",
          lang,
          value: { header }
        })
        index += 1
      } else if (idx === 0 && !withHeadings) {
        const rowData = row.filter(item => item?.data).map(item => item.data).join(', ')
        polly = useLocale({
          key: 'TableFirstLine',
          lang,
          value: { rowData }
        })
        index += 2
      } else {
        const rowData = row.filter(item => item?.data).map(item => item.data).join(', ')
        polly = useLocale({
          key: index === 1 ? 'TableFirstLine' : 'TableOtherLine',
          lang,
          value: { rowData, line: index, isEndRow: idx === content.length - 1 }
        })
        index += 1
      }

      polly = cheerio.load(polly).text();
      let ui = `<tr tabindex="0" aria-label="${polly}">`;
      row.forEach((cell) => {
        const className = (withHeadings && idx === 0) ? `class="${CLASS_NAME.tableHeader}"` : ''
        ui += `<td ${className} aria-hidden="true" ${cell.rowSpan ? `rowspan="${cell.rowSpan}"` : ''} ${cell.colSpan ? `colspan="${cell.colSpan}"` : ''}>${cell.data}</td>`
      });
      ui = ui.concat('</tr>');
      meta.push({
        ui,
        polly,
        ssml: '',
        user: '',
        actions: [],
        soundType: 'polly'
      });
    });

    const tableEnd = useLocale({ key: 'TableEnd', lang, value: '' })
    meta.push({
      id: Math.random().toString(36).substring(7),
      ui: tableEnd,
      polly: tableEnd,
      ssml: '',
      user: '',
      actions: [],
      isAutogenerated: true,
      soundType: 'polly'
    });
    return meta
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
            soundType: 'polly'
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
          soundType: 'polly'
        },
        ...meta,
      ];
    }

    //TODO: Image
    if (block.type === BLOCK_TYPE.IMAGE) {
      const imageAnnotation = useLocale({ key: 'ImageAnnotation', lang, value: { alt: block.data.caption } })
      meta = [
        {
          ui: imageAnnotation,
          polly: cheerio?.load(imageAnnotation)?.text(),
          ssml: '',
          user: '',
          actions: [],
          soundType: 'polly'
        },
      ];
    }

    //TODO: Table
    if (block.type === BLOCK_TYPE.TABLE) {
      meta = buildMetaTable(block.data);
      block.data = {
        withHeadings: block?.data?.withHeadings,
        content: block.data?.content || [],
        // ?.map(row => {
        //   return row.map(cell => cell.data || '')
        // }),
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

const ragtJson2A11Y = (ragtJson, a11ySetting?: A11YSetting) => {
  let metaOpt = { ...ragtJson?.metaOpt, ...a11ySetting } || {},
    blocks = ragtJson?.blocks || [];

  const htmlDefault = `<!DOCTYPE html><html><head></head><body></body></html>`;

  const $ = cheerio.load(htmlDefault);

  // apply meta tags
  _applyMetaHead($, metaOpt);

  // apply css
  _applyCssRules($, metaOpt.cssLinks);

   // apply google analytics, if needed
   if (metaOpt.googleAnalyticsId) {
    _applyGoogleAnalytics($, metaOpt.googleAnalyticsId);
  }

  // add player-bar
  const playerBar = a11ySetting?.playerBar || {}
  if (playerBar?.id && playerBar?.ragtClientId) {
    $("head").append(
      `<script type="module" crossorigin="true" src="${
        RAGT_PLAYER_INFO.script
      }?v=${Math.random()}"></script>`
    );
    const playerData = JSON.stringify({ id: playerBar.id })
    $("body").append(
      `<${RAGT_PLAYER_INFO.name} player-data='${playerData}' ragt-client-id="${playerBar.ragtClientId}"></${RAGT_PLAYER_INFO.name}>`
    );
  }

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
      if (!block.data?.file?.url) return
      // $('body').append(
      //   `<p tabindex="0" class="${CLASS_NAME.annotation}">${block.meta[0]?.ui}</p>`
      // );
      $('body').append(`
        <a href="${block.data?.file?.url}">
          <img id="${block.id}" src="${block.data?.file?.url}" alt="${
            cheerio?.load(block.meta[0]?.ui)?.text()
          }"></img>
        </a>
      `);
    }

    //TODO: Table
    if (block.type === BLOCK_TYPE.TABLE) {
      $('body').append(
        `<p id="${block.meta[0].id}" tabindex="0" class="${CLASS_NAME.annotation}">${block.meta[0].ui}</p>`
      );
      if (block.data?.caption) {
        $('body').append(
          `<h4 id="${block.meta[1].id}" tabindex="0" aria-label="${block.meta[1].polly}">${block.meta[1].ui}</h4>`
        );
      }
      let bodyTable = ''
      for(let i = (block.data?.caption ? 2 : 1); i < block?.meta?.length - 1; i++) {
        bodyTable += block?.meta[i]?.ui || ''
      }
      const table = `<table id="${block.id}">${bodyTable}</table>`;
      $('body').append(table);
      $('body').append(
        `<p id="${
          block.meta[block.meta.length - 1].id
        }" tabindex="0" class="${CLASS_NAME.annotation}">${
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
