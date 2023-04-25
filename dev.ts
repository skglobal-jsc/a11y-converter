import {
  // editorJson2A11yHtml,
  // html2editorJson,
  json2Text,
  html2Text,
  htmlSimplified2RagtJson,
  fromUrl,
  editorJson2RagtJson,
  // tinyhtml,
} from './src/index';
import tinyhtml from './src/modules/tiny_html_improving';

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
  // const {html} = await fromUrl({ url: 'https://www.city.kasama.lg.jp/page/page013939.html', opt: { contentSelectors: ['#mainContents'] }})

  const html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="ja" xml:lang="ja" xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <meta http-equiv="Content-Script-Type" content="text/javascript" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=1260" />
  <meta name="keywords" content="" />
  <title>かさまの「節電アクション」冬の総力戦！&nbsp;|&nbsp;笠間市公式ホームページ</title>
  <link rel="shortcut icon" href="../favicon.ico" />
  <link rel="apple-touch-icon" href="../web_clip_icon.png" />
  <link rel="stylesheet" href="../skin/default/css/import.css?211001" type="text/css" media="all" />
  <link rel="stylesheet" href="../skin/common/css/print.css" type="text/css" media="print" />
  <script type="text/javascript" src="../skin/common/js/jquery.js"></script>
  <script type="text/javascript" src="../skin/common/js/jquery.jg.js"></script>
  <script type="text/javascript" src="../skin/common/js/functions.js"></script>
  <script type="text/javascript" src="../skin/common/js/plugins.js"></script>
  <script type="text/javascript" src="../skin/common/js/rwdImageMaps.js"></script>
  <script type="text/javascript" src="../skin/common/js/colorbox/colorbox.js"></script>
  <script type="text/javascript" src="../skin/common/js/ready.common.js"></script>
  <script type="text/javascript" src="../skin/common/js/gsearch.js"></script>
  <script type="text/javascript" src="../skin/common/js/analytics.js"></script>
  <script src="//cdn-eas.readspeaker.com/script/12583/webReader/webReader.js?pids=wr&amp;forceAdapter=ioshtml5&amp;disable=translation,lookup" type="text/javascript" id="rs_req_Init"></script><script type="text/javascript" src="../count.php?type=1&amp;code=13939&amp;career=0" id="myTypeCode"></script>
  </head>
  <body id="DEFAULT">
    <div id="mainContents">
      <div>
        <div>
          <h1 id="pageTitle">
            <span class="innerTitle">かさまの「節電アクション」冬の総力戦！</span>
            <p>h1 paragraph</p>
          </h1>
        </div>
        <h2 id="pageTitle">
          <span class="innerTitle">H2かさまの「節電アクション」冬の総力戦！</span>
        </h2>
        <p><p><img src="" /></p></p>
      </div>
      <div id="contents">
                <p>　市役所では、冬場の電力ひっ迫の回避とカーボンニュートラルの実現に向けた取り組みとして、公共施設と各部署での節電アクションを積極的に推進していきます。</p>
      <p>　市民の皆さんには、公共施設等を利用する際にご不便をおかけする場合がありますが、節電アクションへのご理解とご協力をお願いします。</p>
      <p>　また、ご家庭や職場などでの積極的な節電へのご協力をお願いするとともに、市内事業者の皆さんには、万一の電力需給ひっ迫時の対策や備えなども含め、国や電気事業者等からの情報をもとに、事業所内での積極的な節電のご対応をお願いします。</p>
      <p>　この冬の電力ひっ迫回避と脱炭素に向けての「総力戦」です！みなさんのご協力をお願いします！</p>
      <p>&nbsp;</p>
      <p><span style="font-size: 86%;">※12月1日（木曜日）から3月31日（金曜日）までは、国から、節電協力のお願いが発表されている期間です。</span><br /><span style="font-size: 86%;">詳しくは、省エネポータルサイト（経済産業省資源エネルギー庁）をご覧ください</span><br /><span style="font-size: 86%;"><a href="https://www.enecho.meti.go.jp/category/saving_and_new/saving/shoene_setsuden/">https://www.enecho.meti.go.jp/category/saving_and_new/saving/shoene_setsuden/</a></span></p>
      <h2>1　市役所で実施する節電アクション</h2>
      <h3>公共施設で実施する節電アクション</h3>
      <h4>【照明】</h4>
      <p style="padding-left: 40px;">・室内・通路：間引き、自然採光の活用</p>
      <p style="padding-left: 40px;">・屋外：支障のない範囲で消灯・間引き、点灯時間の短縮</p>
      <h4>【温度・空調・換気】</h4>
      <p style="padding-left: 40px;">・空調温度：室温が20度になるように設定</p>
      <p style="padding-left: 40px;">・施設利用者に対して：適正温度での空調利用を説明</p>
      <p style="padding-left: 40px;">　　　　　　　　　　　利用者の少ない時間帯は早めに空調OFF</p>
      <p style="padding-left: 40px;">・空調設備の負荷を軽くする：ブラインド等の活用</p>
      <p style="padding-left: 40px;">・床暖房：必要最小限の使用、日中暖かい時間はOFF</p>
      <p style="padding-left: 40px;">・室内の温度を一定に：扇風機等を活用</p>
      <p style="padding-left: 40px;">・空調設備の清掃：フィルターなどの清掃</p>
      <p style="padding-left: 40px;">・出入口扉：長時間の開放を禁止します</p>
      <p style="padding-left: 40px;">・室内の換気：必要最小限に抑制</p>
      <h4>【その他】</h4>
      <p style="padding-left: 40px;">・温水便座：設定温度の見直し</p>
      <p style="padding-left: 40px;">・来庁者への周知：ポスターや貼り紙など</p>
      <p style="padding-left: 40px;">・協力依頼：<a title="CO2削減エコライフチャレンジ2022" href="https://www.city.kasama.lg.jp/page/page013807.html">エコライフチャレンジへの参加</a>、自宅での省エネ・節電</p>
      <h3>各部署で実施する節電アクション</h3>
      <h4>【照明】</h4>
      <p style="padding-left: 40px;">・間引き：業務に支障の無い範囲で</p>
      <p style="padding-left: 40px;">・消灯：昼休みなど業務に支障のない範囲で定時後に一部消灯、ノー残業デーの定時後に完全消灯</p>
      <p style="padding-left: 40px;">・室内照明の点灯を減らす：自然採光を活用、カーテンやブラインドによる自然の光の調整</p>
      <p style="padding-left: 40px;">・清掃：照明器具等の清掃を実施</p>
      <h4>【空調】</h4>
      <p style="padding-left: 40px;">・暖房を適切に利用：ブランケットの活用などウォームビズをすすんで行う</p>
      <p style="padding-left: 40px;">・空調を効率的に使用：カーテンやブラインドを活用、夜間等の冷気をさえぎる</p>
      <p style="padding-left: 40px;">・清掃：空調のフィルター、室外機の吸込口、吹出口</p>
      <h4>【機器】</h4>
      <p style="padding-left: 40px;">・パソコン：長い時間、席から離れるときは、パソコンをサインアウト</p>
      <p style="padding-left: 40px;">　　　　　　（所属長へ、アルコールチェックと合わせて報告）</p>
      <p style="padding-left: 40px;">・ディスプレイ：席から離れるときは、スイッチをOFF</p>
      <p style="padding-left: 40px;">　　　　　　　　輝度設定を下げる（業務に支障の無い範囲で）</p>
      <p style="padding-left: 40px;">・待機電力を減らす：電源プラグが切断できる（抜ける）電源タップ等を使用</p>
      <p style="padding-left: 40px;">・エコ当番の設置：各部署でディスプレイ等の切り忘れを確認</p>
      <p style="padding-left: 40px;"><span style="font-size: 86%;">※エコ当番：市役所の温暖化対策率先実行計画に基づき、市で行われている事務・事業における温室効果ガスの排出量を削減するため、職員一人ひとりがさらなる取り組みを実行できるよう、昼休みの消灯など課内エコ点検表を作成し、当番制で確認することで節電等の徹底を図るものです。</span></p>
      <p>&nbsp;</p>
      <p><span style="text-decoration: underline;"><span style="font-size: 114%;"><strong>市役所における節電アクションは、昨年同時期（令和3年12月から令和4年3月まで）の電気使用量の実績より削減することを目標に実践します。公共施設や市役所にお越しの際には、ご理解ご協力をお願いいたします。</strong></span></span></p>
      <p>
        <div>
          <p>
            <p>
              <span style="font-size: 86%;">（公共施設出入口などにポスターを掲示）　　　　　　（人の往来の少ない廊下の照明は、消灯）
                <br />
                <picture>
                <img src="https://www.city.kasama.lg.jp/data/img/1669960607_208.jpg" alt="出入口" width="300" height="300" />
                </picture>
                <img src="https://www.city.kasama.lg.jp/data/img/1669960621_208.jpg" alt="廊下" width="300" height="225" />
                <br />
              </span>
            </p>
          </>
        </div>
        <span style="font-size: 86%; color: #000000;">
          <br />（通路や事務室内の照明は、必要最小限に）　　　　　　（業務に支障のない範囲で、蛍光灯を間引き）　
        </span>
        <strong>
          <span style="font-size: 86%; color: #008800;">
            <br />
            <img src="https://www.city.kasama.lg.jp/data/img/1669960028_208.jpg" alt="環境政策課前" width="300" height="225" />
            <img src="https://www.city.kasama.lg.jp/data/img/1669959974_208.jpg" alt="蛍光灯" width="353" height="225" />
            <br />
          </span>
        </strong>
        <strong>
          <span style="font-size: 86%; color: #008800;">
            <br />
            【環境省ポスター】※画像をクリックすると環境省のページにジャンプします。
          </span>
        </strong>
        <br />
        <a href="https://ondankataisaku.env.go.jp/coolchoice/setsuden/">
        <img src="https://www.city.kasama.lg.jp/data/img/1669795552_208.png" alt="節電中。（オフィス）" width="300" height="425" /></a></p>
      <h2>2　家庭でできる！節電アクション</h2>
      <p>一人ひとりができることから、始めましょう。</p>
      <h3>家庭でできる「節電アクション」</h3>
      <table>
      <tbody>
      <tr>
      <td><strong>こまめにスイッチオフ！</strong></td>
      <td>不要な電気はこまめに消しましょう</td>
      </tr>
      <tr>
      <td><strong>待機電力を削減！</strong></td>
      <td>使用しない場合はコンセントを抜きましょう</td>
      </tr>
      <tr>
      <td><strong>エアコンで節電！</strong></td>
      <td>フィルター等を清掃して適温で使用しましょう</td>
      </tr>
      <tr>
      <td><strong>冷蔵庫で節電！</strong></td>
      <td>物を詰めすぎず、扉の開閉時間を短くしましょう</td>
      </tr>
      <tr>
      <td><strong>照明で節電！</strong></td>
      <td>不要な箇所は間引きし、LED照明へ切り替えましょう</td>
      </tr>
      <tr>
      <td><strong>テレビで節電！</strong></td>
      <td>照度を抑えた設定にし、未使用時はコンセントを抜きましょう</td>
      </tr>
      <tr>
      <td><strong>生活スタイルを見直して節電！</strong></td>
      <td>家族がまとまって生活し、移動は徒歩や自転車で</td>
      </tr>
      </tbody>
      </table>
      <h4>【特にお願いしたいアクション】</h4>
      <p>・LED照明や省エネ家電への切り替え</p>
      <p>・蓄電システムと太陽光システムの導入<a title="住宅用太陽光発電・蓄電システム設置費補助" href="https://www.city.kasama.lg.jp/page/page013267.html">（補助金の制度があります）</a></p>
      <p>・家族が一緒の部屋で過ごす時間を増やす</p>
      <h4>・カーテンやブラインドで断熱、暖房は適切な温度設定で使用<br /><br /><span style="color: #008800; font-size: 86%;">【参考】環境省・経済産業省からの節電の取組のご案内（ご家庭用）<br /></span><span style="color: #008800; font-size: 86%;">画像をクリックすると、それぞれのページにジャンプします。</span></h4>
      <div>
        <div>
          <p>
            <a href="https://ondankataisaku.env.go.jp/coolchoice/setsuden/home/">
              <span>1234</span>
              <img src="https://www.city.kasama.lg.jp/data/img/1669795873_208.png" alt="家庭でひと工夫を！「節電7つのアクション！」" width="250" height="354" />
            </a>　
            <a href="https://www.enecho.meti.go.jp/category/saving_and_new/saving/shoene_setsuden/pdf/2022_winter/setsudenmenu_katei02.pdf">
              <img src="https://www.city.kasama.lg.jp/data/img/1669795996_208.png" alt="冬季の省エネ・節電メニュー（表紙）【ご家庭用】" width="250" height="361" />
            </a>
          </p>
        </div>
      </div>
      <h2>3　オフィスでできる！節電アクション</h2>
      <p>オフィスでも、一人ひとりができることから、始めましょう。</p>
      <h3>オフィスでできる節電アクション</h3>
      <table>
      <tbody>
      <tr>
      <td><strong>エアコンどこでも20℃！</strong></td>
      <td>室内温度が20度になるように温度設定しましょう</td>
      </tr>
      <tr>
      <td><strong>ウォームビズスタイルで快適に！</strong></td>
      <td>快適なスタイルで仕事ができるよ環境にしましょう</td>
      </tr>
      <tr>
      <td><strong>断熱性を向上！</strong></td>
      <td>ブラインドなどを活用して断熱しましょう</td>
      </tr>
      <tr>
      <td><strong>照明で節電！</strong></td>
      <td>LED照明への切り替えや不要な照明を間引きしましょう</td>
      </tr>
      <tr>
      <td><strong>就業の見直し！</strong></td>
      <td>業務の効率化で時間外労働を減らしましょう</td>
      </tr>
      <tr>
      <td>
      <p><strong>省エネ機器で節電！</strong></p>
      </td>
      <td>省エネルギー機器へ切り替えましょう</td>
      </tr>
      <tr>
      <td><strong>省エネ行動で節電！</strong></td>
      <td>不要な照明や機器の電源を切りましょう</td>
      </tr>
      </tbody>
      </table>
      <h4>【特にお願いしたいアクション】</h4>
      <p>・ウォームビズ励行による、暖房の適切な使用と抑制を推進</p>
      <p>・LED照明やエネルギー効率の高い機器への切り替えを推進</p>
      <p>・業務の効率化による、時間外労働の削減</p>
      <h4>・不要な照明や機器の電源OFF<br /><br /><span style="font-size: 86%; color: #008800;">【参考】環境省・経済産業省からの節電の取組のご案内（事業者用）</span><br /><span style="font-size: 86%; color: #008800;">画像をクリックすると、それぞれのページにジャンプします。<br /></span></h4>
      <p>
        <a href="https://ondankataisaku.env.go.jp/coolchoice/setsuden/office/">
          <img src="https://www.city.kasama.lg.jp/data/img/1669795845_208.png" alt="オフィスでひと工夫を！「節電7つのアクション！」" width="250" height="354" />
        </a>　
        <a href="https://www.enecho.meti.go.jp/category/saving_and_new/saving/shoene_setsuden/pdf/2022_winter/setsudenmenu_jigyosha02.pdf">
          <img src="https://www.city.kasama.lg.jp/data/img/1669796074_208.png" alt="冬季の省エネ・節電メニュー（表紙）【事業者用】" width="250" height="361" />
        </a>
      </p>
              </div>
      <div class="reference">
                <h2>問い合わせ先</h2>
                <div class="inner">
                  <h3>このページに関するお問い合わせは<a href="https://www.city.kasama.lg.jp/section.php?code=79">環境政策課</a>です。</h3>
      <p>〒309-1792　笠間市中央三丁目2番1号</p>
      <p>電話番号：0296-77-1101　ファクス番号：0296-77-1146</p>

                </div>
              </div>
  </div>
  </body>
  </html>
  `;
  tinyhtml(html, { contentSelectors: ['#mainContents'] });

  // const data = htmlSimplified2RagtJson(html)
  // console.log('ragt: ', JSON.stringify(data))
  // console.log(html)
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
  //   // console.log(res.a11yHTML)
  // });
})();
