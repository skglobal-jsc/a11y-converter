import {
  // editorJson2A11yHtml,
  // html2editorJson,
  json2Text,
  html2Text,
  htmlSimplified2RagtJson,
  fromUrl
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
//   const htmlString = `
//   <!DOCTYPE html>
// <html lang="ja" xmlns="http://www.w3.org/1999/xhtml">
//   <head>
//     <meta name="viewport" content="width=device-width, initial-scale=1" />
//     <meta charset="utf-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <link rel="preconnect" href="https://fonts.googleapis.com" />
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
//     <link rel="stylesheet" href="https://unpkg.com/a11y-css-reset/combo.css" />
//     <link
//       rel="stylesheet"
//       href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&amp;display=swap"
//     />
//     <link
//       rel="stylesheet"
//       href="https://ragt-dev.s3.ap-southeast-1.amazonaws.com/public/ragt-convertor/ja.css?v=0.03504279427042811"
//     />
//   </head>
//   <body id="skg-style">
//     <p id="qbz88ndpog" tabindex="0">
//       Image:
//       https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800
//     </p>
//     <p id="i9IbS5XRg8" tabindex="0">
//       Doc:
//       https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc
//     </p>
//     <p id="54uc--t_iA" tabindex="0">
//       Excel:
//       https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls
//     </p>
//     <p id="4c6NEWK3m0" tabindex="0">
//       Powerpoint:
//       https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx
//     </p>
//     <p id="4tTQivB4E8" tabindex="0">
//       Pdf: https://www.africau.edu/images/default/sample.pdf
//     </p>
//     <p id="Fi1DHZqgrD" tabindex="0">
//       Link: https://test-code.uni-voice.biz/projects/search
//     </p>
//     <p id="t1oXY6o9Xg" tabindex="0">
//       <a href="https://test-code.uni-voice.biz/projects/search"
//         >Link by editor</a
//       >
//     </p>
//     <p id="o0ioRdWDue" tabindex="0">Email: xuanhaphamse97@gmail.com</p>
//     <p id="lYYuVs_bh-" tabindex="0">
//       Address: 大津市京町四丁目1番1号 京都府 〒602-8570
//     </p>
//     <p id="J2yDGn3yx5" tabindex="0">
//       <a
//         href="https://www.google.co.jp/maps/place/大津市京町四丁目1番1号 京都府    〒602-8570"
//         >Address by editor</a
//       >
//     </p>
//     <p id="FahG1MPHKb" tabindex="0">Phone: ８６ー４２２ー５２５３４９</p>
//     <p id="XSRPL5oxQW" tabindex="0">
//       <a href="tel:８６ー４２２ー５２５３４９">Phone by editor</a>
//     </p>
//     <p id="w77ir7" tabindex="0">この下に、縦3行、横2列の表があります。</p>
//     <table id="olDIlgj1wf">
//       <tbody>
//         <tr
//           tabindex="0"
//           aria-label="データの1行目、８６ー４２２ー５２５３４９、大津市京町四丁目1番1号 京都府 〒602-8570、"
//         >
//           <td aria-hidden="true">８６ー４２２ー５２５３４９</td>
//           <td aria-hidden="true">大津市京町四丁目1番1号 京都府 〒602-8570</td>
//         </tr>
//         <tr
//           tabindex="0"
//           aria-label="2行目、xuanhaphamse97@gmail.com、https://test-code.uni-voice.biz/projects/searchです。"
//         >
//           <td aria-hidden="true">xuanhaphamse97@gmail.com</td>
//           <td aria-hidden="true">
//             https://test-code.uni-voice.biz/projects/search
//           </td>
//         </tr>
//         <tr
//           tabindex="0"
//           aria-label="3行目、https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls、https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800、"
//         >
//           <td aria-hidden="true">
//             https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls
//           </td>
//           <td aria-hidden="true">
//             https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800
//           </td>
//         </tr>
//       </tbody>
//     </table>
//     <p id="r510vg" tabindex="0">表の終わりです。</p>
//   </body>
// </html>

//   `;
//   html2Text({
//     html: htmlString,
//     contentSelectors: ['#olDIlgj1wf'],
//     // titleSelector: '#contents > h1 > span',
//     iArticle: {
//       title: '1234',
//       publishDate: '1234',
//       loadedUrl: 'https://baodang.com/test',
//     },
//     a11ySetting: {
//       lang: 'vi',
//       cssLinks: ['https://baodang/css/1', 'https://baodang/css/2'],
//       meta: {},
//       socialMeta: {},
//       favicon: 'https://baodang/favicon.ico',
//       googleAnalyticsId: 'GT_baodang',
//     },
//   }).then((res) => {
//     // console.log(res);
//   });
  const html = await fromUrl({ url: 'https://tinhte.vn/thread/tren-tay-ps-vr2-mang-thoai-mai-hien-thi-rat-dep.3637405/', opt: { contentSelectors: ['body'] }})
  // console.log(html)
})();
