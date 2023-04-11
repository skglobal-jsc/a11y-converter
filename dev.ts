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

  // const {html} = await fromUrl({ url: 'https://www.city.sapporo.jp/shobo/toyohira/index.html', opt: { contentSelectors: ['#tmp_contents'] }})
  const html = `

<!--?xml version="1.0" encoding="utf-8" ?--><!DOCTYPE html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  lang="ja"
  xml:lang="ja"
  xmlns:og="http://ogp.me/ns#"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <meta http-equiv="Content-Script-Type" content="text/javascript" />
    <title>豊平消防署／札幌市</title>
    <meta
      name="keywords"
      content="札幌市豊平消防署,豊平消防署,豊平署,札幌豊平署"
    />
    <meta
      name="description"
      content="札幌市豊平消防署のご案内・お知らせです。"
    />
    <meta name="author" content="札幌市" />
    <meta name="viewport" content="width=device-width, maximum-scale=3.0" />
    <meta name="format-detection" content="telephone=no" />
    <link
      href="/shared/style/default.css"
      rel="stylesheet"
      type="text/css"
      media="all"
    />
    <link
      href="/shared/style/shared.css"
      rel="stylesheet"
      type="text/css"
      media="all"
    />
    <link
      href="/shared/style/color/color0.css"
      rel="stylesheet"
      type="text/css"
      media="all"
      id="tmp_color"
      title="default"
      class="tmp_color"
    />
    <link
      href="/shared/style/color/color1.css"
      rel="alternate stylesheet"
      type="text/css"
      media="all"
      title="darkblue"
      class="tmp_color"
    />
    <link
      href="/shared/style/color/color2.css"
      rel="alternate stylesheet"
      type="text/css"
      media="all"
      title="yellow"
      class="tmp_color"
    />
    <link
      href="/shared/style/color/color3.css"
      rel="alternate stylesheet"
      type="text/css"
      media="all"
      title="black"
      class="tmp_color"
    />
    <link
      href="/shared/templates/free/style/edit.css"
      rel="stylesheet"
      type="text/css"
      media="all"
    />
    <link
      href="/shared/style/smartphone.css"
      rel="stylesheet"
      media="only screen and (max-width : 767px)"
      type="text/css"
      id="tmp_smartphone_css"
    />
    <link
      href="/shared/templates/free/style/sp_edit.css"
      rel="stylesheet"
      type="text/css"
      media="all"
      id="tmp_sp_edit_css"
    />
    <link
      href="/shared/images/favicon/favicon.ico"
      rel="shortcut icon"
      type="image/vnd.microsoft.icon"
    />
    <link
      href="/shared/images/favicon/apple-touch-icon-precomposed.png"
      rel="apple-touch-icon-precomposed"
    />
    <meta property="og:title" content="豊平消防署" />
    <meta property="og:type" content="article" />
    <meta
      property="og:url"
      content="https://www.city.sapporo.jp/shobo/toyohira/index.html"
    />
    <meta
      property="og:image"
      content="https://www.city.sapporo.jp/shared/system/images/municipal_emblem.jpg"
    />
    <meta property="og:description" content="" />
    <meta property="og:site_name" content="札幌市" />
  </head>
  <body>
    <p><span>更新日：2023年4月11日</span></p>

    <h1>豊平消防署</h1>

    <p><span>豊平消防署は、豊平区を管轄する消防署です。</span></p>

    <img
      alt=""
      height="495"
      src="https://www.city.sapporo.jp/shobo/toyohira/images/teamtoyohira.jpg"
      width="700"
    />
    <h2>豊平消防署からのお知らせ</h2>
    <h3>新着情報</h3>
    <table width="100%">
      <tbody>
        <tr>
          <td width="20%">2023年4月10日</td>
          <td>
            <a
              href="https://www.city.sapporo.jp/shobo/toyohira/2023harubou.html"
              >令和5年度春の火災予防運動実施します！</a
            >
          </td>
        </tr>
        <tr>
          <td width="20%">2022年12月22日</td>
          <td>
            <a
              href="https://www.city.sapporo.jp/shobo/toyohira/221220nakanoshimapatororu.html"
              >火の用心！中の島地区で防火パトロール実施</a
            >
          </td>
        </tr>
        <tr>
          <td width="20%">2022年12月3日</td>
          <td>
            <a
              href="https://www.city.sapporo.jp/shobo/toyohira/20221203misono.html"
              >『美園あっぷる少年消防クラブ』防火パトロール</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <span
        >『豊平消防署過去のお知らせ』は、以下のアドレスからご覧いただけます。</span
      ><br /><span> </span
      ><a href="https://www.city.sapporo.jp/shobo/toyohira/kako.html"
        >https://www.city.sapporo.jp/shobo/toyohira/kako.html</a
      >
    </p>
    <h3>豊平消防署メールマガジン会員募集中</h3>
    <p>
      <span
        >会員事業所様に火災発生情報、防火管理のポイント、火災実験動画など日常の防火管理にお役立ていただける情報を配信するとともに、防火に関する疑問やこんなパンフレットがほしいといったご要望にお応えします。</span
      >
    </p>
    <p>
      <span
        >詳しい概要や会員登録方法は、以下のアドレスからご覧いただけます。</span
      ><a href="https://www.city.sapporo.jp/shobo/toyohira/merumaga.html"
        >https://www.city.sapporo.jp/shobo/toyohira/merumaga.html</a
      >
    </p>

    <h2>豊平区の火災情報</h2>
    <h3>令和5年中の火災発生状況</h3>
    <table width="80%">
      <tbody>
        <tr>
          <td width="25%">&nbsp;</td>
          <td width="25%">
            <strong><span>件数</span></strong>
          </td>
          <td width="25%">
            <strong><span>死者</span></strong>
          </td>
          <td width="25%">
            <strong><span>負傷者</span></strong>
          </td>
        </tr>
        <tr>
          <td>令和5年</td>
          <td>11件</td>
          <td>1名</td>
          <td>0名</td>
        </tr>
        <tr>
          <td>
            <p><span>令和4年</span></p>
          </td>
          <td>8件</td>
          <td>2名</td>
          <td>2名</td>
        </tr>
        <tr>
          <td>同日比増減</td>
          <td>+3</td>
          <td>-1</td>
          <td>-2</td>
        </tr>
      </tbody>
    </table>
    <p><span>（令和5年3月31日時点）</span></p>
    <h3>最近、豊平区で発生した火災</h3>
    <p>
      <span>・令和5年3月30日（木曜日）に平岸地区で火災が発生しました。</span>
    </p>
    <p>
      <span>・令和5年3月24日（金曜日）に東月寒地区で火災が発生しました。</span>
    </p>
    <p>
      <span
        >・令和5年3月21日（火曜日）に車両（ごみ収集車）火災が発生しました。</span
      >
    </p>
    <h3>
      今月のワンポイント火災予防<span
        ><span>～火災は家の中だけではなく、「外」でも起こる～</span></span
      >
    </h3>
    <p>
      <span
        >札幌市内でも桜の開花が始まり、春の陽気が感じられる季節になってきました。</span
      ><br /><span>
        気温が暖かくなると放火による火災が増える傾向にあります。</span
      >
    </p>
    <p>
      <span>そこで今月のワンポイント火災予防は、</span
      ><span
        ><span><span>「放火されない環境づくり」</span></span></span
      ><br /><span> </span><br /><span>
        放火を防ぐためには、燃えやすいものを放置しないことです。特に、マンション・アパートの郵便受けにたまったチラシや家の周りにある不用品などは放火犯に狙われやすいため、日頃から整理するようにしましょう。</span
      >
    </p>
    <p>
      <span
        >また、人目につきにくい場所も放火されやすいため、物陰にはセンサーライトを設置するなどの対策も有効です。</span
      >
    </p>
    <p>
      <span
        >家の周りを整理するだけで放火のリスクは大きく減らせます。身の回りの整理は火災予防につながりますが、家の中だけではなく「外」にも目を向けて整理整頓に努めましょう。</span
      >
    </p>
    <h2>地域の活動</h2>
    <h3>豊平消防団</h3>

    <p>
      <span
        >消防団は、札幌市民の安全と安心を守るという重要な役割を担っています。本業を持ちながら「自分たちのまちは自分たちで守る」という精神に基づき、消防防災活動を行っています。</span
      ><br /><span> </span><br /><span>
        豊平区では、約150名の消防団員が活躍しています。</span
      ><br /><span>
        詳しい活動紹介は、以下のアドレスからご覧いただけます。</span
      >
    </p>

    <img
      alt="消防団の紹介（豊平分団小隊訓練の写真）"
      height="200"
      src="https://www.city.sapporo.jp/shobo/toyohira/images/toyohirasyoutai.jpg"
      width="300"
    />

    <p>
      <a href="https://www.city.sapporo.jp/shobo/toyohira/toyodan1.html"
        >https://www.city.sapporo.jp/shobo/toyohira/toyodan1.html</a
      >
    </p>
    <h3>豊平区防火委員会</h3>

    <p>
      <span
        >防火委員会は、各町内会から推薦された委員の方々で組織されています。</span
      >
    </p>
    <p>
      <span
        >委員の皆さんは、地域の自主的な防火・防災活動のリーダーとしての役割を担っており、豊平区では、令和4年5月末現在129名の防火委員が、地域の安全と安心のために活躍されています。</span
      >
    </p>

    <img
      alt="防火委員会の紹介（街頭啓発の写真）"
      height="225"
      src="https://www.city.sapporo.jp/shobo/toyohira/images/boukaiinkai.jpg"
      width="300"
    />

    <h3>豊平区幼年・少年消防クラブ</h3>

    <p>
      <span
        >幼年消防クラブは、幼稚園や保育園単位でクラブを組織し、活動しています。</span
      >
    </p>
    <p>
      <span
        >少年消防クラブは、町内会を母体として組織し、小学生・中学生（・高校生）クラブ員が活動しています。</span
      ><br /><span>
        豊平区には、月寒少年消防クラブ、西福少年消防クラブ、美園あっぷる少年消防クラブの3つのクラブがあり、約70人の少年消防クラブ員が活動しています。</span
      >
    </p>

    <img
      alt="少年消防クラブの紹介（はしご車搭乗体験の写真）"
      height="201"
      src="https://www.city.sapporo.jp/shobo/toyohira/images/bfc.jpg"
      width="300"
    />

    <h2>施設概要</h2>
    <table width="90%">
      <tbody>
        <tr>
          <th rowspan="4">
            <strong><span>所在地</span></strong>
          </th>
          <td colspan="2">〒062-0051</td>
        </tr>
        <tr>
          <td colspan="2">札幌市豊平区月寒東1条8丁目</td>
        </tr>
        <tr>
          <td colspan="2">
            <img
              alt="豊平消防署庁舎の写真"
              height="267"
              src="https://www.city.sapporo.jp/shobo/toyohira/images/toyohirasyo2.jpg"
              width="400"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <a href="https://goo.gl/maps/KHZ5MrQTxWZ8bAXP9"
              >地図を開く（外部ウェブサイトへリンク）</a
            >
          </td>
        </tr>
        <tr>
          <th>
            <strong><span>電話</span></strong>
          </th>
          <td colspan="2">
            <p><span>011-852-2100</span></p>
            <p><span>（ファックスは011-271-0690）</span></p>
          </td>
        </tr>
        <tr>
          <th rowspan="3">
            <strong><span>業務時間</span></strong>
          </th>
          <td rowspan="2">予防課</td>
          <td>8時45分～17時15分</td>
        </tr>
        <tr>
          <td>※12時15分～13時00分は職員の休憩時間です。</td>
        </tr>
        <tr>
          <td>警防課</td>
          <td>無休</td>
        </tr>
        <tr>
          <th rowspan="2">
            <strong><span>休業日</span></strong>
          </th>
          <td>予防課</td>
          <td>土・日・祝・年末年始</td>
        </tr>
        <tr>
          <td>警防課</td>
          <td>無休</td>
        </tr>
        <tr>
          <th>
            <strong><span>交通機関</span></strong>
          </th>
          <td colspan="4">
            <ul>
              <li>地下鉄東豊線「月寒中央駅」から徒歩6分</li>
              <li>中央バス「月寒中央駅前」から徒歩5分</li>
              <li>中央バス「月寒2条8丁目」から徒歩1分</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th rowspan="10">
            <strong><span>業務内容</span></strong>
          </th>
          <td rowspan="7">
            <p><span>予防課</span></p>
          </td>
          <td>火災予防広報及び予防相談に関すること。</td>
        </tr>
        <tr>
          <td>子どもに対する防火・防災教育に関すること。</td>
        </tr>
        <tr>
          <td>り災証明の発行に関すること。</td>
        </tr>
        <tr>
          <td>防火対象物点検報告（防災管理点検報告）に関すること。</td>
        </tr>
        <tr>
          <td>消防用設備等（特殊消防用設備等）の点検報告に関すること。</td>
        </tr>
        <tr>
          <td>札幌市火災予防条例に基づく各種届出に関すること。</td>
        </tr>
        <tr>
          <td>その他火災予防に関すること。</td>
        </tr>
        <tr>
          <td rowspan="3">警防課</td>
          <td>火災等の警戒及び防御に関すること。</td>
        </tr>
        <tr>
          <td>救急・救助業務に関すること。</td>
        </tr>
        <tr>
          <td>その他消防警備に関すること。</td>
        </tr>
      </tbody>
    </table>

    <p><span>このページについてのお問い合わせ</span></p>

    <p><span> 札幌市消防局豊平消防署予防課&nbsp; </span></p>
    <p><span>〒062-0051&nbsp;札幌市豊平区月寒東1条8丁目</span></p>
    <p><span>電話番号：011-852-2100 </span></p>
    <p><span>ファクス番号：011-271-0690</span></p>
  </body>
</html>

  `
  // const data = htmlSimplified2RagtJson(html)
  // console.log('ragt: ', JSON.stringify(data))
  html2Text({
    html: html,
    contentSelectors: ['body'],
    titleSelector: '',
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
    console.log(res.a11yHTML)
  });

})();
