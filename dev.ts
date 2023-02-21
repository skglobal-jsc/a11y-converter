import {
  // fromUrl,
  // editorJson2A11yHtml,
  // html2editorJson,
  json2Text,
  html2Text,
  htmlSimplified2RagtJson,
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

(() => {
  const htmlString = `
  <!DOCTYPE HTML>
  <html lang="ja">
  <head>
  <meta charset="utf-8">
  <meta content="平生町,平生" name="keywords">
  <meta content="平生町のホームページです。" name="description">
  <title>投票時間の短縮について／平生町ホームページ</title>
  <link rel="icon" href="/favicon.ico">

  <link href="http://www.town.hirao.lg.jp/i/soshiki/senkyo/keihatsu/1673928910367.html" rel="alternate" media="handheld">


  <link href="/material/template/renewal/css/import_pc_sub.css" rel="stylesheet" type="text/css">
  <link href="/material/template/renewal/css/hide_map.css" rel="stylesheet" type="text/css">

  <script type="text/javascript" src="/material/template/renewal/js/jquery.js"></script>
  <script type="text/javascript" src="/material/template/renewal/js/jquery_cookie.js"></script>
  <script type="text/javascript" src="/material/template/renewal/js/jquery_lib.js"></script>
  <script type="text/javascript" src="/material/template/renewal/js/common.js"></script>
  <script type="text/javascript" src="/material/template/renewal/js/pc_common.js"></script>
  <script type="text/javascript" src="/material/template/renewal/js/sub.js"></script>
  <script type="text/javascript" src="/material/template/renewal/js/pc_sub.js"></script>
  <!--[if lt IE 9]>
  <script type="text/javascript" src="/material/template/js/html5shiv-printshiv.min.js"></script>
  <![endif]-->
  </head>
  <body>










    <script type="text/javascript" src="/material/template/renewal/js/pc_to_sp.js"></script>

  <noscript>
  <p class="noscriptCom"> このサイトではJavascriptを使用しています。現在、JavaScriptが無効のため一部機能をご使用いただけません。 </p>
  </noscript>
  <div id="wrapper">
    <div id="headerPrint">
      <header id="header" role="banner">
        <div class="toolArea">
          <div class="inner clearFix">
            <h1 id="headerLogo"><a href="http://www.town.hirao.lg.jp/">
              <img src="/material/template/renewal/img_pc_common/common_img_header_logo.png" alt="平生町 Hirao Town" width="376" height="64">
            </a></h1>
            <!-- <div class="toolBlock"> -->
            <div class="toolBlock sizeBlock toolBlockTop">
                <dl id="headerSize">
                  <dt class="title"><img src="/material/template/renewal/img_pc_common/common_tit_header_tools_size.png" alt="" width="75" height="26"></dt>
                  <dd class="item"><a class="scSize normal"><img src="/material/template/renewal/img_pc_common/common_btn_header_tools_size_std_off.png" alt="文字サイズを標準にする" width="51" height="26"></a></dd>
                  <dd class="item2"><a class="scSize up"><img src="/material/template/renewal/img_pc_common/common_btn_header_tools_size_zoom_off.png" alt="文字サイズを拡大する" width="51" height="26"></a></dd>
                </dl>
            </div>
            <img src="/material/template/renewal/img_pc_common/common_tit_header_tools_color.png" alt="" width="75" height="26">
            <div class="toolBlock colorBlock toolBlockTop">
              <dl id="headerColor">
                <dt class="title"><img src="/material/template/renewal/img_pc_common/common_tit_header_tools_color.png" alt="背景色変更" width="75" height="26"></dt>
                <dd class="item"><a href="#" class="scColor" id="color_black"><img src="/material/template/renewal/img_pc_common/common_btn_header_tools_black.png" alt="背景色を黒色にする" width="31" height="26"></a></dd>
                <dd class="item2"><a href="#" class="scColor" id="color_blue"><img src="/material/template/renewal/img_pc_common/common_btn_header_tools_blue.png" alt="背景色を青色にする" width="31" height="26"></a></dd>
                <dd class="item3"><a href="#" class="scColor" id="color_normal"><img src="/material/template/renewal/img_pc_common/common_btn_header_tools_white.png" alt="背景色を白色にする" width="51" height="26"></a></dd>
              </dl>
            </div>
            <div class="toolBlock linkBlock">
              <p>
                <a href="http://www.town.hirao.lg.jp/about/foreign_langage.html"><img src="/material/template/renewal/img_pc_common/common_tit_header_tools_lang.png" alt="Select Language" width="123" height="24"></a>
                <img src="/material/template/renewal/img_pc_common/common_btn_header_bar_green.png" alt="|" width="3" height="24">
                <a href="http://www.town.hirao.lg.jp/kurashi/shisetsu/chosha/index.html"><img src="/material/template/renewal/img_pc_common/common_btn_header_tools_access.png" alt="町役場へのアクセス" width="130" height="26"></a>
                <img src="/material/template/renewal/img_pc_common/common_btn_header_bar_red.png" alt="|" width="3" height="24">
                <a href="http://www.town.hirao.lg.jp/inquiry/index.html"><img src="/material/template/renewal/img_pc_common/common_btn_header_tools_contact.png" alt="お問い合わせ" width="82" height="26"></a>
              </p>
            </div>

          </div>
          <!-- /.toolBlock -->
        </div>
        <!-- /.toolArea -->

        <div class="navArea">
            <nav id="headerNav" role="navigation">
              <ul class="list clearFix ov">
                <li class="nav1"><a href="http://www.town.hirao.lg.jp/kurashi/index.html"><img src="/material/template/renewal/img_pc_common/common_gnav01_off.png" alt="くらし・手続き" width="198" height="70"></a></li>
                <li class="nav2"><a href="http://www.town.hirao.lg.jp/kosodate/index.html"><img src="/material/template/renewal/img_pc_common/common_gnav02_off.png" alt="子育て・教育" width="210" height="70"></a></li>
                <li class="nav3"><a href="http://www.town.hirao.lg.jp/fukushi/index.html"><img src="/material/template/renewal/img_pc_common/common_gnav03_off.png" alt="福祉・健康" width="188" height="70"></a></li>
                <li class="nav4"><a href="http://www.town.hirao.lg.jp/kanko/index.html"><img src="/material/template/renewal/img_pc_common/common_gnav04_off.png" alt="観光・文化財" width="201" height="70"></a></li>
                <li class="nav5"><a href="http://www.town.hirao.lg.jp/gyosei/index.html"><img src="/material/template/renewal/img_pc_common/common_gnav05_off.png" alt="行政情報" width="201" height="70"></a></li>
              </ul>
              <!-- /.navList -->
            </nav>
            <!-- /#headerNav -->
        </div>
        <!-- /.navArea -->

       <!-- メインビジュアルエリア -->
        <div class="kvArea">
          <!--
          <span m:id="public">
            <p class="kv"><img src="/material/template/renewal/img_pc_top/top_bg_about.png" width="1600" height="500"></p>
          </span>
          -->
        </div>
        <!-- /.kvArea -->

        <div class="inner">
          <div class="mainArea">
            <div class="mainRow">
            </div>
            <!-- /.mainRow -->
          </div>
          <!-- /.mainArea -->
        </div>
        <!-- /.inner -->
      </header>
      <!-- / #header -->
    </div>
    <!-- / #headerPrint -->

    <dl id="pankuzu" class="inner clearFix">
      <dt class="title"><img height="25" width="85" src="/material/template/renewal/img_pc_sub/pankuzu_title.png" alt="現在の位置"></dt>
      <dd class="box">
        <ul class="list">





              <li><a href="http://www.town.hirao.lg.jp/index.html">ホーム</a></li>






              <li class="icon"><a href="http://www.town.hirao.lg.jp/soshiki/index.html">組織から探す</a></li>





              <li class="icon"><a href="http://www.town.hirao.lg.jp/soshiki/senkyo/index.html">選挙管理委員会</a></li>





              <li class="icon"><a href="http://www.town.hirao.lg.jp/soshiki/senkyo/keihatsu/index.html">啓発</a></li>






              <li class="icon"><span>投票時間の短縮について</span></li>









        </ul>
      </dd>
    </dl>
    <!-- / #pankuzu -->

    <div id="container" class="clearFix">

      <div class="inner clearFix">
        <article id="contents" role="main">




            <div id="social">

              <div id="twitter"></div>

              <div id="facebook_like"></div>

              <div id="google_plusone"></div>

            </div>












    <h1 class="headCom"><span class="bg_">投票時間の短縮について</span></h1>

    <div id="contentsIn">














          <h2 id="a1" class="headCom"><span class="bg_"><span class="bg2_">

            選挙投票日当日の投票時間が午後6時までに短縮されます
          </span></span></h2>

          <img src="/material/template/renewal/img_pc_common/common_tit_header_tools_color.png" alt="背景色変更" width="120" height="120" />
          <img src="/material/template/renewal/img_pc_common/common_tit_header_tools_color.png" alt="" width="120" height="120" />


        <div class="wysiwygCom">

          <p>選挙管理委員会において、期日前投票制度の利用が全国的に定着し、本町においても全投票者の約4割近くが期日前投票制度を利用しており、当日投票者の占める割合が減少傾向となっている状況を踏まえ、令和5年4月9日執行の山口県議会議員一般選挙から選挙投票日当日の投票所閉鎖時刻を午後8時より午後6時に繰上げます。</p>

  <p>町民の皆様のご理解とご協力をお願いします。</p>

  <table border="5" cellpadding="0" cellspacing="0" style="width:700px;">
    <thead>
      <tr>
        <th scope="col" style="width: 100px;">&nbsp;</th>
        <th scope="col" style="width: 223px; height: 30px;">場所</th>
        <th scope="col" style="width: 115px; height: 35px;">期日</th>
        <th scope="col" style="height: 35px;"><strong>投票時間</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center; width: 120px; height: 35px;"><strong>選挙投票日当日</strong></td>
        <td style="text-align: center; height: 35px;"><strong>全投票所</strong></td>
        <td style="text-align: center;"><strong>4月9日</strong></td>
        <td style="text-align: center;"><strong class="text_">午前7時～午後6時</strong></td>
      </tr>
    </tbody>
  </table>

  <p>※ 期日前投票については、下記のとおり時間の変更は行われません。</p>

  <table border="5" cellpadding="0" cellspacing="0" style="width:700px;">
    <thead>
      <tr>
        <th scope="col">&nbsp;</th>
        <th colspan="2" scope="col" style="width: 120px; height: 35px;"><strong>場所</strong></th>
        <th scope="col">期間</th>
        <th scope="col"><strong>投票時間</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="1" rowspan="3" style="text-align: center; width: 120px;"><strong>期日前投票</strong></td>
        <td colspan="2" rowspan="1" style="vertical-align: baseline; height: 30px;">
        <p style="text-align: center;"><b>平生町役場</b></p>
        </td>
        <td style="text-align: center;"><strong>4月1日～4月8日</strong></td>
        <td style="text-align: center;"><strong>午前8時30分～午後8時</strong></td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: center; height: 35px;">
        <p><strong>佐賀地域交流センター</strong></p>
        </td>
        <td style="text-align: center;"><strong>4月7日～4月8日</strong></td>
        <td style="text-align: center;"><strong>午前8時30分～午後5時</strong></td>
      </tr>
      <tr>
        <td colspan="2">
        <p style="text-align: center;"><strong>佐賀地域交流センター佐合分館&nbsp;</strong></p>
        </td>
        <td style="text-align: center;"><strong>4月6日</strong></td>
        <td style="text-align: center;"><strong>午前9時～午後1時</strong></td>
      </tr>
    </tbody>
  </table>

        </div>






















































        <div class="toiawaseMod">
          <dl class="col">
            <dt class="L"><img src="/material/template/img_sub/toiawase_mod_title.png" alt="お問い合わせ" width="698" height="45"></dt>
            <dd class="R">

              選挙管理委員会事務局<br>〒742-1195 山口県熊毛郡平生町大字平生町210-1<br>電話番号：0820-56-7111<br>ファックス：0820-56-3864<br><a href="/form/inquiryPC/Init.do?inquiryId=68">お問い合わせはこちらから</a>
            </dd>
          </dl>
        </div>















    </div>


        </article>
        <!-- / #contents -->

          <div id="sideNav" role="complementary">

            <!-- サイドナビ内Google検索 -->
            <div class="sideSearchMod">
              <div class="in">
                <div class="inputBox">
                  <gcse:searchbox-only resultsUrl="/material/template/result.html"></gcse:searchbox-only>
                </div>
              </div>
            </div>

            <aside class="sideNavMod firstTopCom">
              <dl class="box">
                <dt class="title">



            <a href="index.html">啓発</a>




    </dt>
                <dd class="box2">
                <ul class="list">





            <li><a href="http://www.town.hirao.lg.jp/soshiki/senkyo/keihatsu/1484542585526.html">投票</a></li>

            <li><a href="http://www.town.hirao.lg.jp/soshiki/senkyo/keihatsu/1458626552827.html">引っ越したら住民票を移しましょう！</a></li>

            <li><a href="http://www.town.hirao.lg.jp/soshiki/senkyo/keihatsu/1673928910367.html">投票時間の短縮について</a></li>




                </ul>
                </dd>
              </dl>
            </aside>
            <!-- / .sideNavMod -->
          </div>
          <!-- / #sideNav -->

        <!-- / usePageUtil -->

      </div>
      <!-- / .inner -->
    </div>
    <!-- / #container -->
    <div id="footerPrint">
      <footer id="footer" role="contentinfo">
        <div class="mainArea">
          <div class="inner">
            <p id="pagetop"><a href="#header" class="smoothCom ov"><img src="/material/template/renewal/img_pc_common/common_img_pagetop.png" alt="ページトップへ" width="108" height="108"></a></p>
            <div class="mainRow clearFix">
              <div class="footerLeftCol">
                <div class="logoCol">
                  <p class="logo">平生町役場</p>
                </div>

                <!-- /.logoCol -->
                <div class="infoCol">
                  <p class="txt"> 〒742-1195　山口県熊毛郡平生町大字平生町210-1<br>
                    電話番号：0820-56-7111 </p>
                </div>
                <div class="footerAccess">
                  <a href="/kurashi/shisetsu/chosha/index.html">
                  <img src="/material/template/renewal/img_pc_common/common_footer_access.png" width="140" height="34" alt="アクセス">
                  <a>
                </a></a></div>
              </div>

              <!-- /.infoCol -->
              <div class="linkCol clearFix">
                <ul class="linkList clearFix">
                  <li><a href="http://www.town.hirao.lg.jp/about/index.html">このサイトについて</a>｜</li>
                  <li><a href="http://www.town.hirao.lg.jp/about/menseki.html">免責事項について</a>｜</li>
                  <li><a href="http://www.town.hirao.lg.jp/about/privacy.html">個人情報の取り扱い</a></li>
                </ul>
                <!-- /.linkList -->
                <ul class="linkList clearFix">
                  <li><a href="http://www.town.hirao.lg.jp/about/copyright.html">著作権について</a>｜</li>
                  <li><a href="http://www.town.hirao.lg.jp/about/accessibility.html">ウェブアクセシビリティ</a>｜</li>
                  <li><a href="http://www.town.hirao.lg.jp/inquiry/index.html">お問い合わせ</a></li>
                </ul>
                <!-- /.linkList -->
              </div>
              <!-- /.linkCol -->
            </div>
            <!-- /.mainRow clearFix -->
          </div>
          <!-- /.inner -->
        </div>

        <!-- /.mainArea -->
        <div class="copyArea">
          <div class="inner">
            <p class="copyright">Copyright &copy; Hirao Town. all rights reserved</p>
          </div>
          <!-- /.inner -->
        </div>
        <!-- /.copyArea -->
      </footer>
    </div>
    <!-- / #footerPrint -->

  </div>
  <!-- / #wrapper -->
  <script src="//www.google.com/jsapi" type="text/javascript"></script>
  <script type="text/javascript" src="/material/template/renewal/js/external.js"></script>
  </body>
  </html>
  `;
  html2Text({
    html: htmlString,
    contentSelectors: ['#contents'],
    titleSelector: '#contents > h1 > span',
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
    console.log(res.plainText);
  });
})();
