import * as cheerio from 'cheerio';

const wrapAnnotation = ($: cheerio.CheerioAPI, $el: cheerio.Cheerio<any>, child: any) => {
  const $wrapper = $('<div></div>');
  $wrapper.addClass(
    'uv_annotation w3-panel w3-pale-red w3-leftbar w3-rightbar w3-border-red'
  );
  $wrapper.append(child);
  $el.before($wrapper);
};

export const buildHeadingComponent = (
  $heading: cheerio.Cheerio<any>,
  speechText?: string
) => {
  // apply a11y attributes
  $heading.attr('role', 'heading');
  $heading.attr('tabindex', '0');
  $heading.attr(
    'id',
    $heading.attr('id') || `heading-${Math.random().toString(36).substr(2, 9)}`
  );
  // accessibility aria-label
  // $heading.attr('aria-label', speechText || $heading.text());

  // apply a11y styles
  $heading.addClass('uv_heading');
};

export const buildTextComponent = (
  $text: cheerio.Cheerio<any>,
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
  // $text.attr('aria-label', speechText || $text.text());

  // apply a11y styles
  $text.addClass('uv_text');
};

export const buildImageComponent = (
  $image: cheerio.Cheerio<any>,
  speechText?: string
) => {
  // apply a11y attributes
  $image.attr('role', 'img');
  $image.attr('tabindex', '0');

  $image.attr(
    'id',
    $image.attr('id') || `img-${Math.random().toString(36).substr(2, 9)}`
  );

  // apply a11y styles
  $image.addClass('uv_img');
};

export const buildListComponent = (
  $list: cheerio.Cheerio<any>,
  speechText?: string
) => {
  // apply a11y attributes
  $list.attr('role', 'list');
  $list.attr('tabindex', '0');
  $list.attr(
    'id',
    $list.attr('id') || `list-${Math.random().toString(36).substr(2, 9)}`
  );

  // apply a11y styles
  $list.addClass('uv_list');
};

export const buildTableComponent = ($table: cheerio.Cheerio<any>) => {
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

export const buildLinkComponent = ($link: cheerio.Cheerio<any>) => {
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
