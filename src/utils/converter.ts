import * as cheerio from 'cheerio';

//TODO: Define constant
const BLOCK_TYPE = {
  PARAGRAPH: 'paragraph',
  HEADER: 'header',
  LIST: 'list',
  IMAGE: 'image',
  TABLE: 'table',
};

//TODO: Util functions
const dfsTree = (root, arr) => {
  arr.push(root.content);
  root.items.forEach((item) => {
    dfsTree(item, arr);
  });
};

const getMetaByDfs = (root, parentId, arr) => {
  // random attribute id
  const id = Math.random().toString(36).substring(7);
  if (root.content) {
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
        actions: [...sentence.matchAll(aTagRegex)].map(
          (item) => item.groups.href
        ),
      });
    });
  }
  root.items.forEach((item) => {
    getMetaByDfs(item, id, arr);
  });
};
const splitSentences = (rawText) => {
  const htmlElementRegex =
    /<(?:([A-Za-z0-9][A-Za-z0-9]*)\b[^>]*>(?:.*?)<\/\1>|[A-Za-z0-9][A-Za-z0-9]*\b[^>]*\/>)/gm;
  const htmlElements = rawText.match(htmlElementRegex) ?? [];
  let noHtml = rawText;
  htmlElements.forEach(
    (element, idx) => (noHtml = noHtml.replace(element, `htmlElementNo${idx}`))
  );
  const noHtmlSentences = noHtml.split(
    /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\:|\!|\n)\s/g
  );
  const sentences = noHtmlSentences.map((sentence) => {
    htmlElements.forEach(
      (element, idx) =>
        (sentence = sentence.replace(`htmlElementNo${idx}`, element))
    );
    return sentence;
  });
  return sentences;

  //   const htmlElementRegex =
  //     /<(?:([A-Za-z0-9][A-Za-z0-9]*)\b[^>]*>(?:.*?)<\/\1>|[A-Za-z0-9][A-Za-z0-9]*\b[^>]*\/>)/gm;
  //   const componentRegex =
  //     /<(?:([A-Za-z0-9][A-Za-z0-9]*)\b[^>]*>(?:.*?)<\/\1>|[A-Za-z0-9][A-Za-z0-9]*\b[^>]*\/>)|[^<>]+/gm;

  //   /* TODO: Split by html tag
  //     ['Sample of',
  //     ' ',
  //     '<mark class="cdx-marker">highlight</mark> ',
  //     ' ',
  //     '<a href="https://sk-global.biz">link</a> ',
  //     ' ',
  //     '<a href="tel:0934123456">phone</a> ',
  //     '<a href="https://www.google.co.jp/maps/place/74-truong-quoc-dung">map. Hello</a>',
  //     'world. Yeah!']
  //   */
  //   const components = rawText.match(componentRegex);

  //   /* TODO: Trim each item, split sentence
  //     [
  //       'Sample of',
  //       '<mark class="cdx-marker">highlight</mark>',
  //       '<a href="https://sk-global.biz">link</a>',
  //       '<a href="tel:0934123456">phone</a>',
  //       '<a href="https://www.google.co.jp/maps/place/74-truong-quoc-dung">map. Hello</a>',
  //       'world.',
  //       'Yeah!'
  //     ]
  // ]
  //   */
  //   const sentences = components.reduce((pre, cur) => {
  //     if (htmlElementRegex.test(cur)) {
  //       return [...pre, cur];
  //     } else {
  //       //TODO: Trim data
  //       const cleaned = cur.trim();
  //       if (!!cleaned) {
  //         //TODO: Split sentence
  //         return [
  //           ...pre,
  //           ...cleaned.split(
  //             /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\:|\!|\n)\s/g
  //           ),
  //         ];
  //       } else {
  //         //TODO: Ignore empty element
  //         return [...pre];
  //       }
  //     }
  //   }, []);
  //   return sentences;
};

const editorJson2ragtJson = (editorJson, lang = 'en') => {
  const getListAnnotation = (data) => {
    let itemsArr = [];
    dfsTree(data, itemsArr);

    itemsArr = itemsArr.filter((item) => item);
    return `This ${
      data.style === 'ordered' ? 'Numbered' : 'Bulleted'
    } list, there are ${data.items.length} items and ${
      itemsArr.length - data.items.length
    } sub items`;
  };
  const getImageAnnotation = (alt) => {
    switch (lang) {
      case 'ja':
        return `This image is about ${alt}.`;
      case 'en':
      default:
        return `This image is about ${alt}.`;
    }
  };

  const getTableAnnotation = (content, withHeadings) => {
    if (lang === 'ja') {
      //Japan annotation
      // TODO: BinhBV - 2021/09/01 - Add Japanese annotation
      const annotations = [
        `Below this is a table with ${content.length} vertical rows and ${content[0].length} horizontal columns.`,
      ];
      if (withHeadings) {
        annotations.push(
          `The heading rows are, from left to right, ${content[0].join(', ')}.`
        );
        for (let i = 1; i < content.length; i++) {
          i === 1
            ? annotations.push(
                `The first line of data is ${content[i].join(', ')}.`
              )
            : annotations.push(`line ${i}, ${content[i].join(', ')}.`);
        }
      } else {
        for (let i = 0; i < content.length; i++) {
          i === 0
            ? annotations.push(
                `The first line of data is ${content[i].join(', ')}.`
              )
            : annotations.push(`Line ${i + 1}, ${content[i].join(', ')}.`);
        }
      }
      annotations.push('End of table.');
      return annotations.join(' ');
    } else {
      const annotations = [
        `Below this is a table with ${content.length} vertical rows and ${content[0].length} horizontal columns.`,
      ];
      if (withHeadings) {
        annotations.push(
          `The heading rows are, from left to right, ${content[0].join(', ')}.`
        );
        for (let i = 1; i < content.length; i++) {
          i === 1
            ? annotations.push(
                `The first line of data is ${content[i].join(', ')}.`
              )
            : annotations.push(`line ${i}, ${content[i].join(', ')}.`);
        }
      } else {
        for (let i = 0; i < content.length; i++) {
          i === 0
            ? annotations.push(
                `The first line of data is ${content[i].join(', ')}.`
              )
            : annotations.push(`Line ${i + 1}, ${content[i].join(', ')}.`);
        }
      }
      annotations.push('End of table.');
      return annotations.join(' ');
    }
  };

  //TODO: Generate meta data for each block
  const blocks = editorJson.blocks.map((block) => {
    let meta: any = [];
    //TODO: Paragraph, Header
    if ([BLOCK_TYPE.HEADER, BLOCK_TYPE.PARAGRAPH].includes(block.type)) {
      const sentences = splitSentences(block.data.text);
      meta = sentences.map((sentence) => {
        const htmlTagRegex = /<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/gim;
        const aTagRegex =
          /<a.+?\s*href\s*=\s*["\']?(?<href>[^"\'\s>]+)["\']?/gi;
        return {
          ui: sentence,
          polly: sentence.replace(htmlTagRegex, ''),
          ssml: '',
          user: '',
          actions: [...sentence.matchAll(aTagRegex)].map(
            (item) => item.groups.href
          ),
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
        },
        ...meta,
      ];
    }

    //TODO: Image
    if (block.type === BLOCK_TYPE.IMAGE) {
      block.data.caption = getImageAnnotation(block.data.caption);
      meta = [
        {
          polly: block.data.caption,
          ssml: '',
          user: '',
          actions: [],
        },
      ];
    }

    //TODO: Table
    if (block.type === BLOCK_TYPE.TABLE) {
      meta = [
        {
          polly: getTableAnnotation(
            block.data.content,
            block.data.withHeadings
          ),
          ssml: '',
          user: '',
          actions: [],
        },
      ];
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

const ragtJson2a11y = (ragtJson) => {
  const htmlDefault = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- HTML Meta Tags -->
      <title></title>
      <meta name="description" content="" />

      <!-- Google / Search Engine Tags -->
      <meta itemprop="name" content="" />
      <meta itemprop="description" content="" />
      <meta itemprop="image" content="" />

      <!-- Facebook Meta Tags -->
      <meta property="og:url" content="" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="" />

      <!-- Twitter Meta Tags -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:image" content="" />
    </head>
    <body></body>
  </html>
  `;
  const $ = cheerio.load(htmlDefault);
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
        `<p tabindex="0" class="annotation">${block.data.caption}</p>`
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
        `<p tabindex="0" class="annotation">${block.meta[0].polly}</p>`
      );
      $('body').append(`<table id="${block.id}" aria-hidden="true"></table>`);
      block.data.content.forEach((row, idx) => {
        const rowId = Math.random().toString(36).substring(2, 15);
        $(`#${block.id}`).append(`<tr id="${rowId}"></tr>`);
        if (block.withHeadings && idx === 0) {
          row.forEach((cell) => {
            $(`#${rowId}`).append(`<th>${cell}</th>`);
          });
        } else {
          row.forEach((cell) => {
            $(`#${rowId}`).append(`<td>${cell}</td>`);
          });
        }
        $(`#${rowId}`).removeAttr('id');
      });
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
const editorJson2A11yHtml = (data) => {
  // Convert editorjs JSON to ragt JSON
  const ragJson = editorJson2ragtJson(data);

  // Convert ragt JSON to A11y HTML
  const a11yHtml = ragtJson2a11y(ragJson);

  return a11yHtml;
};

export { editorJson2A11yHtml, ragtJson2text };
