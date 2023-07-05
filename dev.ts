import {
  // editorJson2A11yHtml,
  // html2editorJson,
  json2Text,
  html2Text,
  htmlSimplified2RagtJson,
  fromUrl,
  editorJson2RagtJson,
  tinyhtml,
  htmlSimplified2EditorJson
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

// https://www.javis.jp/news-1/%E8%80%B3%E3%81%A7%E8%81%B4%E3%81%8Fweb%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AB%E3%82%AA%E3%83%AA%E3%83%83%E3%82%AF%E3%82%B9%E7%94%9F%E5%91%BD%E3%81%8C%E8%BF%BD%E5%8A%A0%E3%81%95%E3%82%8C%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82
// https://www.satsuma-net.jp/kurashi_tetsuzuki/sumai/4/6339.html
(async () => {
  const {html} = await fromUrl({ url: 'https://www.fina-fukuoka2022.org/news/entry000452.html', opt: { contentSelectors: ['#news_index > div.wrap > div.contents.contents--column2 > div > article'] }})
  // const html = `<html lang="ja"><head><meta name="viewport" content="width=device-width, initial-scale=1"><meta charset="utf-8"><title>セイコーグループ株式会社と世界マスターズ水泳選手権2023九州大会のスポンサーになることに合意いたしました｜ニュース｜FINA世界水泳選手権大会2021福岡大会</title><meta name="description" content="セイコーグループ株式会社と世界マスターズ水泳選手権2023九州大会のスポンサーになることに合意いたしましたのページです。FINA世界水泳選手権大会2021福岡大会の公式Webサイトです。"><meta name="keywords" content=""><meta property="og:title" content="セイコーグループ株式会社と世界マスターズ水泳選手権2023九州大会のスポンサーになることに合意いたしました｜ニュース｜FINA世界水泳選手権大会2021福岡大会"><meta property="og:description" content="セイコーグループ株式会社と世界マスターズ水泳選手権2023九州大会のスポンサーになることに合意いたしましたのページです。FINA世界水泳選手権大会2021福岡大会の公式Webサイトです。"><meta property="og:type" content="article"><meta property="og:url" content="https://fina-fukuoka2021.org/news/20190806.html"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="format-detection" content="telephone=no"><link rel="icon" href="/common/img/common/favicon.ico"><link rel="apple-touch-icon" href="/common/img/common/apple-touch-icon.png"><meta property="og:locale" content="ja_JP"><meta property="og:site_name" content="世界水泳選手権2023福岡大会"><meta property="og:image" content="https://www.fina-fukuoka2022.org/common/img/common/og_image.png"><meta property="og:image:alt" content="世界水泳選手権2023福岡大会"></head><body><h2>セイコーグループ株式会社と世界マスターズ水泳選手権2023九州大会のスポンサーになることに合意いたしました</h2>2023年6月5日スポンサー<img src="/news/assets_c/2023/06/9bdb25a6a5c429eee8e1f9818d3e600f5715085e-thumb-800xauto-1553.jpg" alt="【修正】②セイコーロゴ.jpg"><p>世界水泳選手権2023福岡大会組織委員会は、セイコーグループ株式会社（東京都中央区銀座）と「世界マスターズ水泳選手権2023九州大会」のスポンサーになることについて合意いたしましたのでご報告いたします。</p><h4>契約内容</h4><p>「世界マスターズ水泳選手権2023九州大会」ナショナルサプライヤー</p><h4>契約の相手方</h4><p>会社名：セイコーグループ株式会社<br>本　社：東京都中央区銀座1丁目26番1号<br>代表者：代表取締役社長 高橋 修司</p></body></html>`


  html2Text({
    html: html,
    contentSelectors: ['body'],
    titleSelector: '',
    iArticle: {
      title: '1234',
      publishDate: '1234',
      loadedUrl: 'https://www.fina-fukuoka2022.org/news/entry000462.html',
    },

    a11ySetting: {
      meta: {
        lang: 'ja',
        title: '',
        description: '',
        keywords: '',
        favicon: '',
        image: '',
        type: '',
        socialMeta: {
          title: '',
          type: '',
          image: '',
          description: '',
        },
        twitterMeta: {
          title: '',
          type: '',
          image: '',
          description: '',
        }
      },
      cssLinks: ['https://baodang/example/file.css'],
      googleAnalyticsId: '',
      playerBar: {
        isEnable: true,
        ragtApiKey: '',
        ragtClientId: ''
      }
    },
  }).then((res) => {
    // console.log(JSON.stringify(res.ragtJson));
    console.log(res.a11yHTML);
  });
})();
