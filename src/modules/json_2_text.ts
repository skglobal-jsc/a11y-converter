import * as cheerio from 'cheerio';
import { BLOCK_TYPE, LIST_STYLE } from '../constant/index';
import { useLocale } from '../locale/index';
import { IArticle } from './html_2_text';

enum TAG_NAME {
  Link = 'a',
  Paragraph = 'p',
  OrderedList = 'ol',
  UnorderedList = 'ul',
  Image = 'img',
  Table = 'table',
}

const cleanText = (text: string = '') => {
  const txt = text
    .replace(/ +\n/g, '\n')
    .replace(/\s+\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/　+/g, ' ')
    .replace(/  +/g, ' ')
    .replace(/\n +/g, '\n')
    .replace(/\n　+/g, '\n')
    .replace(/\n\t+/g, '\n')
    .trim();
  return txt;
};

/**
 * Parse paragraph to text
 * @param $p cheerio paragraph
 */
const parseParagraph2Text = ($p, iArticle?: IArticle): any => {
  let res = '';

  if (!$p?.children || $p.children.length === 0) {
    return cleanText($p.data);
  }
  $p?.children.forEach((element) => {
    // link tag
    if (element.name === TAG_NAME.Link) {
      let href = element?.attribs?.href || '';
      if (!href.includes('http') && iArticle?.loadedUrl) {
        const path = new URL(href, iArticle.loadedUrl);
        href = path.href;
      }
      res += `${parseParagraph2Text(element, iArticle)} - ${href}`;
    } else {
      res += parseParagraph2Text(element, iArticle);
    }
  });
  return res;
};

/**
 *
 * @param block block heading
 */
const parseHeading2Text = (block, iArticle?: IArticle) => {
  if (!block?.data?.text) return '';

  let text = '';
  if (block.data.level === 2) {
    text = '● ';
  }
  const $p = cheerio.load(block?.data?.text || '')('body')[0];
  text += parseParagraph2Text($p, iArticle);
  return text;
};

/**
 * Parse ordered list to text
 * @param block block list
 */
const parseOL2Text = (block, iArticle?: IArticle): any => {
  if (!block?.data?.items || block?.data?.items?.length === 0) {
    return '';
  }

  let text = '';
  const buildLiItem = (liItem) => {
    if (!liItem.items || liItem.items.length === 0) {
      const $p = cheerio.load(liItem.content || '')('body')[0];
      return parseParagraph2Text($p, iArticle);
    }
    let liText = '';
    liItem.items.forEach((item) => {
      liText += buildLiItem(item) + ' ';
    });
    return liText;
  };
  block.data.items.forEach((item, index) => {
    text += `${index + 1}. ${buildLiItem(item)}`;
    if (index + 1 < block.data.items.length) {
      text += '\n';
    }
  });

  return text;
};

/**
 * Parse unordered list to text
 * @param block block list
 */
const parseUoL2Text = (block, iArticle?: IArticle): any => {
  if (!block?.data?.items || block?.data?.items?.length === 0) {
    return '';
  }

  let text = '';
  const buildLiItem = (liItem) => {
    if (!liItem.items || liItem.items.length === 0) {
      const $p = cheerio.load(liItem.content || '')('body')[0];
      return parseParagraph2Text($p, iArticle);
    }
    let liText = '';
    liItem.items.forEach((item) => {
      liText += buildLiItem(item) + ' ';
    });
    return liText;
  };
  block.data.items.forEach((item, index) => {
    text += buildLiItem(item) + '\n';
    if (index + 1 < block.data.items.length) {
      text += '\n';
    }
  });

  return text;
};

/**
 * @param block block image
 */
const parseImage2Text = (block, lang = 'ja', iArticle?: IArticle): any => {
  if (!block?.data?.file?.url) return '';

  let text = block?.data?.caption
    ? `${useLocale('Image', lang, block.data.caption)}\n`
    : `${useLocale('ImageNoAlt')}\n`;

  if (block.data.file.url.includes('http')) {
    text += block.data.file.url;
  } else if (!block.data.file.url.startsWith('data:image')) {
    if (iArticle?.loadedUrl) {
      const path = new URL(block.data.file.url, iArticle.loadedUrl);
      text += path.href;
    } else {
      text += block.data.file.url;
    }
  }

  return text;
};

/**
 * @param block block table
 */
const parseTable2Text = (block, lang = 'ja', iArticle?: IArticle): any => {
  if (!block?.data?.content || block?.data?.content?.length === 0) return '';
  if (
    block?.data?.content?.length === 1 &&
    block?.data?.content[0]?.length === 1
  ) {
    const $p = cheerio.load(block?.data?.content[0][0] || '')('body')[0];
    return parseParagraph2Text($p, iArticle);
  }
  const totalRows = block?.data?.content?.length;
  const totalColumns = block?.data?.content[0]?.length;
  let text = `${
    useLocale('TableNumberRow', lang, (totalRows - 1).toString())
  }、${
    useLocale('TableNumberColumn', lang, totalColumns.toString())
  }\n`;

  if (block.data?.caption) {
    text += `${useLocale('TableCaption', lang, block.data?.caption)}`;
  }

  const rows = block.data.content;

  if (block.data?.withHeadings) {
    text += `${useLocale(
      'TableTitle',
      lang,
      rows?.shift()?.join(lang === 'ja' ? '、' : ', ')
    )}\n`;
  }

  for (let i = 0; i < rows?.length; i++) {
    if (i === 0) {
      text += useLocale('Table1stRow', lang);
    } else {
      text += useLocale('TableRow', lang, (i + 1).toString());
    }
    text += rows[i]
      ?.map((item) => {
        const $p = cheerio.load(item || '')('body')[0];
        return parseParagraph2Text($p, iArticle);
      })
      .filter(item => item)
      .join(lang === 'ja' ? '、' : ', ');
    if (i + 1 !== rows.length) {
      text += '\n'
    }
  }

  return text + `${lang === 'ja' ? '、' : ', '}${useLocale('TableEnd', lang)}`;
};

/**
 * Parse ragt json to plain text
 * @param ragJson
 * @param lang
 * @return { string }
 */
const json2Text = ({ json, iArticle }: { json: any; iArticle: IArticle }) => {
  const blocks = json?.blocks || [],
    metaOpt = json?.metaOpt || {};
  let res = '';

  (blocks || []).forEach((block) => {
    if (block.type === BLOCK_TYPE.LIST && block.data?.style === LIST_STYLE.ul) {
      res += parseUoL2Text(block, iArticle) + '\n';
    } else if (
      block.type === BLOCK_TYPE.LIST &&
      block.data?.style === LIST_STYLE.ol
    ) {
      res += parseOL2Text(block, iArticle) + '\n\n';
    } else if (block.type === BLOCK_TYPE.IMAGE) {
      res += parseImage2Text(block, metaOpt?.lang, iArticle) + '\n\n';
    } else if (block.type === BLOCK_TYPE.TABLE) {
      res += parseTable2Text(block, metaOpt?.lang, iArticle) + '\n\n';
    } else if (block.type === BLOCK_TYPE.HEADER) {
      res += parseHeading2Text(block, iArticle) + '\n\n';
    } else {
      const $p = cheerio.load(block?.data?.text || '')('body')[0];
      res += parseParagraph2Text($p, iArticle) + '\n\n';
    }
  });
  res =
    useLocale('StartArticle', metaOpt?.lang) +
    '\n\n' +
    res +
    '\n\n' +
    useLocale('EndArticle', metaOpt?.lang);
  return res;
};

export default json2Text;
