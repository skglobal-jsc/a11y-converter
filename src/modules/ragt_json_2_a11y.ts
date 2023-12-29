import * as cheerio from 'cheerio';
import { A11YSetting } from '../@types';
import { _setupHead } from '../utils/css';
import { BLOCK_TYPE, CLASS_NAME, RAGT_PLAYER_INFO } from '../constant';

const _dfsRender = ({
  $,
  parentNode,
  style,
  items,
  id,
}: {
  $: cheerio.CheerioAPI;
  parentNode: cheerio.Cheerio<any>;
  style: string;
  items: any;
  id?: string;
}) => {
  if (id) {
    parentNode.append(`<${style} id="${id}"></${style}>`);
    items.forEach((item) => {
      $(`#${id}`).append(`<li tabindex="0">${item.content}</li>`);
      if (item.items.length > 0) {
        _dfsRender({ $, parentNode: $(`#${id}`), style, items: item.items });
      }
    });
    return;
  }

  // TODO: Random an id
  const autoId = Math.random().toString(36).substring(2, 15);
  parentNode.append(`<${style} id="${autoId}"></${style}>`);
  items.forEach((item) => {
    $(`#${autoId}`).append(`<li tabindex="0">${item.content}</li>`);
    if (item.items.length > 0) {
      _dfsRender({
        $,
        parentNode: $(`#${autoId}`),
        style,
        items: item.items,
      });
    }
  });
  $(`#${autoId}`).removeAttr('id');
};

export const ragtJson2A11Y = (ragtJson, a11ySetting?: A11YSetting) => {
  const newA11YSetting = { ...ragtJson?.metaOpt, ...a11ySetting },
    blocks = ragtJson?.blocks || [];
  const htmlDefault = `<!DOCTYPE html><html><head></head><body></body></html>`;
  const $: cheerio.CheerioAPI = cheerio.load(htmlDefault);

  // TODO: Setup head
  _setupHead({ $, scriptLinks: [], a11ySetting: newA11YSetting });

  // TODO: Add player-bar
  const playerBar = a11ySetting?.playerBar || {};
  if (playerBar?.id && playerBar?.ragtClientId) {
    $('head').append(
      `<script type="module" crossorigin="true" src="${
        RAGT_PLAYER_INFO.script
      }?v=${Math.random()}"></script>`
    );
    const playerData = JSON.stringify({ id: playerBar.id });
    $('body').append(
      `<${RAGT_PLAYER_INFO.name} player-data='${playerData}' ragt-client-id="${playerBar.ragtClientId}"></${RAGT_PLAYER_INFO.name}>`
    );
  }

  blocks.forEach((block) => {
    switch (block.type) {
      case BLOCK_TYPE.PARAGRAPH: // TODO: Paragraph
        _buildParagraph($, block);
        break;
      case BLOCK_TYPE.HEADER: // TODO: Header
        _buildHeader($, block);
        break;
      case BLOCK_TYPE.LIST: // TODO: List
        _buildList($, block);
        break;
      case BLOCK_TYPE.IMAGE: // TODO: Image
        _buildImage($, block);
        break;
      case BLOCK_TYPE.TABLE: // TODO: Table
        _buildTable($, block);
        break;
    }
  });

  // TODO: Clean "break-line" character from 2 up
  const regexPattern = /(<br\s*\/?>\s*){3,}|(\\n\s*\s*){3,}/gi;
  const a11yHTML = $.html().replace(regexPattern, '<br><br>');

  return a11yHTML;
};

const _buildImage = ($: cheerio.CheerioAPI, block: any) => {
  if (!block.data?.file?.url) return;
  $('body').append(
    `<a href="${block.data?.file?.url}"><img id="${block.id}" src="${
      block.data?.file?.url
    }" alt="${cheerio?.load(block.meta[0]?.ui)?.text()}"></img></a>`
  );
};

const _buildTable = ($: cheerio.CheerioAPI, block: any) => {
  $('body').append(
    `<p id="${block.meta[0].id}" tabindex="0" class="${CLASS_NAME.annotation}">${block.meta[0].ui}</p>`
  );
  if (block.data?.caption) {
    $('body').append(
      `<h4 id="${block.meta[1].id}" tabindex="0" aria-label="${block.meta[1].polly}">${block.meta[1].ui}</h4>`
    );
  }
  let bodyTable = '';
  for (let i = block.data?.caption ? 2 : 1; i < block?.meta?.length - 1; i++) {
    bodyTable += block?.meta[i]?.ui || '';
  }
  const table = `<table id="${block.id}">${bodyTable}</table>`;
  $('body').append(table);
  $('body').append(
    `<p id="${block.meta[block.meta.length - 1].id}" tabindex="0" class="${
      CLASS_NAME.annotation
    }">${block.meta[block.meta.length - 1].polly}</p>`
  );
};

const _buildList = ($: cheerio.CheerioAPI, block: any) => {
  const styleTag = block.data.style === 'unordered' ? 'ul' : 'ol';
  _dfsRender({
    $,
    parentNode: $('body'),
    style: styleTag,
    items: block.data.items,
    id: block.id,
  });
};

const _buildHeader = ($: cheerio.CheerioAPI, block: any) => {
  $('body').append(
    `<h${block.data.level} id="${block.id}" tabindex="0">
          ${(block?.meta || [])?.map((item) => item.ui)?.join(' ')}
        </h${block.data.level}>`
  );
};

const _buildParagraph = ($: cheerio.CheerioAPI, block: any) => {
  $('body').append(
    `<p id="${block.id}" tabindex="0">${(block?.meta || [])
      ?.map((item) => {
        return item.ui;
      })
      ?.join(' ')}</p>`
  );
};
