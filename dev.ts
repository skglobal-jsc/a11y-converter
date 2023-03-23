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

  // const {html} = await fromUrl({ url: 'https://www.city.fukuoka.lg.jp/shicho/koho/fsdweb/2022/0801/0601.html', opt: { contentSelectors: ['.cbody'] }})
  const htmlString = `<!DOCTYPE html><html lang="vi" xmlns="http://www.w3.org/1999/xhtml"><head><title>福岡市 福岡アジア文化賞授賞式&amp;市民フォーラムを開催</title><meta name="viewport" content="width=device-width, initial-scale=1"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><script async="true" src="https://www.googletagmanager.com/gtag/js?id=GT_baodang"></script><script>window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GT_baodang');</script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""><link rel="stylesheet" href="https://baodang/css/1"><link rel="stylesheet" href="https://baodang/css/2"></head>
  <body id="skg-style">
    <p><br><br><br></p>
    <p><img src="https://google.com/images/test.png" alt="text" width="1000" height="1000"/></p>
    <p id="st1f4" tabindex="0">
        市は、アジアの学術研究や芸術・文化に貢献した人に「福岡アジア文化賞」を贈り、栄誉をたたえています。
      </p><p id="q3i19r" tabindex="0">
        ■ 市民フォーラムの参加者・視聴者を募集
      </p><p id="zaeca" tabindex="0">
        市民フォーラム(会場参加)を次の日程で行います。 いずれも参加無料で、後日録画配信も行います。 8月1日(月曜日)から各申込期限までに、ホームページ(「福岡アジア文化賞」で検索)から申し込んでください。 定員を超えた場合、抽選になります。
      </p><p id="f4uq8" tabindex="0">
        【市民フォーラム】
      </p><p id="4dmfwl" tabindex="0">
        ●林 英哲氏
      </p><p id="eucglf" tabindex="0">
        魂の響き～林英哲・太鼓の世界～(和太鼓の演奏あり)
      </p><p id="oggnfm" tabindex="0">
        【日時】 9月28日(水曜日)午後7時から8時半
      </p><p id="6ds3d2" tabindex="0">
        【場所】 電気ビル共創館みらいホール(中央区渡辺通二丁目)
      </p><p id="7iq2s" tabindex="0">
        【申し込み】 9月14日(水曜日)まで。 ※録画配信は、10月3日(月曜日)から11月2日(水曜日)。 9月29日(木曜日)までに申し込みを。
      </p><p id="dj5vm" tabindex="0">
        ●タイモン・スクリーチ氏
      </p><p id="75t" tabindex="0">
        神仏となった徳川家康～美術と建築からみる東照宮信仰～
      </p><p id="p62nnx" tabindex="0">
        【日時】 9月28日(水曜日)午後3時から5時
      </p><p id="y8snhs" tabindex="0">
        【場所】 市美術館ミュージアムホール(中央区大濠公園)
      </p><p id="i45ler" tabindex="0">
        【申し込み】 9月14日(水曜日)まで。 ※日本語による講演。 ゲストは法政大学名誉教授の田中優子氏。 録画配信は、10月3日(月曜日)から11月2日(水曜日)。 9月29日(木曜日)までに申し込みを。
      </p><p id="8o8dqn" tabindex="0">
        ●シャジア・シカンダー氏
      </p><p id="xdwlyl" tabindex="0">
        伝統を越えて世界と向き合う～シャジア・シカンダーの歩み、そしてアートに込めた思い～
      </p><p id="xezluf" tabindex="0">
        【日時】 9月30日(金曜日)午後6時半～8時20分
      </p><p id="oezfmd" tabindex="0">
        【場所】 福岡アジア美術館あじびホール(博多区下川端町リバレインセンタービル8階)
      </p><p id="rw8og" tabindex="0">
        【申し込み】 9月16日(金曜日)まで。 ※逐次通訳(日・英)あり。 録画配信は、10月5日(水曜日)から11月4日(金曜日)。 10月1日(土曜日)までに申し込みを。
      </p><p id="sec17m" tabindex="0">
        問い合わせは、福岡アジア文化賞市民フォーラム受付(メール
      </p><p id="3x9etl" tabindex="0">
        )へ。
      </p><p id="dj3fjc" tabindex="0">
        記事に関する問い合わせは、アジア連携課(電話 092-711-4930 FAX 092-735-4130)へ。
      </p><p id="u178yb" tabindex="0">
        福岡アジア文化賞今年度の受賞者
      </p><p id="z7fhao" tabindex="0">
        大賞
      </p><p id="m1pm9d" tabindex="0">
        林 英哲
      </p><p id="o9uhpi" tabindex="0">
        <br><br><a href="mailto:32acprize-pl@convention.co.jp">32acprize-pl@convention.co.jp</a><br><br></p><p tabindex="0" class="annotation">ここに「大賞受賞者」の画像があります。</p><img id="xcvldt" src="https://www.city.fukuoka.lg.jp/data/open/cnt/3/99570/1/20220801-06-01.jpg?20220824153339" alt="大賞受賞者" aria-hidden="true"><p id="ct25gj" tabindex="0">
        (日本/太鼓奏者)
      </p><p id="sez8p4" tabindex="0">
        創作太鼓音楽の最先端を走り続ける世界的奏者。 身体所作の力強さと美しさを伴う新しい舞台芸術として、太鼓の表現を飛躍的に発展させた。
      </p><p id="3hkcs" tabindex="0">
        学術研究賞
      </p><p id="wguw6e" tabindex="0">
        タイモン・スクリーチ
      </p><p id="9vps4m" tabindex="0">
        <br><br></p><p tabindex="0" class="annotation">ここに「学術研究賞受賞者」の画像があります。</p><img id="hyj1yj" src="https://www.city.fukuoka.lg.jp/data/open/cnt/3/99570/1/20220801-06-02.jpg?20220824153339" alt="学術研究賞受賞者" aria-hidden="true"><p id="gf34q" tabindex="0">
        (英国/美術史家)
      </p><p id="403kwa" tabindex="0">
        江戸期を主な研究分野とする美術史家。 浮世絵などを用いて歴史を解明し続け、その著書は国内外に大きな影響を与えている。
      </p><p id="b2rar8" tabindex="0">
        芸術・文化賞
      </p><p id="x62te" tabindex="0">
        シャジア・シカンダー
      </p><p id="ropeec" tabindex="0">
        <br><br></p><p tabindex="0" class="annotation">ここに「芸術・文化賞受賞者」の画像があります。</p><img id="eqjd1h" src="https://www.city.fukuoka.lg.jp/data/open/cnt/3/99570/1/20220801-06-03.jpg?20220824153339" alt="芸術・文化賞受賞者" aria-hidden="true"><p id="6m2ikm" tabindex="0">
        (米国/アーティスト)
      </p><p id="93xec4" tabindex="0">
        南アジアを代表するパキスタン出身の女性アーティスト。 伝統的な細密画の世界に、最新のデジタル技術を駆使し、新たな芸術表現を切り開いた。
      </p><p id="mo1kcsq" tabindex="0">
        <br><br></p><ul id="8s0hhc"><li tabindex="0">この記事をシェアする
</li></ul></body></html>`
  html2Text({
    html: htmlString,
    contentSelectors: ['body'],
    // titleSelector: '#contents > h1 > span',
    iArticle: {
      title: '1234',
      publishDate: '1234',
      loadedUrl: 'https://baodang.com/test',
    },
    a11ySetting: {
      lang: 'vi',
      cssLinks: ['https://baodang/css/1', 'https://baodang/css/2'],
      meta: {},
      socialMeta: {},
      favicon: 'https://baodang/favicon.ico',
      googleAnalyticsId: 'GT_baodang',
    },
  }).then((res) => {
    console.log(res.a11yHTML);
  });

  // /(<br\s*\/?>\s*){3,}|(\\n\s*\s*){3,}/gi

})();
