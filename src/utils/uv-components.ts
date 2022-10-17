import { parseTable } from '@sk-global/scrapeer';
import * as cheerio from 'cheerio';

const wrapAnnotation = ($: cheerio.Root, $el: cheerio.Cheerio, child: any) => {
  const $wrapper = $('<div></div>');
  $wrapper.addClass(
    'uv_annotation w3-panel w3-pale-red w3-leftbar w3-rightbar w3-border-red'
  );
  $wrapper.append(child);
  $el.before($wrapper);
};

export const buildHeadingComponent = (
  $heading: cheerio.Cheerio,
  speechText?: string
) => {
  // apply a11y attributes
  $heading.attr('role', 'heading');
  $heading.attr('aria-level', $heading.prop('tagName').replace('H', ''));
  $heading.attr('tabindex', '0');
  $heading.attr(
    'id',
    $heading.attr('id') || `heading-${Math.random().toString(36).substr(2, 9)}`
  );
  // accessibility aria-label
  $heading.attr('aria-label', speechText || $heading.text());

  // apply a11y styles
  $heading.addClass('uv_heading');
};

export const buildTextComponent = (
  $text: cheerio.Cheerio,
  speechText?: string
) => {
  // apply a11y attributes
  $text.attr('role', 'text');
  $text.attr('tabindex', '0');
  $text.attr(
    'id',
    $text.attr('id') || `text-${Math.random().toString(36).substr(2, 9)}`
  );

  // accessibility aria-label
  $text.attr('aria-label', speechText || $text.text());

  // apply a11y styles
  $text.addClass('uv_text');
};

export const buildImageComponent = (
  $image: cheerio.Cheerio,
  speechText?: string
) => {
  // apply a11y attributes
  $image.attr('role', 'img');
  $image.attr('tabindex', '0');
  $image.attr(
    'id',
    $image.attr('id') || `img-${Math.random().toString(36).substr(2, 9)}`
  );

  // accessibility aria-label
  $image.attr(
    'aria-label',
    speechText || $image.attr('alt') || $image.attr('title') || ''
  );

  // apply a11y styles
  $image.addClass('uv_img');
};

export const buildListComponent = (
  $list: cheerio.Cheerio,
  speechText?: string
) => {
  // apply a11y attributes
  $list.attr('role', 'list');
  $list.attr('tabindex', '0');
  $list.attr(
    'id',
    $list.attr('id') || `list-${Math.random().toString(36).substr(2, 9)}`
  );

  // accessibility aria-label
  $list.attr('aria-label', speechText || $list.text());

  // apply a11y styles
  $list.addClass('uv_list');
};

export const buildTableComponent = ($table: cheerio.Cheerio) => {
  // apply a11y attributes
  $table.attr('role', 'table');
  $table.attr('tabindex', '0');
  $table.attr(
    'id',
    $table.attr('id') || `table-${Math.random().toString(36).substr(2, 9)}`
  );

  // skip voiceover table header
  $table.attr('aria-hidden', 'true');

  // apply a11y styles
  $table.addClass('uv_table');
};

export const buildLinkComponent = ($link: cheerio.Cheerio) => {
  // apply a11y attributes
  $link.attr('role', 'link');
  $link.attr('tabindex', '0');
  $link.attr(
    'id',
    $link.attr('id') || `link-${Math.random().toString(36).substr(2, 9)}`
  );

  // skip voiceover link, read annotation instead of link
  $link.attr('aria-hidden', 'true');

  // apply a11y styles
  $link.addClass('uv_link');
};

export const buildTableAnnotation = ({
  $,
  language = 'ja',
  el,
}: {
  $: cheerio.Root;
  language: string;
  el: cheerio.Element;
}) => {
  const data = parseTable($, el);
  if (data) {
    // TODO: add support for each language
    const texts = [
      `この下に、縦${data.totalRows}行、横${data.totalCols}列の表があります。`,
      `表のタイトルは「${data.caption}」です。`,
      ...data.rows.map((row) => {
        if (row.index === 1) {
          return [`データの1行目`, ...row.cells].join('、');
        }
        return [`${row.index}行目`, ...row.cells].join('、');
      }),
    ];
    const text = texts.map((t) => `<p>${t}</p>`).join('');
    wrapAnnotation($, $(el), text);
  } else {
    wrapAnnotation($, $(el), 'ここに表があります。');
  }
};

export const buildImageAnnotation = ({
  $,
  language = 'ja',
  el,
}: {
  $: cheerio.Root;
  language: string;
  el: cheerio.Element; // image element
}) => {
  const altText = $(el).attr('alt');
  // TODO: add support for each language
  if (altText) {
    // apply annotation for img tag
    wrapAnnotation($, $(el), `ここに「${altText}」の画像があります。`);
  } else {
    // apply annotation for img tag
    wrapAnnotation($, $(el), 'ここに画像があります。');
  }
};
