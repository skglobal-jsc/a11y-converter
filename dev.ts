import {
  // fromUrl,
  // editorJson2A11yHtml,
  // html2editorJson,
  ragtJson2Text,
  html2Text,
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
  const ragtJson = {
    metaOpt: {
      lang: 'ja',
      title: '',
      description: '',
      favicon: '',
      image: '',
    },
    blocks: [
      {
        id: 'ru0nDiNjp9',
        type: 'paragraph',
        data: {
          text: 'paragraph 1',
        },
        meta: [
          {
            ui: 'paragraph 1',
            polly: 'paragraph 1',
            ssml: '',
            user: '',
            actions: [],
            id: 'b859495e-8040-4f19-bd18-75f9aca0b950',
          },
        ],
      },
      {
        id: '_XnqdkMvju',
        type: 'header',
        data: {
          text: 'heading',
          level: 2,
        },
        meta: [
          {
            ui: 'heading',
            polly: 'heading',
            ssml: '',
            user: '',
            actions: [],
            id: 'c60ed830-339a-4ca3-a3d2-3dfb9983d255',
          },
        ],
      },
      {
        id: '9PlZD7IJfA',
        type: 'list',
        data: {
          style: 'ordered',
          items: [
            {
              content: 'level 1',
              items: [],
            },
            {
              content: 'level 2',
              items: [
                {
                  content: 'level 2.1',
                  items: [],
                },
                {
                  content: 'level 2.2',
                  items: [],
                },
              ],
            },
          ],
        },
        meta: [
          {
            ui: 'これは箇条書きのリストで, 2個の項目と2個のサブ項目があります。',
            polly:
              'これは番号付きリストで, 2個の項目と2個のサブ項目があります。',
            ssml: '',
            user: '',
            actions: [],
            isAutogenerated: true,
            id: '9f6568b0-f02a-469e-9706-76303781b39b',
          },
          {
            parentId: 'root',
            id: '7xszlm',
            ui: 'level 1',
            polly: 'level 1',
            ssml: '',
            user: '',
            actions: [null],
          },
          {
            parentId: 'root',
            id: 'd8naqu',
            ui: 'level 2',
            polly: 'level 2',
            ssml: '',
            user: '',
            actions: [null],
          },
          {
            parentId: 'd8naqu',
            id: '3fsh25',
            ui: 'level 2.1',
            polly: 'level 2.1',
            ssml: '',
            user: '',
            actions: [null],
          },
          {
            parentId: 'd8naqu',
            id: 'of2syn',
            ui: 'level 2.2',
            polly: 'level 2.2',
            ssml: '',
            user: '',
            actions: [null],
          },
        ],
      },
      {
        id: 'Aphjmoq_Tg',
        type: 'image',
        data: {
          file: {
            url: 'https://s3-univoice-dev.s3.ap-southeast-1.amazonaws.com/ragt-editor/2b5a5362-afd1-4621-be65-b65b18834c44',
          },
          caption: 'image caption',
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
        meta: [
          {
            ui: 'image caption',
            polly: 'ここに「image caption」の画像があります。',
            ssml: '',
            user: '',
            actions: [],
            id: 'dc11f91a-b007-4c94-977a-45e4696f1366',
          },
        ],
      },
      {
        id: 'CScSRrrRwo',
        type: 'table',
        data: {
          withHeadings: true,
          content: [
            ['header 1', 'header 2'],
            ['cell 1', 'cell 2'],
          ],
        },
        meta: [
          {
            id: 'whso3h',
            ui: 'この下に、縦2行、横2列の表があります。\n見出し行は左からheader 1、header 2です。',
            polly: 'この下に、縦2行、横2列の表があります。',
            ssml: '',
            user: '',
            actions: [],
            isAutogenerated: true,
          },
          {
            ui: '<tr tabindex="0" aria-label="データの1行目、header 1、header 2、"><th aria-hidden="true">header 1</th><th aria-hidden="true">header 2</th></tr>',
            polly: 'データの1行目、header 1、header 2、',
            ssml: '',
            user: '',
            actions: [],
            id: 'c3e5dd58-c8f0-44a4-8e8f-8875177a4d6f',
          },
          {
            ui: '<tr tabindex="0" aria-label="2行目、cell 1、cell 2です。"><td aria-hidden="true">cell 1</td><td aria-hidden="true">cell 2</td></tr>',
            polly: '2行目、cell 1、cell 2です。',
            ssml: '',
            user: '',
            actions: [],
            id: 'faaa0dc6-ae80-48ca-acd9-4e979ee88c9d',
          },
          {
            id: 'vnn489',
            ui: '表の終わりです。',
            polly: '表の終わりです。',
            ssml: '',
            user: '',
            actions: [],
            isAutogenerated: true,
          },
        ],
      },
    ],
  };
  // console.log(ragtJson2Text(ragtJson));

  html2Text({
    html: `
    <!doctype html>
    <html lang="ja">

    <head>
    <meta charset="UTF-8" />
    <title>新型コロナワクチン接種の進捗状況 - 保健福祉部感染症対策局感染症対策課</title>
    <link rel="stylesheet" media="all" href="/assets/cms/public.css" />
    <script src="/assets/cms/public.js"></script>
    <script>
    //<![CDATA[

      SS.config = {"site_url":"/","kana_url":"/kana/","translate_url":"/translate/","theme":{"white":{"css_path":null,"name":"白","font_color":null,"background_color":null},"blue":{"css_path":null,"name":"青","font_color":"#FFFFFF","background_color":"#0066CC"},"black":{"css_path":"/css/black.css","name":"黒","font_color":null,"background_color":null}},"recommend":{}};

    //]]>
    </script><meta name="keywords" content="covid, 感染症" />
    <meta name="description" content="新型コロナウイルスワクチン接種の進捗状況 本道における新型コロナウイルスワクチンの接種の進捗状況をお知らせします。..." />

      <meta name="viewport" content="width=device-width">
        <link href="/css/style.css" media="all" rel="stylesheet" />
        <link href="/css/style-o.css" media="all" rel="stylesheet" />
        <script src="/js/common.js"></script>
        <!--
    <script>
    (function(d) {
      var config = {
        kitId: 'ziw5cbt',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
    </script>

    <script>
    (function(d) {
      var config = {
        kitId: 'pax6zqs',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
    </script>

    <script>
     (function(d) {
       var config = {
         kitId: 'urw1nqv',
         scriptTimeout: 3000,
         async: true
       },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
     })(document);
    </script>

    <script>
    (function(d) {
      var config = {
        kitId: 'jsw0pcp',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
    </script>
    -->
        <script src="//cdn1.readspeaker.com/script/8605/webReader/webReader.js?pids=wr&amp;forceAdapter=ioshtml5&amp;disable=translation,lookup" type="text/javascript" id="rs_req_Init"></script>
    <script type="text/javascript">window.rsConf = { general: { usePost: true } };</script>
        <style>
         #wrap #main-wrap {
           width: calc(100%)!important;
         }
      </style>




    </head>

    <body id="body--hf-kst-covid-wakuchin_shintyoku" class="body--hf body--hf-kst body--hf-kst-covid">

        <div id="page" class="lower-page">
          <div id="tool">
      <div class="inner">
      <div class="voice-tool">
        <div id="readspeaker_button1" class="rs_skip rsbtn rs_preserve">
          <a href="//app-eas.readspeaker.com/cgi-bin/rsent?customerid=8605&amp;lang=ja_jp&amp;readid=main&amp;url=" title="音声で読み上げる" rel="nofollow" class="rsbtn_play" accesskey="L">
            <span class="rsbtn_left rsimg rspart"><span class="rsbtn_text"><span>読み上げる</span></span></span>
            <span class="rsbtn_right rsimg rsplay rspart"></span>
          </a>
        </div>
      </div>
      <div class="lang-tool"><a class="linkBtn" href="/foreign/translate.html"><span>Foreign Language</span></a></div>
      </div>
    </div>

          <header id="head">
            <div class="inner">
              <div class="site-head-l">
                <div class="site-id">
                  <div id="MainSkip"><a href="#main">メインコンテンツへ移動</a></div>
    <div class="logo"><a href="/"><img src="/img/logo.png" alt="" width="188" height="78"/><span class="top"><img src="/img/ic-hokkaido-top.png" alt="" width="17" height="15" /><span>北海道トップ</span></span></a></div>
                </div>
                <div class="site-menu">
                  <nav id="navi">
      <ul class="nav-item">
        <li class="navi-cat"><a href="/category/index.html"><span class="navi-btn"><img src="/img/ic-category.png" alt="" width="58" height="57" /><span class="text">カテゴリから探す</span></span></a>
          <span class="nav-sub">
            <ul class="nav-list">
              <li><a href="/category/d001/">公募・意見募集</a></li>
              <li><a href="/category/d002/">申請・手続き</a></li>
              <li><a href="/category/d003/">入札・調達・売却</a></li>
              <li><a href="/category/d004/">採用・試験・資格</a></li>
              <li><a href="/category/d005/">イベント・講習会・お知らせ</a></li>
              <li><a href="/category/d006/">総合案内・道政情報・税</a></li>
              <li><a href="/category/d007/">防災・くらし・人権・環境</a></li>
              <li><a href="/category/d008/">観光・道立施設・文化・スポーツ・国際</a></li>
              <li><a href="/category/d009/">健康・医療・福祉</a></li>
              <li><a href="/category/d010/">子育て・教育</a></li>
              <li><a href="/category/d011/">経済・雇用・産業</a></li>
              <li><a href="/category/d012/">まちづくり・地域振興</a></li>
            </ul>
          </span>
        </li>
        <li class="navi-org"><a href="/soshiki.html"><span class="navi-btn"><img src="/img/ic-organization.png" alt="" width="59" height="55" /><span class="text">組織から探す</span></span></a>
          <span class="nav-sub">
            <ul class="nav-list">
              <li><a href="/soshiki/index.html">本庁各部・局・行政委員会</a></li>
              <li><a href="/gyosei/shicho/index.html">14総合振興局・振興局</a></li>
              <li><a href="https://www.gikai.pref.hokkaido.lg.jp/" class="internal">北海道議会</a></li>
              <li><a href="https://www.dokyoi.pref.hokkaido.lg.jp/" class="internal">北海道教育委員会</a></li>
              <li><a href="/link/do_kikan/index.html">出先機関、関係機関など</a></li>
              <li><a href="/soshiki.html">関連組織</a></li>
              <li><a href="/soshiki.html">関連リンク</a></li>
            </ul>
          </span>
        </li>
        <li class="navi-bosai"><a href="/sm/ktk/saigai-bousai.html"><span class="navi-btn"><img src="/img/ic-saigaiBosai.png" alt="" width="56" height="53" /><span class="text">防災<br />情報</span></span></a></li>
      </ul>
    </nav>
                </div>
              </div>
              <div class="site-head-r">
                <div id="bosai"><ul></ul></div><!--only mb-->
                <div id="search-btn"><button type="button"><img class="s-open" src="/img/ic-search-mb.png" alt="" width="34" height="34" /><img class="s-close" src="/img/ic-search-close.png" alt="" width="28" height="28" /><span>検索</span></button></div><!--only mb-->
                <form id="cse-search-box" action="/search.html">
      <input name="cx" type="hidden" value="015791192620576126433:bnwztabap_w">
      <input name="ie" type="hidden" value="UTF-8">
      <input name="q" class="search-box">
      <input name="sa" class="search-button" type="submit" value="検索">
    </form>
    <script type="text/javascript" src="https://www.google.com/cse/brand?form=cse-search-box&lang=ja"></script>
                <div id="menu-btn"><a href="javascript:void(0);"><span></span><span></span><span></span><em class="open">メニュー</em><em class="close">閉じる</em></a></div><!--only mb-->
                <div id="gnavi"></div><!--only mb-->
              </div>
            </div><!--.inner-->
          </header>

          <div id="breadcrumb" class="inner">
            <div class="crumbs">
        <div class="crumb" itemscope itemtype="http://schema.org/BreadcrumbList">
          <span class="page" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span itemprop="name"><a itemprop="item" href="/">HOME</a></span><meta itemprop="position" content="1"></span><span class="separator">&rsaquo;</span><span class="page" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span itemprop="name"><a itemprop="item" href="/hf/">保健福祉部</a></span><meta itemprop="position" content="2"></span><span class="separator">&rsaquo;</span><span class="page" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span itemprop="name"><a itemprop="item" href="/hf/kst/">感染症対策局感染症対策課</a></span><meta itemprop="position" content="3"></span><span class="separator">&rsaquo;</span><span class="page" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span itemprop="name"><a itemprop="item" href="/hf/kst/covid/">covid</a></span><meta itemprop="position" content="4"></span><span class="separator">&rsaquo;</span><span class="page" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span itemprop="name">新型コロナワクチン接種の進捗状況</span><meta itemprop="position" content="5"></span>
        </div>
    </div>

          </div><!--.inner-->
          <div class="voice-wrap inner"></div> <!--.inner only mb-->

          <main id="main" class="doc">
            <div id="wrap" class="inner">

              <div id="main-wrap">
                <header><h1 id="page-header" class="middle"><span>新型コロナワクチン接種の進捗状況</span></h1></header>
                <div class="contents">
                  <div class="yield">
                    <!-- layout_yield -->












        <article class="body">

      <div class="ss-alignment ss-alignment-flow"><p><img alt="図1 (PNG 33.8KB)" src="/fs/6/4/4/1/0/7/1/_/%E5%9B%B31.png" /></p></div><div class="ss-alignment ss-alignment-flow"><ul><li>本道における新型コロナワクチンの接種の進捗状況をお知らせします。</li></ul></div><div class="ss-alignment ss-alignment-flow"><h3>令和5年（2023年）1月30日時点</h3></div><div class="ss-alignment ss-alignment-flow"><table><caption>【初回接種（１、２回目接種）】接種回数・接種率</caption><thead><tr><th scope="col">　　　　区　　分</th><th scope="col">1回目接種回数</th><th scope="col">1回目接種率</th><th scope="col">2回目接種回数</th><th scope="col">2回目接種率</th></tr></thead><tbody><tr><td>全　体　　　</td><td>　　4,354,459</td><td>　　　84.0%</td><td>　　4,292,497</td><td>　　　82.8％</td></tr><tr><td>全　体（医療従事者等を除く）　　　　　<br /></td><td>　　4,025,338</td><td>　　　77.7%</td><td>　　3,999,608</td><td>　　　77.2％</td></tr></tbody></table></div><div class="ss-alignment ss-alignment-flow"><table><caption>【３回目接種】接種回数・接種率</caption><thead><tr><th scope="col">　　　　区　　分 　　　　　　　　　</th><th scope="col">接種回数</th><th scope="col">接種率</th></tr></thead><tbody><tr><td>全　体　　　</td><td>　　3,663,766</td><td>　　　  70.7％</td></tr></tbody></table></div><div class="ss-alignment ss-alignment-flow"><table><caption>【４回目接種】接種回数・接種率</caption><thead><tr><th scope="col">　　　　区　　分 </th><th scope="col">接種回数</th><th scope="col">接種率</th></tr></thead><tbody><tr><td>全　体　　　</td><td>　　2,617,492</td><td>　　　  50.5％</td></tr><tr><td>うち高齢者（60歳以上）</td><td>　　1,637,331<br /></td><td>　　　  81.5％</td></tr></tbody></table></div><div class="ss-alignment ss-alignment-flow"><table><caption>【５回目接種】接種回数・接種率</caption><thead><tr><th scope="col">　　　　区　　分 </th><th scope="col">接種回数</th><th scope="col">接種率</th></tr></thead><tbody><tr><td>全　体　　　</td><td>   　1,297,902</td><td>　　　  25.0％</td></tr></tbody></table></div><div class="ss-alignment ss-alignment-flow"><table><caption>【オミクロン株対応ワクチン接種】接種回数・接種率</caption><thead><tr><th scope="col">　　　　区　　分 </th><th scope="col">接種回数</th><th scope="col">接種率</th></tr></thead><tbody><tr><td>全　体　　</td><td>   　2,342,416</td><td>   　　  45.2％</td></tr><tr><td>うち高齢者（65歳以上）</td><td>   　1,169,292</td><td>   　　  69.8％</td></tr></tbody></table></div><div class="ss-alignment ss-alignment-flow"><p><a class="icon-pdf" href="/fs/7/8/6/9/9/8/3/_/230131%20%E5%B9%B4%E9%BD%A2%E9%9A%8E%E7%B4%9A%E5%88%A5%E6%8E%A5%E7%A8%AE%E7%8E%87(R4.1.1%E4%BA%BA%E5%8F%A3)(%E3%82%AA%E3%83%9F%E3%82%AF%E3%83%AD%E3%83%B3).pdf">年齢階級別接種率 (PDF 371KB)</a></p></div><div class="ss-alignment ss-alignment-flow"><p><a href="https://www.kantei.go.jp/jp/headline/kansensho/vaccine.html">首相官邸新型コロナワクチンのページはこちら</a></p></div><div class="ss-alignment ss-alignment-flow">
      <p>・接種率は、令和4年1月1日現在の人口に対する割合。
    <br />
    ・3・4・5回目接種の全体接種回数及び高齢者接種回数は、オミクロン株対応ワクチン接種の回数を含む
    <br />
    ・接種回数はVRS（ワクチン接種記録システム）による。
    <br />
    　※初回接種（１、２回目接種）の医療従事者等の接種回数は、首相官邸HPによる
    <br />
    　　追加接種（３、４回目接種）は、医療従事者等を含む
    <br />
    　※初回接種（１、２回目接種）の接種回数は、小児接種を含む
    <br />
    ・更新は平日のみとなります。</p>
    </div>

    </article>
        <section class="categories">
      <header><h2>カテゴリー</h2></header>
      <div class="nodes">
        <ul>
          <li><a href="/news/oshirase/">お知らせ</a></li>
          <li><a href="/category/d009/c057/s258/">新型コロナウィルス感染症</a></li>
        </ul>
      </div>
    </section>



    <section class="section_categories">
      <header><h2>感染症対策局感染症対策課のカテゴリ</h2></header>
      <div class="nodes">
        <ul>
            <li><a href="/hf/kst/a0000/">注目情報</a></li>
            <li><a href="/hf/kst/vaccine/vaccine1/">ワクチン接種の進捗状況</a></li>
        </ul>
      </div>
    </section>















      <footer class="contact">
        <h2>お問い合わせ</h2>
          <p class="group">北海道新型コロナウイルス感染症対策本部指揮室</p>
          <p class="address-group"><span class="postal-code">〒060-8588</span><span class="address">札幌市中央区北3条西6丁目</span></p>
          <dl class="tel"><dt>電話:</dt><dd><a href="tel:0112314111">011-231-4111</a></dd></dl>
      </footer>














    <!-- /layout_yield -->
                    <div class="uppate-date"><time datetime="2023-01-31">2023年1月31日</time></div>
                  </div><!--.yield-->
                  <nav class="ss-adobe-reader" style="display: none">Adobe Reader</nav>
                </div><!--.contents-->
                <div class="cc-license">
      <a href="/site-info/sitepolicy.html#chapter-4"><img src="/img/cc-by.png" alt="" width="88" height="31" /></a>
    </div>
              </div><!--#main-wrap-->
            </div><!--.wrap .inner-->
          </main><!-- /#main -->

          <p id="scrollTop"><a href="#page"><img src="/img/ic-pagetop.png" alt="" width="30" height="34" /><span lang="en">page top</span></a></p>
          <footer id="foot">
            <nav id="footer-navi">
      <div class="inner">
        <div class="fnav-btn">
          <p class="fnav-contact"><a href="/site-info/contact.html">お問合せ・相談窓口</a></p>
          <p class="fnav-guide"><a href="/chosha/index.html">庁舎のご案内</a></p>
        </div>
        <ul>
          <li><a href="/site-info/sitepolicy.html">サイトポリシー</a></li>
          <li><a href="/site-info/kojinjoho.html">個人情報の取扱いについて </a></li>
          <li><a href="/sitemap/index.html">サイトマップ</a></li>
          <li><a href="/ss/dtf/opendata/opendata.html">北海道のオープンデータの取組</a></li>
        </ul>
      </div><!--.inner-->
    </nav>
    <address>
      <div class="inner">
        <span class="addr">〒060-8588&nbsp;<br />札幌市中央区北3条西6丁目&nbsp;&nbsp;<br />電話番号 <span><a href="tel:0112314111">011-231-4111</a></span>（総合案内）</span>
        <span class="work-time">一般的な業務時間：8時45分から17時30分<br />（土日祝日および12月29日～1月3日はお休み）</span>
        <span class="corp-num">法人番号：7000020010006</span>
      </div>
    </address>
            <div id="copyright"><small>&copy; 2021 HOKKAIDO GOVERNMENT</small></div>
          </footer>

        </div><!-- /#page -->
      <script type="text/javascript" src="/_Incapsula_Resource?SWJIYLWA=719d34d31c8e3a6e6fffd425f7e032f3&ns=1&cb=488936762" async></script></body>

    </html>
    `,
    contentSelectors: [],
    iArticle: {
      title: 'Code title',
      publishDate: '2021-01-01',
      loadedUrl: 'https://baodang.com/test',
    },
  }).then((res) => {
    console.log(res);
  });
})();
