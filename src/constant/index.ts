export const BLOCK_TYPE = {
  PARAGRAPH: 'paragraph',
  HEADER: 'header',
  LIST: 'list',
  IMAGE: 'image',
  TABLE: 'table',
};
export const BLOCK_TAGS = [
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

export const HEADER_LEVEL = {
  h1: 1,
  h2: 2,
  h3: 3,
};
export const LIST_STYLE = {
  ul: 'unordered',
  ol: 'ordered',
};

export const UN_SUPPORTED_TAGS = [
  'audio',
  'canvas',
  'embed',
  'iframe',
  'map',
  'object',
  'svg',
  'video',
  'noscript',
  'script',
  'style',
];

export const SECTION_TAGS = [
  'section',
  'article',
  'aside',
  'nav',
  'header',
  'footer',
  'main',
  'div',
  'pre',
  'blockquote',
  'figure',
  'figcaption',
  'button',
  'summary',
  'details',
  'form',
];

export const UN_SUPPORTED_STYLE_TAGS = [
  'em',
  'small',
  'big', // deprecated
  'sub', // deprecated
  'strike',
  'samp',
  's',
];

// this is total block tags
export const EDITOR_BLOCK_TAGS = [
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
  'a',
  'img',
];
