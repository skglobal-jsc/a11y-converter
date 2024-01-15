const fs = require('fs');
import { html2Text, fromUrl, editorJson2RagtJson } from './src/index';
import { tinyhtml } from './src/modules';

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
  const html = `<article class="contentGpArticleDoc" data-serial-id="gp_article_docs-2547">
  <div class="date">
<p class="publishedAt">公開日 2024年01月07日</p>
</div>


<div class="body">
<div class="text-beginning"><h3><span style="background-color:#99ff99">輪島市からのお願い</span></h3>

<div class="clearfix temp1">
<div class="thumb"><img alt="" src="file_contents/wajima48.jpg" style="height:281px; width:500px" title="wajima48"></div>

<p>現在、全国の皆様から寄附の申し出を電話やFAX、メール等にてご依頼頂いておりますが、被災者への支援等に総力で取り組むため、ふるさと納税関係書類の郵送を停止しております。</p>

<p><span style="color:#ee0000">ふるさと納税は、<a href="#災害支援サイト">各災害支援サイト（インターネット）</a>からお手続きをお願いいたします。</span></p>
</div>

<ul>
<li>既に電話やFAX、メールにて寄附の申し出をされた方については、書類・振込用紙（ゆうちょ銀行）の送付にお時間を頂きますが、準備が整い次第、ご自宅に郵送いたします。（2月上旬予定）</li>
<li>まだ寄附の申し出をされておらず、振込用紙（ゆうちょ銀行）による寄附を希望される方は、誠に申し訳ありませんが、2月以降ご連絡頂きますようご協力をお願いいたします。</li>
</ul>

<p>&nbsp;</p>

<h3><span id="災害支援サイト" name="災害支援サイト" style="background-color:#99ff99">ふるさと納税・災害支援サイト</span></h3>

<ul>
<li><a href="https://www.furusato-tax.jp/saigai/filter?category_id%5B%5D=1303" target="_blank">ふるさとチョイス<img src="/_themes/city/img/ic-blank.gif" alt="新しいウィンドウで外部サイトを開きます" class="external"></a></li>
<li><a href="https://furunavi.jp/c/disaster_support" target="_blank">ふるなび<img src="/_themes/city/img/ic-blank.gif" alt="新しいウィンドウで外部サイトを開きます" class="external"></a></li>
<li><a href="https://www.satofull.jp/oenkifu/oenkifu_detail.php?page_id=507" target="_blank">さとふる<img src="/_themes/city/img/ic-blank.gif" alt="新しいウィンドウで外部サイトを開きます" class="external"></a></li>
<li><a href="https://mifurusato.jp/item/ITM17204990001.html" target="_blank">三越伊勢丹ふるさと納税<img src="/_themes/city/img/ic-blank.gif" alt="新しいウィンドウで外部サイトを開きます" class="external"></a></li>
<li><a href="https://furusato-nouzei.event.rakuten.co.jp/mypage/disaster-donation?page-id=20240102&amp;l-id=furusato_pc_top_notice_2" target="_blank">楽天ふるさと納税<img src="/_themes/city/img/ic-blank.gif" alt="新しいウィンドウで外部サイトを開きます" class="external"></a></li>
</ul>
</div>
</div>



        <div class="tags" style="">
<h2>関連ワード</h2>
<ul>
<li style="">
<a href="/tags/%E8%83%BD%E7%99%BB%E5%8D%8A%E5%B3%B6%E5%9C%B0%E9%9C%87/">能登半島地震</a>
</li>
<li style="">
<a href="/tags/%E3%81%B5%E3%82%8B%E3%81%95%E3%81%A8%E7%B4%8D%E7%A8%8E/">ふるさと納税</a>
</li>
</ul>
</div>



    <div class="inquiry">
<h2>お問い合わせ</h2>
<address>
<div class="section">産業部　漆器商工課　ふるさと納税推進室</div><div class="tel"><span class="label">TEL</span>：0768-23-1144</div><div class="fax"><span class="label">FAX</span>：0768-23-1856</div><div class="email"><span class="label">E-Mail</span>：<a href="mailto:furusato@city.wajima.lg.jp">furusato@city.wajima.lg.jp</a></div>
</address>
</div>



</article>`;

  const { html: tinyHTML } = await tinyhtml(html);

  // const { html } = await fromUrl({
  //   url: 'https://www.city.wajima.ishikawa.jp/article/2024010700079',
  //   opt: {
  //     contentSelectors: ['#contentBody > article > div.inquiry'],
  //     iArticle: {
  //       title: '',
  //       publishDate: '',
  //       loadedUrl: 'https://www.city.wajima.ishikawa.jp/article/2024010700079',
  //     },
  //   },
  // });

  html2Text({
    html: tinyHTML,
    contentSelectors: ['body'],
    titleSelector: '',
    iArticle: {
      title: '1234',
      publishDate: '1234',
      loadedUrl: 'https://www.env.go.jp/park/akan/point/index.html',
    },
    a11ySetting: {
      cssLinks: [],
      meta: {},
      // socialMeta: {},
      // favicon: undefined,
      googleAnalyticsId: '',
      playerBar: {
        isEnable: true,
        ragtApiKey: 'JGFew89YsN3lOHSqfbNjD3ZjAa3WHMfG7xLJQYkm',
        ragtClientId: 'uv_crawling_SXN3TN4P5NJICPBH',
      },
      // cssLinks: [
      //   'https://devstage-basestack-databuckete3889a50-1g1xv7rv7flx1.s3.amazonaws.com/news/a11y/3fbe9f8877.css',
      //   'https://site.uni-voice.biz/css/1307.9f62991a.css'
      // ],
      // meta: {},
      // // favicon: undefined,
      // googleAnalyticsId: 'UA-XXXX-XXXXX',
      // playerBar: {
      //   isEnable: true,
      //   ragtApiKey: 'JGFew89YsN3lOHSqfbNjD3ZjAa3WHMfG7xLJQYkm',
      //   ragtClientId: 'uv_crawling_SXN3TN4P5NJICPBH'
      // }
    },
    // a11ySetting: {
    //   meta: {
    //     lang: 'ja',
    //     title: '',
    //     description: '',
    //     keywords: '',
    //     favicon: '',
    //     image: '',
    //     type: '',
    //     socialMeta: {
    //       title: '',
    //       type: '',
    //       image: '',
    //       description: '',
    //     },
    //     twitterMeta: {
    //       title: '',
    //       type: '',
    //       image: '',
    //       description: '',
    //     }
    //   },
    //   cssLinks: undefined,
    //   googleAnalyticsId: '',
    //   playerBar: {
    //     isEnable: true,
    //     ragtApiKey: 'JGFew89YsN3lOHSqfbNjD3ZjAa3WHMfG7xLJQYkm',
    //     ragtClientId: 'uv_crawling_SXN3TN4P5NJICPBH'
    //   }
    // },
  }).then((res) => {
    fs.writeFile('index.html', res.a11yHTML, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  });
})();
