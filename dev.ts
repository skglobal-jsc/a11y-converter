import { html2Text, tinyhtml } from './src/index';

(async () => {
  const html = `
<html><body>
<div id="content" class="max-w-4xl mx-auto px-8 py-8" data-v-5dc72565="" tabindex="-1"><div class="flex-col justify-start items-start gap-4 inline-flex mb-12" data-v-5dc72565=""><h1 class="self-stretch text-white text-[28px] font-light font-['Noto Sans JP'] leading-[39.20px]" data-v-5dc72565="">ふわふわに仕上がる、お好み焼きのレシピ</h1><p class="self-stretch text-white text-base font-normal font-['Noto Sans JP'] leading-7" data-v-5dc72565="">みんなで食べればおいしさ格別。</p><div class="self-stretch justify-start items-center gap-2 inline-flex" data-v-5dc72565=""><p class="text-white text-base font-normal font-['Noto Sans JP'] leading-7" data-v-5dc72565=""> 調理時間は35分 </p></div></div><section class="block" data-v-5dc72565=""><h2 class="" data-v-5dc72565="">4人分の材料</h2><div data-v-5dc72565=""><!--[--><div class="" data-v-5dc72565="">豚バラ薄切り肉 6枚</div><div class="" data-v-5dc72565="">塩 少々</div><div class="" data-v-5dc72565="">粗びき黒こしょう 少々</div><div class="" data-v-5dc72565="">キャベツ 6枚</div><div class="" data-v-5dc72565="">青ねぎ 1本</div><div class="" data-v-5dc72565="">刻んだ紅しょうが 15グラム</div><div class="" data-v-5dc72565="">揚げ玉 20グラム</div><div class="" data-v-5dc72565="">水 4分の3カップ 150グラム</div><div class="" data-v-5dc72565="">ほんだし 小さじ1と2分の1</div><div class="" data-v-5dc72565="">卵 Lサイズ 2個</div><div class="" data-v-5dc72565="">おろし長いも 120グラム</div><div class="" data-v-5dc72565="">薄力粉 140グラム</div><div class="" data-v-5dc72565="">サラダ油 大さじ4</div><div class="" data-v-5dc72565="">お好み焼きソース 大さじ6</div><div class="" data-v-5dc72565="">ピュアセレクトサラリアマヨネーズ 大さじ6</div><div class="" data-v-5dc72565="">削り節 2 パック</div><div class="" data-v-5dc72565="">青のり 小さじ2</div><!--]--></div></section><section class="block" data-v-5dc72565=""><h2 class="" data-v-5dc72565="">調理器具</h2><div data-v-5dc72565=""><!--[--><div class="" data-v-5dc72565="">計量カップ</div><div class="" data-v-5dc72565="">計量スプーン</div><div class="" data-v-5dc72565="">フライパン</div><div class="" data-v-5dc72565="">包丁</div><div class="" data-v-5dc72565="">まな板</div><div class="" data-v-5dc72565="">粉ふるい</div><div class="" data-v-5dc72565="">ボウル</div><div class="" data-v-5dc72565="">泡立てき</div><div class="" data-v-5dc72565="">菜箸</div><div class="" data-v-5dc72565="">フライ返し</div><div class="" data-v-5dc72565="">フタ</div><!--]--></div></section><section class="block" data-v-5dc72565=""><h2 class="" data-v-5dc72565="">つくり方</h2><div data-v-5dc72565=""><!--[--><div class="" data-v-5dc72565="">1 </div><div class="" data-v-5dc72565="">豚肉 6枚は2から3等分に切って、塩こしょうをする。キャベツ 6枚を粗く刻み、青ねぎ 1本はこぐちぎりにする。</div><div class="" data-v-5dc72565=""></div><div class="mt-8" data-v-5dc72565="">2 </div><div class="" data-v-5dc72565="">ボウルに水 150ミリリットル、ほんだし 小さじ1と2分の1を入れてよく混ぜる。割りほぐした卵 2個、おろし長いも 120グラムの順に加えて混ぜる。ふるっておいた薄力粉 140グラムを加える。泡立てきで、なめらかになるまで混ぜ合わせる。</div><div class="" data-v-5dc72565=""></div><div class="mt-8" data-v-5dc72565="">3 </div><div class="" data-v-5dc72565="">ボウルにキャベツ、青ねぎを加えて混ぜ合わせる。</div><div class="" data-v-5dc72565=""></div><div class="mt-8" data-v-5dc72565="">4 </div><div class="" data-v-5dc72565="">フライパンにサラダ油 大さじ1を熱する。ボウルの生地 4分の1を、直径14から15センチメートルの大きさに丸く広げる。紅しょうが 15グラム、揚げ玉 4分の1を上にふりかける。</div><div class="" data-v-5dc72565=""></div><div class="mt-8" data-v-5dc72565="">5 </div><div class="" data-v-5dc72565="">生地の上に、豚肉の4分の1を全体にのせる。ボウルの生地を少量のせて広げ、中火で焼く。</div><div class="" data-v-5dc72565=""></div><div class="mt-8" data-v-5dc72565="">6 </div><div class="" data-v-5dc72565="">香ばしい匂いがしたら裏返し、弱火でフタをして火が通るまで焼く。残り3枚も同様に焼く。</div><div class="" data-v-5dc72565=""></div><div class="mt-8" data-v-5dc72565="">7 </div><div class="" data-v-5dc72565="">皿にもり、お好み焼きソース 大さじ6、マヨネーズ 大さじ6を塗る。削り節 2 パック、青のり 小さじ2を上に散らす。</div><!--]--></div></section><section class="block" data-v-5dc72565=""><h2 class="" data-v-5dc72565="">一人当たりの栄養情報</h2><div data-v-5dc72565=""><!--[--><div class="" data-v-5dc72565="">エネルギー 677キロカロリー</div><div class="" data-v-5dc72565="">塩分 2.6グラム</div><div class="" data-v-5dc72565="">タンパク質 15.5グラム</div><div class="" data-v-5dc72565="">野菜摂取量 83グラム</div><div class="" data-v-5dc72565="">野菜摂取量は、きのこ類、いも類を除く</div><!--]--></div></section><!--[--><div class="px-4 justify-center items-center gap-2 inline-flex" data-v-5dc72565=""><div class="grow shrink basis-0 h-[102px] py-6 justify-center items-center gap-2 flex" data-v-5dc72565=""><div class="grow shrink basis-0 text-white text-[19px] font-normal font-['Noto Sans JP'] leading-relaxed" data-v-5dc72565=""> 料理がもっと楽しくなるポイントをご紹介します </div></div></div><section class="block" data-v-5dc72565=""><h2 class="" data-v-5dc72565="">お好み焼きのサウンドコラム</h2><!--[--><div class="" data-v-5dc72565=""><p class="mb-2" data-v-5dc72565="">サウンド1　ベストな、焼き加減が分かる音</p><button class="self-stretch pl-4 pr-6 py-3 bg-[#484849] rounded-[6.25rem] flex items-center gap-4 cursor-pointer" tabindex="0" aria-label="音声を再生する" data-v-5dc72565="" data-v-2435c7c9=""><div class="flex-shrink-0 w-10 h-10 relative" aria-hidden="true" data-v-2435c7c9=""><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-2435c7c9=""><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM28 20L16 29V11L28 20Z" fill="white" style="fill:white;fill-opacity:1;" data-v-2435c7c9=""></path></svg></div><span class="text-left text-white text-base font-normal font-['Noto Sans JP'] leading-7" data-v-2435c7c9=""> 音声を再生する</span><audio src="/event/otodemirurecipe/mp3/4-1.mp3" preload="auto" data-v-2435c7c9=""></audio></button></div><div class="" data-v-5dc72565=""><p class="mb-2" data-v-5dc72565="">サウンド2　ひっくり返すタイミング</p><button class="self-stretch pl-4 pr-6 py-3 bg-[#484849] rounded-[6.25rem] flex items-center gap-4 cursor-pointer" tabindex="0" aria-label="音声を再生する" data-v-5dc72565="" data-v-2435c7c9=""><div class="flex-shrink-0 w-10 h-10 relative" aria-hidden="true" data-v-2435c7c9=""><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-2435c7c9=""><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM28 20L16 29V11L28 20Z" fill="white" style="fill:white;fill-opacity:1;" data-v-2435c7c9=""></path></svg></div><span class="text-left text-white text-base font-normal font-['Noto Sans JP'] leading-7" data-v-2435c7c9=""> 音声を再生する</span><audio src="/event/otodemirurecipe/mp3/4-2.mp3" preload="auto" data-v-2435c7c9=""></audio></button></div><!--]--></section><section class="block" data-v-5dc72565=""><h2 class="" data-v-5dc72565="">盛り付けのイメージ</h2><div data-v-5dc72565=""><!--[--><div class="" data-v-5dc72565="">焼いた生地を皿にのせ、お好み焼きソースを生地の上に まんべんなく塗る。その上からマヨネーズを お好み焼きの端から端まで、平行線を描くようにジグザグに絞る。最初の線を目安に、次の線を指１本分ずつずらして進める。削り節を全体にふりかけ、青のりを生地の中心に散らす。</div><!--]--></div><img src="/event/otodemirurecipe/recipe_images/4.webp" width="100%" alt="お好み焼きの盛り付け参考の料理写真です" data-v-5dc72565=""></section><!--]--><div class="navblock" data-v-5dc72565=""><h2 class="" data-v-5dc72565="">ナビゲーション</h2><a href="#" class="linkbtn" data-v-5dc72565="">レシピ一覧ページに戻る</a><a href="/event/otodemirurecipe/" class="linkbtn" data-v-5dc72565="">トップページに戻る</a></div></div>
</body></html>
`

  const data = await html2Text({ html, iArticle: {} as any })
  console.log('data: ', data)

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
