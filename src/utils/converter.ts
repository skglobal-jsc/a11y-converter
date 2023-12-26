import {
  _setupHead,
  _applyMetaHead,
  _applyAccessibilityAttributes,
  _applyGoogleAnalytics,
} from './css';
import { replaceTextLinkToText, replaceTextLinkToHyperlink } from './hyperlink';

//TODO: Auto detect and hyperlink List block
export const recursiveReplaceTextLinkToHyperlinkList = (
  items: any[],
  metaOpt: any
) => {
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

export const convertRagtJsonTextToHyperlink = (ragtJson: any) => {
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
export const dfsTree = (root, arr) => {
  arr.push(root.content);
  root.items.forEach((item) => {
    dfsTree(item, arr);
  });
};

export const getMetaByDfs = (root, parentId, arr, prefixLevel = '') => {
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
        polly:
          (index === 0 ? prefixLevel : '') + sentence.replace(htmlTagRegex, ''),
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
export const splitSentences = (rawText, lang = 'en') => {
  const htmlElementRegex =
    /<(?:([A-Za-z0-9][A-Za-z0-9]*)\b[^>]*>(?:.*?)<\/\1>|[A-Za-z0-9][A-Za-z0-9]*\b[^>]*\/>)/gms;
  const htmlElements = rawText.match(htmlElementRegex) ?? [];
  let noHtml = rawText;
  htmlElements.forEach(
    (element, idx) =>
      (noHtml = noHtml.replace(element, `[htmlElementNo${idx}]`))
  );
  const regexSplitSentences =
    lang === 'ja'
      ? /(?<!\w\.\w.)(?<=\。|\n)/g
      : /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\n)\s/g;
  const noHtmlSentences = noHtml.split(regexSplitSentences);

  let newNoHtmlSentences: Array<string> = [],
    j = 0;
  for (let i = 0; i < noHtmlSentences.length; i++) {
    if (i === 0) {
      newNoHtmlSentences[j] = noHtmlSentences[i];
    } else {
      if (newNoHtmlSentences[j].length <= 10) {
        newNoHtmlSentences[j] += noHtmlSentences[i];
      } else {
        j += 1;
        newNoHtmlSentences[j] = noHtmlSentences[i];
      }
    }
  }
  const sentences = newNoHtmlSentences.map((sentence) => {
    htmlElements.forEach((element, idx) => {
      sentence = sentence.replace(`[htmlElementNo${idx}]`, element);
    });
    return sentence;
  });
  return sentences;
};
