import $ from 'jquery';
import { BLOCK_TYPE } from '../../constant/index'
import { _applyCssRules, _applyGoogleAnalytics, _applyMeta, _applySocialMeta } from './css'

const ragtPlayerInfo = {
  name: 'wc-ragt-player',
  script:
    'https://ragt-dev.s3.ap-southeast-1.amazonaws.com/public/ragt-player/ragt-player.js',
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
        `<p id="${block.id}" tabindex="0">${block.data.text}</p>`
      );
    }
    //TODO: Header
    if (block.type === BLOCK_TYPE.HEADER) {
      $('body', htmlDOM).append(
        `<h${block.data.level} id="${block.id}" tabindex="0">${block.data.text}</h${block.data.level}>`
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
      $('body', htmlDOM).append(
        `<p tabindex="0" class="annotation">${block.data.caption}</p>`
      );
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
      const bodyTable = block.meta.reduce(
        (res: string, cur, idx: number) => {
          if (idx !== 0 && idx !== block.meta.length - 1) {
            return res.concat(cur.ui);
          } else {
            return res;
          }
        },
        ''
      );
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
