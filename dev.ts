import {
  // editorJson2A11yHtml,
  // html2editorJson,
  json2Text,
  html2Text,
  htmlSimplified2RagtJson,
  fromUrl,
  editorJson2RagtJson
} from './src/index';

// import { readFile, writeFile } from 'fs';

// const loadHtmlFromFile = async (path: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     readFile(path, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data.toString());
//       }
//     });
//   });
// };

// const saveHtmlToFile = async (path: string, html: string): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     writeFile(path, html, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

// (async () => {
//   const beforeFn = ` ($) => {
//     console.log('beforeFn hook');
//   }`;
//   const afterFn = ` ($) => {
//     console.log('afterrr hook');
//   }`;
//   const url =
//     'https://www.city.fukuoka.lg.jp/hofuku/coronavaccine/wakutin.html';
//   // 'http://127.0.0.1:5500/index.html';
//   // 'https://www.city.yatsushiro.lg.jp/kiji00318310/index.html';
//   // 'https://www.city.yatsushiro.lg.jp/kiji00312980/index.html';
//   const { html, body } = await fromUrl({
//     url,
//     // opt: {
//     //   contentSelectors: ['.container'],
//     //   hooks: {
//     //     before: beforeFn,
//     //     after: afterFn,
//     //   },
//     // },
//   });
//   await saveHtmlToFile('./data/test1-out.html', html || '');

//   const { json, meta: metaOpts } = html2editorJson(
//     `<html><head lang="ja"><title>【城南区】城南体育館の教室</title><meta name="viewport" content="width=device-width, initial-scale=1"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""><link rel="stylesheet" href="https://unpkg.com/a11y-css-reset/combo.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&amp;display=swap"><link rel="stylesheet" href="https://ragt-dev.s3.ap-southeast-1.amazonaws.com/public/ragt-convertor/ja.css"></head><body id="skg-style"><p>【城南区】城南体育館の教室<br/><br/>【場所・問い合わせ】<br/>城南体育館<br/>電話 092-851-0303<br/>FAX 092-851-0040<br/><br/>【料金】<br/>各4,500円(全10回分)<br/><br/>【定員】<br/>各抽選29人<br/><br/>【対象】<br/>18歳以上<br/><br/>【申し込み】<br/>12月16日までに同体育館で配布する申込書に記入の上、お申し込みください。<br/><br/>【教室名・開催日時】<br/>・やさしいピラティス　　1月6日から3月10日の金曜日　午後3時15分から4時45分<br/>・夜ヨガ　　　　　　　　1月10日から3月14日の火曜日　午後7時15分から8時45分<br/>・やさしいエアロビクス　1月10から3月14日の火曜日　　午前11時半から午後0時半<br/>・リフレッシュヨガ　　　1月11日から3月15日の水曜日　午前11時10分から午後0時40分<br/>・ZUMBA(ズンバ)　　　　1月13日から3月17日の金曜日　午前11時から正午<br/>・50歳から始める優しい運動教室　1月26日から3月30日の木曜日　午後1時半から3時<br/><br/>ここに「開催日時表」の画像があります。<br/>https://www.city.fukuoka.lg.jp/data/open/cnt/3/101072/1/221201_3jhonan_6.jpg?20221125092148<br/><br/></p></body></html>`
//   );
//   const { html: a11yHtml1, meta } = editorJson2A11yHtml(json, metaOpts);

//   // save meta data
//   await saveHtmlToFile('./data/test1-json.json', JSON.stringify(json));

//   await saveHtmlToFile('./data/test1-ragt.html', a11yHtml1 || '');

//   await saveHtmlToFile('./data/test1-meta.json', JSON.stringify(meta));

// })();

(async () => {

  // const {html} = await fromUrl({ url: 'https://www.city.higashiosaka.lg.jp/0000029964.html', opt: { contentSelectors: ['#mol_contents > div > table'] }})
  const html = `
  <html>
    <body>
      <table>
        <caption>相談窓口</caption>
        <tbody>
          <tr><th scope="col" align="center" class=" typesquare_option"><p class=" typesquare_option"><strong class=" typesquare_option">相談名</strong></p></th><th scope="col" align="center" colspan="3" class=" typesquare_option"><p class=" typesquare_option"><strong class=" typesquare_option">日時・場所</strong></p></th><th scope="col" align="center" class=" typesquare_option"><p class=" typesquare_option"><strong class=" typesquare_option">相談担当</strong></p></th><th scope="col" align="center" class=" typesquare_option"><p class=" typesquare_option"><strong class=" typesquare_option">内容</strong></p></th><th scope="col" align="center" class=" typesquare_option"><p class=" typesquare_option"><strong class=" typesquare_option">問合せ先</strong></p></th> </tr>
          <tr><td><p>弁護士相談</p></td><td colspan="3"><p>市役所本庁舎1階相談室<br>  　月・水・金曜日 13時00～16時30<br>  　第2火曜日 17時00～20時00<br>  巡回法律相談<br>  　いずれも13時00～16時00<br>  日下リージョンセンター　奇数月第2火曜日<br>  四条リージョンセンター　第2・4木曜日<br>  中鴻池リージョンセンター　偶数月第4火曜日<br>  若江岩田駅前リージョンセンター　第1・3木曜日<br>  楠根リージョンセンター　偶数月第2火曜日<br>  布施駅前リージョンセンター　第1・3火曜日<br>  近江堂リージョンセンター　奇数月第4火曜日<br>  ※1週間前から予約が可能。</p></td><td><p>弁護士</p></td><td><p>専門的な知識のいる法律問題に関する相談※ 同一内容の相談は1か月以上あけてください。</p></td><td rowspan="5"><p>市政情報相談課<br>  電話06-4309-3104<br>  ファクス0 6-4309-3801</p></td> </tr>
        </tbody>
      </table>
    </body>
  </html>
  `
  const data = htmlSimplified2RagtJson(html)
  console.log('ragt: ', JSON.stringify(data))

  // html2Text({
  //   html: html,
  //   contentSelectors: ['body'],
  //   titleSelector: '',
  //   iArticle: {
  //     title: '1234',
  //     publishDate: '1234',
  //     loadedUrl: 'https://baodang.com/test',
  //   },
  //   a11ySetting: {
  //     lang: 'vi',
  //     cssLinks: ['https://baodang/css/1', 'https://baodang/css/2'],
  //     meta: {},
  //     socialMeta: {},
  //     favicon: 'https://baodang/favicon.ico',
  //     googleAnalyticsId: 'GT_baodang',
  //   },
  // }).then((res) => {
  //   console.log(res.a11yHTML)
  // });

})();
