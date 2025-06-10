import { html2Text, tinyhtml } from './src/index';

(async () => {
  const html = `
<html><body><section class="block" data-v-5dc72565=""><h2 class="" data-v-5dc72565="">ハンバーグのサウンドコラム</h2><!--[--><div class="" data-v-5dc72565=""><p class="mb-2" data-v-5dc72565="">サウンド1　コネて生まれる一体感</p><button class="self-stretch pl-4 pr-6 py-3 bg-[#484849] rounded-[6.25rem] flex items-center gap-4 cursor-pointer" tabindex="0" aria-label="音声を再生する" data-v-5dc72565="" data-v-2435c7c9=""><div class="flex-shrink-0 w-10 h-10 relative" aria-hidden="true" data-v-2435c7c9=""><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-2435c7c9=""><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM28 20L16 29V11L28 20Z" fill="white" style="fill:white;fill-opacity:1;" data-v-2435c7c9=""></path></svg></div><span class="text-left text-white text-base font-normal font-['Noto Sans JP'] leading-7" data-v-2435c7c9=""> 音声を再生する</span><audio src="/event/otodemirurecipe/mp3/19-1.mp3" preload="auto" data-v-2435c7c9=""></audio></button></div><div class="" data-v-5dc72565=""><p class="mb-2" data-v-5dc72565="">サウンド2　おいしく焼きあげる音のヒント</p><button class="self-stretch pl-4 pr-6 py-3 bg-[#484849] rounded-[6.25rem] flex items-center gap-4 cursor-pointer" tabindex="0" aria-label="音声を再生する" data-v-5dc72565="" data-v-2435c7c9=""><div class="flex-shrink-0 w-10 h-10 relative" aria-hidden="true" data-v-2435c7c9=""><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-2435c7c9=""><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM28 20L16 29V11L28 20Z" fill="white" style="fill:white;fill-opacity:1;" data-v-2435c7c9=""></path></svg></div><span class="text-left text-white text-base font-normal font-['Noto Sans JP'] leading-7" data-v-2435c7c9=""> 音声を再生する</span><audio src="/event/otodemirurecipe/mp3/19-2.mp3" preload="auto" data-v-2435c7c9=""></audio></button></div><!--]--></section></body></html>
`

  const data = await html2Text({ html, iArticle: {} as any })
  console.log(data)

  // html2Text({
  //   "html": '',
  //   contentSelectors: [],
  //   iArticle: {
  //     "title": "世田谷区防災ポータル",
  //     "publishDate": '',
  //     "author": [],
  //     "publisher": null,
  //     "thumbnailURL": '',
  //     "keywords": [],
  //     "originalType": "text/html",
  //     "taskId": "1lRDOfe8RHlIUoZFA2oLS",
  //     "id": "1lRDOfe8RHlIUoZFA2oLS-aHR0cHM6Ly9zZXRhZ2F5YS1ib3VzYWkubXkuc2l0ZS5jb20vI2VtZXJnZW5jeQ",
  //     "language": "ja",
  //     "gscType": "NEWS",
  //     "crawledAt": "2024-05-20T04:22:55.384Z",
  //     "URL": "https://setagaya-bousai.my.site.com/#emergency",
  //     "index": 0,
  //     "pageIndex": 1,
  //     "description": "\n\n * 緊急情報\n * お知らせ\n * 気象・地震情報\n * 避難情報\n * 避難所情報\n * メニュー\n\n\n\n\n\n\n\n\n\n\n\n\n * ライフライン\n * GIS 地図情報\n\n\n知っておきたい！\n日常の防災知識\n\n\n * 震災編\n * 水害・雪害・土砂災害編\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n緊急情報\n\n\n\n\n緊急情報 はありません。\n\n\n一覧を見る\n\n\n\n\n\n\n\nお知らせ\n\n\n\n\nお知らせ はありません。\n\n\n一覧を見る\n\n\n\n\n\n\n\n避難情報\n\n\n\n\n\n\n\n\n\n\n\n避難情報はありません。\n\n\n\n履歴を見る\n\n\n\n\n\n\n避難所情報\n\n\n\n\n\n\n\n\n開設中の避難所\n\n\n\n\n\n\n\n避難所情報はありません。\n\n\n\n\n\n\n\n\n\n\n現在地から探す\n\n\nGPS（位置情報）を有効にしてご利用ください。\n\nGPS（位置情報）が取得できない場合「現在地を設定する」をご利用ください。\n\n\n\n\n\n\n現在地を設定する\n\n\n\n\n\n名称から探す\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n×\n\n\n\n * \n   東京都世田谷区\n   \n   \n * \n   \n   \n   \n   \n   住所をご入力ください\n   \n   （例）４丁目２１−２７\n   \n   ※地点は凡その概算です。\n   \n   \n   \n\n\n\n設定\n\n\n\n\n\n\n\n\n×\n\n\n\n * \n   キーワード\n   \n   \n\n\n\n検索\n\n\n\n\n\n\n\n\n×\n\n\n\n * \n   避難所種別詳細\n   \n   全て\n   避難所（指定避難所）\n   水害時避難所（第１次）\n   水害時避難所（第２次）\n   土砂災害時避難所\n   野川・仙川洪水時避難所\n   \n   \n * \n   開設状況          \n   すべて\n   開設のみ\n   \n\n\n\n設定\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n避難所ナビ送信\nモード\n\n緯度\n\n経度\n\nキーワード\n\n避難所ナビサブミット\n\n\n\n\n\n開設状況・履歴一覧\n\n\n\n\n\n\n気象・地震情報\n\n\n\n\n\n\n\nライフ\nライン\n\n\n\nGIS地図情報\n\n\n\n文字サイズ\n\n\n大\n\n中\n\n小\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n知っておきたい！\n日常の防災知識\n\n\n\n * 震災編\n * 水害・雪害・\n   土砂災害編\n\n\n\n\n\n\nマニュアル\n\n災害時の情報\n\n日頃の備え・\n知っておきたい知識\n\n\n\n\nマニュアル\n\n災害時の情報\n\n日頃の備え・\n知っておきたい知識\n\n\n\n\n\n\n関連サイトリンク集\n\n\n\n世田谷区ホームページ\n\n\n\n\n区雨量・水位観測システム\n\n\n\n\n世田谷区の防災情報\n\n\n\n\n\n",
  //     "loadedUrl": "https://setagaya-bousai.my.site.com/#emergency",
  //     "articleCssPath": null
  //   },
  //   "a11ySetting": {
  //     "cssLinks": [],
  //     "meta": {},
  //     // "socialMeta": {},
  //     "googleAnalyticsId": "",
  //     "playerBar": {
  //       "isEnable": false,
  //       "ragtApiKey": "JGFew89YsN3lOHSqfbNjD3ZjAa3WHMfG7xLJQYkm",
  //       "ragtClientId": "uv_crawling_SXN3TN4P5NJICPBH"
  //     }
  //   }
  // }).then((res) => {
  //   console.log('res: ', res)
  //   fs.writeFile('index.html', res.a11yHTML, function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log('The file was saved!');
  //   });
  // });
})()
