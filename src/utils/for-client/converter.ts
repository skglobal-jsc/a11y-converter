import $ from 'jquery';
import { BLOCK_TYPE } from '../../constant/index';
import {
  _applyCssRules,
  _applyGoogleAnalytics,
  _applyMeta,
  _applySocialMeta,
} from './css';

const ragtPlayerInfo = {
  name: 'wc-ragt-player',
  script:
    'https://ragt-dev.s3.ap-southeast-1.amazonaws.com/public/ragt-player/ragt-player.js',
};

const dfsTree = (root: any, arr: any) => {
  arr.push(root.content);
  root.items.forEach((item: any) => {
    dfsTree(item, arr);
  });
};

const splitSentences = (rawText: any, lang = 'en') => {
  const htmlElementRegex =
    /<(?:([A-Za-z0-9][A-Za-z0-9]*)\b[^>]*>(?:.*?)<\/\1>|[A-Za-z0-9][A-Za-z0-9]*\b[^>]*\/>)/gm;
  const htmlElements = rawText.match(htmlElementRegex) ?? [];
  let noHtml = rawText;
  htmlElements.forEach(
    (element: any, idx: any) =>
      (noHtml = noHtml.replace(element, `htmlElementNo${idx}`))
  );
  const regexSplitSentences =
    lang === 'ja'
      ? /(?<!\w\.\w.)(?<=\。|\？|\！|\：|\n)/g
      : /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\:|\!|\n)\s/g;
  const noHtmlSentences = noHtml
    .split(regexSplitSentences)
    .filter((sentences: any) => !!sentences);
  const sentences = noHtmlSentences.map((sentence: any) => {
    htmlElements.forEach(
      (element: any, idx: any) =>
        (sentence = sentence.replace(`htmlElementNo${idx}`, element))
    );
    return sentence;
  });
  return sentences;
};

const getMetaByDfs = (root: any, parentId: any, arr: any) => {
  if (root.content) {
    // random attribute id
    const id = Math.random().toString(36).substring(7);
    const sentences = splitSentences(root.content);
    sentences.forEach((sentence: any) => {
      const htmlTagRegex = /<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim;
      const aTagRegex = /<a.+?\s*href\s*=\s*["\']?(?<href>[^"\'\s>]+)["\']?/gi;
      arr.push({
        parentId,
        id,
        ui: sentence,
        polly: sentence.replace(htmlTagRegex, ''),
        ssml: '',
        user: '',
        actions: [...sentence.matchAll(aTagRegex)].map(
          (item) => item.groups?.href
        ),
      });
    });
    root.items.forEach((item: any) => {
      getMetaByDfs(item, id, arr);
    });
  } else {
    root.items.forEach((item: any) => {
      getMetaByDfs(item, 'root', arr);
    });
  }
};

export const ragtJson2a11y = (
  ragtJson,
  metaOpt: MetaOptions = {},
  playerBarOption?: any
) => {
  const htmlDefault = `<!DOCTYPE html><html><head></head><body></body></html>`;
  const htmlDOM = new DOMParser().parseFromString(htmlDefault, 'text/html');
  // add lang attribute to html tag
  $('html', htmlDOM).attr('lang', metaOpt.lang || 'en');

  // namespace html tag
  $('html', htmlDOM).attr('xmlns', 'http://www.w3.org/1999/xhtml');

  // add title attribute to head tag
  if (metaOpt.title) {
    $('head', htmlDOM).append(`<title>${metaOpt.title}</title>`);
  }

  // add favicon attribute to head tag
  if (metaOpt.favicon) {
    $('head', htmlDOM).append(
      `<link rel="icon" type="image/x-icon" href="${metaOpt.favicon}">`
    );
  }

  // add ragt player script to head tag
  if (
    playerBarOption?.show &&
    playerBarOption?.ragtId &&
    playerBarOption?.ragtClientId
  ) {
    $('head', htmlDOM).append(
      `<script type="module" crossorigin="true" src="${
        ragtPlayerInfo.script
      }?v=${Math.random()}"></script>`
    );
  }

  // apply meta tags
  _applyMeta(htmlDOM, metaOpt.meta);
  _applySocialMeta(htmlDOM, metaOpt.socialMeta);

  // apply google analytics, if needed
  if (metaOpt.googleAnalyticsId) {
    _applyGoogleAnalytics(htmlDOM, metaOpt.googleAnalyticsId);
  }

  // apply css
  _applyCssRules(htmlDOM, metaOpt.cssLinks);

  // add ragt player to body
  if (
    playerBarOption?.show &&
    playerBarOption?.ragtId &&
    playerBarOption?.ragtClientId
  ) {
    $('body', htmlDOM).append(
      `<${ragtPlayerInfo.name} id="${playerBarOption.ragtId}" ragt-client-id="${playerBarOption.ragtClientId}"></${ragtPlayerInfo.name}>`
    );
  }

  ragtJson.blocks.forEach((block: any) => {
    //TODO: Paragraph
    if (block.type === BLOCK_TYPE.PARAGRAPH) {
      $('body', htmlDOM).append(
        `<p id="${block.id}" tabindex="0">
          ${(block?.meta || [])?.map((item) => item.ui)?.join(' ')}
        </p>`
      );
    }
    //TODO: Header
    if (block.type === BLOCK_TYPE.HEADER) {
      $('body', htmlDOM).append(
        `<h${block.data.level} id="${block.id}" tabindex="0">
          ${(block?.meta || [])?.map((item) => item.ui)?.join(' ')}
        </h${block.data.level}>`
      );
    }

    //TODO: List
    const dfsRender = (
      htmlDOM: any,
      parentNode: any,
      style: any,
      items: any,
      id?: any
    ) => {
      if (id) {
        parentNode.append(`<${style} id="${id}"></${style}>`);
        items.forEach((item: any) => {
          $(`#${id}`, htmlDOM).append(`<li tabindex="0">${item.content}</li>`);
          if (item.items.length > 0) {
            dfsRender(htmlDOM, $(`#${id}`, htmlDOM), style, item.items);
          }
        });
      } else {
        // random an id
        const autoId = Math.random().toString(36).substring(2, 15);
        parentNode.append(`<${style} id="${autoId}"></${style}>`);
        items.forEach((item: any) => {
          $(`#${autoId}`, htmlDOM).append(
            `<li tabindex="0">${item.content}</li>`
          );
          if (item.items.length > 0) {
            dfsRender(htmlDOM, $(`#${autoId}`, htmlDOM), style, item.items);
          }
        });
        $(`#${autoId}`, htmlDOM).removeAttr('id');
      }
    };
    if (block.type === BLOCK_TYPE.LIST) {
      const styleTag = block.data.style === 'unordered' ? 'ul' : 'ol';
      dfsRender(
        htmlDOM,
        $('body', htmlDOM),
        styleTag,
        block.data.items,
        block.id
      );
    }
    //TODO: Image
    if (block.type === BLOCK_TYPE.IMAGE) {
      // $('body', htmlDOM).append(
      //   `<p tabindex="0" class="annotation">${block.data.caption}</p>`
      // );
      $('body', htmlDOM).append(
        `<img id="${block.id}" src="${block.data?.file?.url || ''}" alt="${
          block.data.caption
        }" aria-hidden="true"></img>`
      );
    }

    //TODO: Table
    if (block.type === BLOCK_TYPE.TABLE) {
      $('body', htmlDOM).append(
        `<p id="${block.meta[0].id}" tabindex="0">${block.meta[0].polly}</p>`
      );
      const bodyTable = block.meta.reduce((res: string, cur, idx: number) => {
        if (idx !== 0 && idx !== block.meta.length - 1) {
          return res.concat(cur.ui);
        } else {
          return res;
        }
      }, '');
      const table = `<table id="${block.id}">${bodyTable}</table>`;
      $('body', htmlDOM).append(table);
      $('body', htmlDOM).append(
        `<p id=${block.meta[block.meta.length - 1].id} tabindex="0">${
          block.meta[block.meta.length - 1].polly
        }</p>`
      );
    }
  });
  return `<!DOCTYPE html>${htmlDOM.documentElement.outerHTML}`;
};

export const editorJson2RagtJson = (editorJson, lang = 'en') => {
  const getListAnnotation = (data: any) => {
    let itemsArr: any = [];
    dfsTree(data, itemsArr);

    itemsArr = itemsArr.filter((item: any) => item);
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
  const getImageAnnotation = (alt: any) => {
    if (lang === 'ja') {
      return `ここに「${alt}」の画像があります。`;
    }
    if (lang === 'vi') {
      return `Đây là hình ảnh về ${alt}`;
    }
    return `This image is about ${alt}.`;
  };
  const buildMetaTable = (data: any) => {
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
        row.forEach((cell: string) => {
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
        row.forEach((cell: string) => {
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
        row.forEach((cell: string) => {
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
  const blocks = editorJson.blocks.map((block: any) => {
    let meta: any = [];
    //TODO: Paragraph, Header
    if ([BLOCK_TYPE.HEADER, BLOCK_TYPE.PARAGRAPH].includes(block.type)) {
      const sentences = splitSentences(block.data.text, lang);
      meta = sentences.map((sentence: any) => {
        const htmlTagRegex = /<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim;
        const aTagRegex =
          /<a.+?\s*href\s*=\s*["\']?(?<href>[^"\'\s>]+)["\']?/gi;
        return {
          ui: sentence,
          polly: sentence.replace(htmlTagRegex, ''),
          ssml: '',
          user: '',
          actions: [...sentence.matchAll(aTagRegex)]
            .filter((item) => item && item.groups && item.groups?.href)
            .map((item) => item.groups?.href),
        };
      });
    }

    //TODO: List
    if (block.type === BLOCK_TYPE.LIST) {
      let items: any = [];
      getMetaByDfs(block.data, 'id', items);
      meta = [...items];
      meta = [
        {
          ui: getListAnnotation(block.data),
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
          ui: block.data.caption,
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
