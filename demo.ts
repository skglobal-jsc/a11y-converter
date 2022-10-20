import { A11yConverter } from './src/index';

const orgHtml = `
<!DOCTYPE html>
<html lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
<!-- main header start -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<script>
(function(){
  var ua = navigator.userAgent;
  if(ua.indexOf('iPad') > 0) document.querySelector("meta[name='viewport']").setAttribute("content", "width=1020");
})();
</script>
<meta http-equiv="Content-Language" content="ja" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta name="copyright" content="Copyright JIJI PRESSLTD Ltd. All Rights Reserved." />
<meta name="keywords" content="ニュース,時事ドットコム,時事通信社" />
<meta name="description" content="日本、オーストラリア両政府は今月下旬に豪州で予定する日豪首脳会談に合わせ、新たな「安全保障協力に関する共同宣言」を発表する方向で調整に入った。中国が東・南シナ海に加えて、南太平洋への進出を強めていることを念頭に、日本が「準同盟国」と位置付ける豪州との防衛協力をさらに強化するのが狙い。複数の日本政府関係者が１７日、明らかにした。" />
<meta name="title" content="日豪、新安保共同宣言へ　中国視野に連携強化：時事ドットコム" />
<meta name="robots" content="noarchive">
<script type="application/ld+json">
 {
 	"@context": "http://schema.org",
 	"@type": "BreadcrumbList",
 	"itemListElement": [{
 		"@type": "ListItem",
 		"position": 1,
 		"item": {
 			"name": "時事ドットコム",
 			"@id": "/"
 		}
 	}	,{"@type": "ListItem","position": 2,"item": {"@id": "/jc/c?g=pol","name": "政治"}}

 	]
 }
 </script>

<script type="application/ld+json">
{
	"@context": "http://schema.org",
	"@type": "NewsArticle",
	"mainEntityOfPage":{
		"@type":"WebPage",
		"@id":"https://www.jiji.com/jc/article?k=2022101700794&g=pol"
	},
	"headline": "日豪、新安保共同宣言へ　中国視野に連携強化",
	"description": "日本、オーストラリア両政府は今月下旬に豪州で予定する日豪首脳会談に合わせ、新たな「安全保障協力に関する共同宣言」を発表する方向で調整に入った。中国が東・南シナ海に加えて、南太平洋への進出を強めていることを念頭に、日本が「準同盟国」と位置付ける豪州との防衛協力をさらに強化するのが狙い。複数の日本政府関係者が１７日、明らかにした。",
	"url": "https://www.jiji.com/jc/article?k=2022101700794&g=pol",
	"image": {"@type": "ImageObject","url": "https://www.jiji.com/img/jijicom_og_image.png", "height": 630,"width": 1200},
	"dateCreated": "2022-10-17T19:09:00+09:00",
	"datePublished":"2022-10-17T19:09:00+09:00",
	"dateModified":"2022-10-17T19:09:00+09:00",
	"articleSection": "政治",
	"creator": "時事通信社",
	"author": {
		"@type": "Organization",
		"name": "時事通信社",
		"url": ["/", "https://twitter.com/jijicom", "https://www.jiji.co.jp/company/aboutus"]
	},
	"publisher": {
		"@type": "Organization",
		"name": "時事通信社",
		"logo": {
		"@type": "ImageObject",
			"url": "https://www.jiji.com/img/jijicom_amp.png",
			"width": 600,
			"height": 60
		}
	}
}
</script>

<meta property="article:publisher" content="https://www.facebook.com/wwwjijicom/" />
<meta property="article:author" content="https://www.facebook.com/wwwjijicom/" />
<meta property="fb:app_id" content="2210739305919229" />
<meta property="fb:pages" content="1530007017305928" />
<meta property="og:locale" content="ja_JP" />
<meta property="og:site_name" content="時事ドットコム" />
<meta property="og:type" content="article" />
<meta property="og:image" content="https://www.jiji.com/img/jijicom_og_image.png" />
<meta property="og:title" content="日豪、新安保共同宣言へ　中国視野に連携強化：時事ドットコム" />
<meta property="og:description" content="日本、オーストラリア両政府は今月下旬に豪州で予定する日豪首脳会談に合わせ、新たな「安全保障協力に関する共同宣言」を発表する方向で調整に入った。中国が東・南シナ海に加えて、南太平洋への進出を強めていることを念頭に、日本が「準同盟国」と位置付ける豪州との防衛協力をさらに強化するのが狙い。複数の日本政府関係者が１７日、明らかにした。" />
<meta property="og:url" content="https://www.jiji.com/jc/article?k=2022101700794&g=pol" />
<meta property="twitter:account_id" content="4503599627439296" />
<meta name="twitter:site" content="@jijicom">
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="日豪、新安保共同宣言へ　中国視野に連携強化：時事ドットコム" />
<meta name="twitter:description" content="日本、オーストラリア両政府は今月下旬に豪州で予定する日豪首脳会談に合わせ、新たな「安全保障協力に関する共同宣言」を発表する方向で調整に入った。中国が東・南シナ海に加えて、南太平洋への進出を強めていることを念頭に、日本が「準同盟国」と位置付ける豪州との防衛協力をさらに強化するのが狙い。複数の日本政府関係者が１７日、明らかにした。" />
<meta name="twitter:image" content="https://www.jiji.com/img/sns-logo.jpg" />
<meta name="twitter:url" content="https://www.jiji.com/jc/article?k=2022101700794&g=pol" />
<meta name="mixi-check-robots" CONTENT="noimage">

<!-- pc head css -->
<link rel="preload" as="style" href="/news2/common/css/jiji3.css">
<link rel="preload" as="font" href="/news2/common/webfonts/fonts.woff?x7sz4" type="font/woff">
<link rel="preload" as="style" href="/news2/common/css/fonts.css">
<link rel="preload" as="style" href="/news2/common/css/article.css">
<link rel="preload" href="/img/logo.svg" as="image" type="image/svg+xml">
<!-- /pc head css -->

<!-- pc head js -->
<link rel="preload" as="script" href="/news2/common/js/jquery-2.2.4.min.js">
<link rel="preload" as="script" href="/news/common/js/jquery.cookie.js">
<link rel="preload" as="script" href="/news2/common/js/jc_common_1.js">
<!-- /pc head js -->

<meta content="2022-10-17T19:09:00+09:00" itemprop="datePublished" name="pubdate"/>
<meta content="pol" itemprop="outbrain:category" name="outbrain:category"/>
<link rel="amphtml" href="/amp/article?k=2022101700794&g=pol">

<link rel="canonical" href="https://www.jiji.com/jc/article?k=2022101700794&g=pol"/>
<!-- moble URL start -->
<link rel="alternate" media="only screen and (max-width: 640px)" href="https://www.jiji.com/sp/article?k=2022101700794&g=pol" >
<!-- moble URL end -->
<link rel="alternate" type="application/rss+xml" title="時事ドットコムアクセスランキング" href="https://www.jiji.com/rss/ranking.rdf" />
<link rel="shortcut icon" type="image/x-icon" href="https://www.jiji.com/favicon.ico" />
<link rel="preconnect dns-prefetch" href="//rumcdn.geoedge.be" crossorigin>
<link rel="preconnect dns-prefetch" href="//securepubads.g.doubleclick.net" crossorigin>
<link rel="preconnect dns-prefetch" href="//www.google-analytics.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//pagead2.googlesyndication.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//tpc.googlesyndication.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//www.googletagservices.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//experience-ap.piano.io" crossorigin>
<link rel="preconnect dns-prefetch" href="//csm.cxpublic.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//fonts.googleapis.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//yads.c.yimg.jp" crossorigin>
<link rel="preconnect dns-prefetch" href="//flux-cdn.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//c.amazon-adsystem.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//static.chartbeat.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//tagger.opecloud.com" crossorigin>
<link rel="preconnect dns-prefetch" href="//jen.jiji.com">

<link rel="apple-touch-icon" href="https://www.jiji.com/img/top_logo_square.png" />

<meta name="viewport" content="width=1100, minimum-scale=0.1">
<title>日豪、新安保共同宣言へ　中国視野に連携強化：時事ドットコム</title>
<!-- main header end -->

<link rel="stylesheet" href="/news2/common/css/jiji3.css" type="text/css">
<link rel="stylesheet" href="/news2/common/css/fonts.css" type="text/css">
<link rel="stylesheet" href="/news2/common/css/article.css" type="text/css">


<script src="/news2/common/js/jquery-2.2.4.min.js"></script>
<script src="/news/common/js/jquery.cookie.js" type="text/javascript"></script>
<script src="/news2/common/js/jc_common_1.js" type="text/javascript"></script>


<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T9VJVBN');</script>
<!-- End Google Tag Manager -->

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-1063805-1', 'auto', 'jijiga');
  ga('jijiga.require', 'linkid');
  ga('jijiga.require', 'GTM-533HPW6');
  ga('jijiga.send', 'pageview');
</script>

<!-- Google Advertisement header start -->
<!-- DFP head -->
<script>
window.__AB_TEST_ALLOCATION_MAP__ = {'A': 50,'B': 50};!function(){var _=!0,o="__ab_test_user_group_num__",a=1e6,n=Math.round(Math.random()*a);if("localStorage"in window&&null!==window.localStorage){var r=window.localStorage;o in r?n=r[o]:r[o]=n}else n=-1;var i="DEFAULT";if(-1!==n){var e=window.__AB_TEST_ALLOCATION_MAP__,l=0;for(var w in e)if(l+=e[w],l>n/a*100){i=w;break}window.__AB_TEST_USER_GROUP_NAME__=i,_&&console.log("Test Group: "+i)}}();
</script>
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script>
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
</script>
<!-- /DFP head -->

<!-- Define callback function -->
<script>
var readyBids = {
  prebid: false,
  amazon: false,
  google: false
};
var failSafeTimeout = 3e3;
var launchAdServer = function () {
  if (!readyBids.amazon || !readyBids.prebid) {
    return;
  }
  requestAdServer();
};
var requestAdServer = function () {
  readyBids.google = true;
  googletag.cmd.push(function () {
    pbjs.que.push(function () {
      pbjs.setTargetingForGPTAsync();
    });
    slots = googletag.pubads().getSlots();
    googletag.pubads().refresh(slots, {changeCorrelator: false});
  });
};
</script>
<!-- /Define callback function -->

<!-- FLUX head -->
<script async src="https://flux-cdn.com/client/jiji/flux_jiji_TM.min.js" onerror="googletag.cmd.push(function () { readyBids.prebid = true; launchAdServer(); });"></script>
<script>
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];
</script>
<!-- /FLUX head -->

<!-- APS head -->
<script async src="https://c.amazon-adsystem.com/aax2/apstag.js" onerror="googletag.cmd.push(function () { readyBids.amazon = true; launchAdServer(); });"></script>
<script>
var apstag = apstag || {};
(function(a9, a){
  function q(c,r){ a[a9]._Q.push([c,r]); }
  a[a9] = {
    init: function(){ q('i', arguments) },
    fetchBids: function(){ q('f', arguments) },
    _Q: []
  };
})('apstag', window);
apstag.init({
  pubID: '3762',
  adServer: 'googletag',
  bidTimeout: 1e3
});
var apsslots = [
    {
      slotID: 'pc-billboard',
      slotName: '/60445660/www/PC/pc_billboard',
      sizes: [[970,250],[728,90]]
    },{
      slotID: 'pc-kijinaka-rec',
      slotName: '/60445660/www/PC/pc_kijinaka_rec',
      sizes: [[300, 250]]
    },{
      slotID: 'pc-1rec',
      slotName: '/60445660/www/PC/pc_1rec',
      sizes: [[300,250],[300,600]]
    }, {
      slotID: 'pc-2rec',
      slotName: '/60445660/www/PC/pc_2rec',
      sizes: [[300,600]]
    }, {
      slotID: 'pc-3rec',
      slotName: '/60445660/www/PC/pc_3rec',
      sizes: [[300, 600]]
    }
];
if (window.__AB_TEST_USER_GROUP_NAME__ == 'A') {
  apsslots.push(
    {
      slotID: 'pc-art-u',
      slotName: '/60445660/www/PC/pc_art_u',
      sizes: [[300, 250], [336, 280]]
    }
  );
}else{
  apsslots.push(
    {
      slotID: 'pc-kijishita-R',
      slotName: '/60445660/www/test/PC/pc_kijishita_R',
      sizes: [[300, 250]]
    },{
      slotID: 'pc-kijishita-L',
      slotName: '/60445660/www/test/PC/pc_kijishita_L',
      sizes: [[300, 250]]
    }
  );
}
apstag.fetchBids({
  slots: apsslots
  }, function (bids) {
    googletag.cmd.push(function () {
      apstag.setDisplayBids();
      readyBids.amazon = true;
      launchAdServer();
    });
  }
);
</script>
<!-- /APS head -->

<script>
googletag.cmd.push(function () {
  googletag.defineSlot('/60445660/www/PC/pc_billboard', [[1,1],[970,250],[728,90]],'pc-billboard').addService(googletag.pubads());
  googletag.defineSlot('/60445660/www/PC/pc_kijinaka_rec', [[300,250]],'pc-kijinaka-rec').addService(googletag.pubads());
  googletag.defineSlot('/60445660/www/PC/pc_1rec', [[300,250],[300,500],[300,600]],'pc-1rec').addService(googletag.pubads());
  //googletag.defineSlot('/60445660/www/PC/pc_art_u', [[680, 280],[660, 280], [300, 250], [336, 280], [250, 250]], 'pc-art-u').addService(googletag.pubads());
  if (window.__AB_TEST_USER_GROUP_NAME__ == 'A') {
    googletag.defineSlot('/60445660/www/PC/pc_art_u', [[680, 280],[660, 280], [300, 250], [336, 280], [250, 250]], 'pc-art-u').addService(googletag.pubads());
  }else{
    googletag.defineSlot('/60445660/www/test/PC/pc_kijishita_R', [[300, 250]], 'pc-kijishita-R').addService(googletag.pubads());
    googletag.defineSlot('/60445660/www/test/PC/pc_kijishita_L', [[300, 250]], 'pc-kijishita-L').addService(googletag.pubads());
  }
  googletag.defineSlot('/60445660/www/PC/pc_2rec', [[300,600]],'pc-2rec').addService(googletag.pubads()).setCollapseEmptyDiv(true);
  googletag.defineSlot('/60445660/www/PC/pc_3rec', [[300,600]],'pc-3rec').addService(googletag.pubads()).setCollapseEmptyDiv(true);
  googletag.defineSlot('/60445660/www/PC/pc_video_inread', [[1, 1],'fluid',[640,360]],'pc-video-inread').addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
  googletag.defineSlot('/60445660/www/PC/pc_footer', [[490,160],[640,360],[680,360]],'pc-footer').addService(googletag.pubads());
  googletag.defineSlot('/60445660/www/PC/pc_middle', [[660,200],[680,200],[680, 360],[660, 280]],'pc-middle').addService(googletag.pubads());
  googletag.defineSlot('/60445660/www/PC/pc_recommend', [[1,1],'fluid'],'pc-recommend').addService(googletag.pubads());
  googletag.pubads().setTargeting( 'page', 'pol' );
  googletag.pubads().enableSingleRequest();
  googletag.pubads().disableInitialLoad();
  <!--async-->
  googletag.enableServices();
  pbjs.que.push(function() {
    prebidBidder();
  });
});
setTimeout(function () {
  if(readyBids.google === false){
    requestAdServer();
  }
}, failSafeTimeout);
</script>
<!-- Google Advertisement header end -->

<!-- Piano -->
<script>
var tp=window.tp||[];tp.push(["setTags",["記事","pol"]]);(function(src){var a=document.createElement("script");a.type="text/javascript";a.async=true;a.src=src;var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})("https://experience-ap.piano.io/xbuilder/experience/load?aid=rn1Na5A7pj");
(function(d,c){d.cookie="__adblocker=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";var j=function(adblocker){var t=new Date;t.setTime(t.getTime()+60*5*1E3);d.cookie="__adblocker="+(adblocker?"true":"false")+"; expires="+t.toUTCString()+"; path=/"};var s=d.createElement(c);s.async=true;s.src="//www.npttech.com/advertising.js";s.onerror=function(){j(true);};var b=d.getElementsByTagName(c)[0];b.parentNode.insertBefore(s,b)})(document,"script");
</script>
<!-- /Piano -->

<!-- cXparse -->
<meta name="cXenseParse:jij-category" content="pol" data-separator="," />
<meta name="cXenseParse:jij-articleid" content="2022101700794" />
<meta name="cXenseParse:articleid" content="2022101700794" />

<!-- /cXparse -->

</head>
<body>

	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9VJVBN"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->

	<!-- header start -->
	<header id="PageHeader">
 <nav id="navi" role="navigation">
   <div class="up">
     <div class="logo"><div class="SiteLogo"><a href="/"><img alt="時事ドットコム" src="/img/logo.svg" width="120" height="25"></a></div></div>
     <div class="upright">
       <div class="date">2022年10月17日(月)</div>
       <div id="Weather"></div>
       <div class="member"><a href="/jc/members">会員限定<img src="/img/key.svg" class="key_icon" alt="会員限定"></a></div>

       <div id="piano-login-container">
         <span id="piano-login-register-container">
           <a id="member-offer" href="/jc/membership">会員登録</a>
           <a id="piano-login-button" href="javascript:void(0);">ログイン</a>
         </span>
         <span id="piano-logout-container" style="display: none;">
           <a id="mypage" href="/jc/mypage">マイページ</a>
           <a id="piano-logout-button" href="javascript:void(0);">ログアウト</a>
         </span>
       </div>

       <div class="SearchButton">
         <a href="/jc/cse">
           <img src="/img/img_Search.png" alt="検索" width="20" height="20">
         </a>
       </div>
     </div>
   </div>

   <div class="under">
  <ul class="menu">
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent01"/>
      <label for="menu-parent01"><span></span></label>
      <a href="/">トップ</a>
      <ul class="menu-child">
        <li><a href="/jc/list?g=news">新着記事</a></li>
        <li><a href="/jc/v7">トピックス</a></li>
        <li><a href="/jc/list?g=mng">朝刊・夕刊の見出し</a></li>
        <li><a href="/jc/v7?id=20211214kaisetsu">解説委員室から</a></li>
        <li><a href="/jc/list?g=cyr">深層探訪</a></li>
        <li><a href="https://jen.jiji.com/">ENGLISH</a></li>
      </ul>
    </li>
    <li class="menu-parent"><a href="/jc/rensai">連載</a></li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent02"/>
      <label for="menu-parent02"><span></span></label>
      <a href="/jc/c?g=pol">政治</a>
      <ul class="menu-child">
        <li><a href="/jc/2022san">参院選2022</a></li>
        <li><a href="/jc/2021syu">衆院選2021</a></li>
        <li><a href="/jc/v7?id=seikaiweb">政界Web</a></li>
        <li><a href="/jc/v7?id=2020tnc">点描・永田町</a></li>
        <li><a href="/jc/v7?id=202008sengohosyu">戦後保守政治の裏側</a></li>
        <li><a href="/jc/v7?id=seikai-interview">政界インタビュー</a></li>
        <li><a href="/jc/v7?id=20211208politcaltopics">政治特集</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent03"/>
      <label for="menu-parent03"><span></span></label>
      <a href="/jc/c?g=int">国際</a>
      <ul class="menu-child">
        <li><a href="/jc/list?g=afp">ワールドEYE</a></li>
        <li><a href="/jc/v7?id=world-column">地球コラム</a></li>
        <li><a href="/jc/v7?id=chesanno">崔さんの眼</a></li>
        <li><a href="/jc/v7?id=chinawatch">中国ウオッチ</a></li>
        <li><a href="/jc/v7?id=wonsan">洞察☆中国</a></li>
        <li><a href="/jc/v7?id=19cec">新次元の中国経済</a></li>
        <li><a href="/jc/c?g=dts">「１.５℃の約束」</a></li>
        <li><a href="/jc/v7?id=korean_watching">コリア・ウオッチング</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent04"/>
      <label for="menu-parent04"><span></span></label>
      <a href="/jc/c?g=soc">社会</a>
      <ul class="menu-child">
        <li><a href="/jc/c?g=cov">新型コロナウイルス</a></li>
        <li><a href="/jc/list?g=obt">おくやみ</a></li>
        <li><a href="/jc/v7?id=2019inkk">教育最前線</a></li>
        <li><a href="/jc/v7?id=2019med">メディカルサロン</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent05"/>
      <label for="menu-parent05"><span></span></label>
      <a href="/jc/c?g=eco">経済</a>
      <ul class="menu-child eco">
        <li><a href="/jc/market">マーケット</a></li>
        <li><a href="https://equity.jiji.com/">エクイティ</a></li>
        <li><a href="/jc/market?g=stock">株価</a></li>
        <li><a href="/jc/list?g=bw">BWリリース</a></li>
        <li><a href="/jc/market?g=exchange">外為</a></li>
        <li><a href="/jc/list?g=prt">PRTIMES</a></li>
        <li><a href="/jc/market?g=future">商品</a></li>
        <li><a href="/jc/v7?id=2019ege">江上剛　コラム</a></li>
        <li><a href="/jc/market?g=trust">投信</a></li>
        <li><a href="/jc/list?g=leaders">トップの視点</a></li>
        <li><a href="/jc/list?g=myview">私の相場観</a></li>
        <li><a href="/jc/v7?id=keizaihyaku">けいざい百景</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent06"/>
      <label for="menu-parent06"><span></span></label>
      <a href="/jc/c?g=spo">スポーツ</a>
      <ul class="menu-child spo">
        <li><a href="/jc/beijing2022">北京冬季五輪・パラ</a></li>
        <li><a href="/jc/v7?id=sportsstories">スポーツストーリーズ</a></li>
        <li><a href="/jc/tokyo2020">東京五輪・パラ</a></li>
        <li><a href="/jc/score">記録速報</a></li>
        <li><a href="/jc/c?g=bsb">野球</a></li>
        <li><a href="/jc/v4?id=spword20200502">スポーツの言葉考</a></li>
        <li><a href="/jc/c?g=scr">サッカー</a></li>
        <li><a href="/jc/v4?id=shimuraohtani18">二刀流大谷を追う</a></li>
        <li><a href="/jc/c?g=rgb">ラグビー</a></li>
        <li><a href="/jc/sumo">土俵百景</a></li>
        <li><a href="/jc/c?g=fsk">フィギュア</a></li>
        <li><a href="/jc/v7?id=202008olytec">五輪のミカタ</a></li>
        <li><a href="/jc/tokushu?g=powerofwords">スポーツ名言・名場面</a></li>
        <li><a href="/jc/tsn">JSPOスポーツニュース</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent07"/>
      <label for="menu-parent07"><span></span></label>
      <a href="/jc/c?g=ent">エンタメ</a>
      <ul class="menu-child">
        <li><a href="/jc/list?g=cnp">韓流</a></li>
        <li><a href="/jc/ak">ＡＫＢ４８</a></li>
        <li><a href="/jc/ti?p=yatogame3&amp;g=yatogame" target="_blank">八十亀ちゃん</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent08"/>
      <label for="menu-parent08"><span></span></label>
      <a href="/jc/list?g=newitem">ライフ</a>
      <ul class="menu-child">
        <li><a href="https://www.afpbb.com/category/jiji-trend">JIJI Trend</a></li>
        <li><a href="/jc/list?g=newitem">新商品</a></li>
        <li><a href="/jc/v2?id=2018toyosunews">お魚情報</a></li>
        <li><a href="/jc/car">クルマ</a></li>
        <li><a href="/jc/g">なんでもランキング</a></li>
        <li><a href="/jc/v7?id=jppsbooknavi">Ｂｏｏｋ ＮＡＶＩ</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent09"/>
      <label for="menu-parent09"><span></span></label>
      <a href="/jc/p">写真・動画</a>
      <ul class="menu-child">
        <li><a href="/jc/p">写真ニュース</a></li>
        <li><a href="/jc/movie?g=news">ニュース動画</a></li>
        <li><a href="/jc/movie?g=trend">トレンド動画</a></li>
        <li><a href="/jc/d3">写真特集</a></li>
      </ul>
    </li>
    <li class="menu-parent"><a href="/jc/calendar">予定</a></li>
    <li class="menu-parent menu_others">
      <input type="checkbox" id="menu-parent10"/>
      <label for="menu-parent10"><span></span></label>
      <img src="/img/menu_others.svg" class="menu_others_icon" alt="その他">
      <ul class="menu-child">
        <li><a href="/jc/r">アクセスランキング</a></li>
        <li><a href="/jc/v">人気記事アーカイブ</a></li>
        <li><a href="/jc/graphics">図解</a></li>
        <li><a href="/jc/puzzle">数独</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent11"/>
      <label for="menu-parent11"><span></span></label>
      <a href="https://portal.jamp.jiji.com/portal/">行政</a>
      <ul class="menu-child">
        <li><a href="/jc/list?g=jmp">自治体便り</a></li>
      </ul>
    </li>
    <li class="menu-parent">
      <input type="checkbox" id="menu-parent12"/>
      <label for="menu-parent12"><span></span></label>
      <a href="https://medical.jiji.com/">メディカル</a>
      <ul class="menu-child med">
        <li><a href="https://medical.jiji.com/column/articles/?c=1">一流に学ぶ</a></li>
        <li><a href="https://medical.jiji.com/topics/">ピックアップ</a></li>
        <li><a href="https://medical.jiji.com/doctor/">ニュースドクターズガイド</a></li>
        <li><a href="https://medical.jiji.com/medical/">家庭の医学</a></li>
      </ul>
    </li>
  </ul>
</div>



   <div id="PageHeaderInner">
     <div id='pc-billboard'>
       <script type='text/javascript'>
         googletag.cmd.push(function() { googletag.display('pc-billboard'); });
       </script>
     </div>
   </div>
 </nav>
</header>

	<!-- header end -->

	<div id="Contents">
    	<div class="clearfix" id="ContentsInner">

			<!--フォントサイズ-->
<script src="/news2/common/js/textresizer.js" charset="utf-8"></script>
<!--フォントサイズ-->
<div id="Main">

	<!--ぱんくず-->
	<div class="BreadCrumbs clearfix">
		<p><a href="/">時事ドットコムニュース</a></p>
		<span>&gt;</span>
		<p><a href="/jc/c?g=pol">政治</a></p>
		<span>&gt;</span>
		<p>日豪、新安保共同宣言へ　中国視野に連携強化</p>
	</div>

	<!--ぱんくず-->


	<div class="MainInner Individual">
		<div class="SnsBtn">
	<ul class="clearfix">
		<li>
			<a href="http://twitter.com/share?url=https%3A%2F%2Fwww.jiji.com%2Fjc%2Farticle%3Fk%3D2022101700794%26g%3Dpol&lang=ja&via=jijicom&text=%E6%97%A5%E8%B1%AA%E3%80%81%E6%96%B0%E5%AE%89%E4%BF%9D%E5%85%B1%E5%90%8C%E5%AE%A3%E8%A8%80%E3%81%B8%E3%80%80%E4%B8%AD%E5%9B%BD%E8%A6%96%E9%87%8E%E3%81%AB%E9%80%A3%E6%90%BA%E5%BC%B7%E5%8C%96%EF%BC%9A%E6%99%82%E4%BA%8B%E3%83%89%E3%83%83%E3%83%88%E3%82%B3%E3%83%A0" onClick="window.open(this.href, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow"><img width="80" height="22" src="/news2/common/img/bt_twit.png" alt="ツイート" width="50" height="50" /></a>
		</li>
		<li>
			<a href="http://www.facebook.com/share.php?u=https%3A%2F%2Fwww.jiji.com%2Fjc%2Farticle%3Fk%3D2022101700794%26g%3Dpol" rel="nofollow" onClick="window.open(this.href,'fbwindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1'); return false;"><img width="80" height="22" alt="facebook" src="/news2/common/img/bt_fbook.png"></a>
		</li>
		<li>
			<a href="//b.hatena.ne.jp/entry/https%3A%2F%2Fwww.jiji.com%2Fjc%2Farticle%3Fk%3D2022101700794%26g%3Dpol" target="_blank" class="hatena-bookmark-button" data-hatena-bookmark-layout="simple" data-hatena-bookmark-initialized="1" data-snsaction="share"><img width="80" height="22" alt="hatena-bookmark" src="/news2/common/img/bt_hatebu.png"></a>
		</li>
		<li>
			<a href="#comment"><img width="80" height="22" alt="コメント" src="/news2/common/img/bt_comment.png"></a>
		</li>
	</ul>
</div>


		<div class="ArticleTitleButton">
			<ul class="clearfix">
				<li class="small">小</li>
				<li class="middle current">中</li>
				<li class="large">大</li>
			</ul>
		</div>
		<!-- google_ad_section_start(name=s1) -->
		<article>
<div class="ArticleTitle">
	<h1>日豪、新安保共同宣言へ　中国視野に連携強化</h1>
	<div class="ArticleData clearfix">
	<p class="ArticleTitleData">2022年10月17日19時09分</p>
</div>

</div>



<div class="ArticleText clearfix">
	<aside class="ArticleInnerAD">
	<div id='pc-kijinaka-rec'>
		<script type='text/javascript'>
			googletag.cmd.push(function() { googletag.display('pc-kijinaka-rec'); });
		</script>
	</div>
</aside>
	<p>
	　日本、オーストラリア両政府は今月下旬に豪州で予定する日豪首脳会談に合わせ、新たな「安全保障協力に関する共同宣言」を発表する方向で調整に入った。中国が東・南シナ海に加えて、南太平洋への進出を強めていることを念頭に、日本が「準同盟国」と位置付ける豪州との防衛協力をさらに強化するのが狙い。複数の日本政府関係者が１７日、明らかにした。<br>
</p><p class="ArticleTextTab"><a href="/jc/article?k=2022100501260&g=pol">岸田首相、今月下旬の訪豪検討　安全保障で連携強化</a></p><p>
	　<a href="/jc/giin?d=dba4f5099178787d6398d1695161b9ed&c=syu" target="_self">岸<!--es-->田<!--es-->文<!--es-->雄</a>首相は同日の自民党役員会で、首脳会談を２２日に行うと説明。「自由で開かれたインド太平洋の基軸となる両国が、今後の域内安保、経済戦略を進める上で腹合わせをしたい」と述べた。ウクライナ危機に伴うエネルギーや食料の価格高騰への対応も協議する考えを示した。<br>
	　首相は豪州西部の都市パースでアルバニージー首相との会談に臨む。新たな共同宣言には、日豪間の「特別な戦略的パートナーシップ」の深化や、安全保障協力の拡大が盛り込まれる方向だ。<br>
	　中国は今年に入り、豪州にとって安全保障上重要な位置にある南太平洋のソロモン諸島と安保協定を結ぶなど、海洋進出の動きを強めている。
	<img src="/news2/kiji_photos/square/dummy/dummy2.png" alt="" width="1" height="1"></p>
	<aside class="ArticleBottomLink">

</aside>

</div>
</article>
<!-- genre:g_pol -->
<!-- key="news date" value="20221017190950" -->
<!-- key="upd_date" value="20221017190950" -->
<!-- key="title" value="日豪、新安保共同宣言へ　中国視野に連携強化" -->
<!-- h:1 -->
<!-- p:15 -->
<!-- r:0 -->

		<ul class="linktaglist">
  <li><a href="/jc/c?g=pol">政治</a></li>

<!-- keyword start --><!-- keyword end -->
  <li class="comment"><a href="#comment"><span class="tex">コメントをする</span></a></li>

</ul>
		<!-- google_ad_section_end(name=s1) -->
	</div>

	<div id='pc-video-inread'>
		<script type='text/javascript'>
			googletag.cmd.push(function() { googletag.display('pc-video-inread'); });
		</script>
	</div>



					<div class="BottomArticleList Relation">
					<div class="TitleBorder clearfix">
						<p>関連記事</p>
					</div>
					<div class="ArticleListMain">
						<ul class="LinkList">

<li class="RelationList"><a href="/jc/article?k=2022101700581&g=pol">真榊奉納に「深い失望」 韓国</a></li>
<div id="logly-lift-4301199"></div><script charset="UTF-8">(function(){var _lgy_lw = document.createElement("script");_lgy_lw.type = "text/javascript";_lgy_lw.charset = "UTF-8";_lgy_lw.async = true;_lgy_lw.src= "https://l.logly.co.jp/lift_widget.js?adspot_id=4301199";var _lgy_lw_0 = document.getElementsByTagName("script")[0];_lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);})();</script>

<li class="RelationList"><a href="/jc/v8?id=202210tenbyo06">「９・２７国葬」後も深まる政権危機【点描・永田町】</a></li>

<li class="RelationList"><a href="/jc/v8?id=20221004seiji">岸田政権が危機を突破するための「二つの選択肢」（ノンフィクション作家　塩田　潮）</a></li>
<div id="logly-lift-4299865"></div><script charset="UTF-8">(function(){var _lgy_lw = document.createElement("script");_lgy_lw.type = "text/javascript";_lgy_lw.charset = "UTF-8";_lgy_lw.async = true;_lgy_lw.src= "https://l.logly.co.jp/lift_widget.js?adspot_id=4299865";var _lgy_lw_0 = document.getElementsByTagName("script")[0];_lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);})();</script>

						</ul>
					</div>
				</div>


	<div class="Rectangle2 clearfix">
		<!-- /60445660/www/PC/pc_art_u -->
		<div id='pc-art-u'>
			<script>
				if (window.__AB_TEST_USER_GROUP_NAME__ == 'A') {
					googletag.cmd.push(function() { googletag.display('pc-art-u'); });
				}
			</script>
		</div>
		<div id='pc-kijishita-L'>
			<script>
				if (window.__AB_TEST_USER_GROUP_NAME__ == 'B') {
					googletag.cmd.push(function() { googletag.display('pc-kijishita-L'); });
				}
			</script>
		</div>
		<div id='pc-kijishita-R'>
			<script>
				if (window.__AB_TEST_USER_GROUP_NAME__ == 'B') {
					googletag.cmd.push(function() { googletag.display('pc-kijishita-R'); });
				}
			</script>
		</div>
	</div>

	<aside id="comment">
	<div id="ulCommentWidget" style="clear:both;"></div>
	<script>
	var _ul_comment_config = _ul_comment_config||{};
	_ul_comment_config['id'] = 'CM-dD1c9gGS';
	_ul_comment_config['article_id'] = '2022101700794';
	_ul_comment_config['author'] = '';
	_ul_comment_config['published_at'] = '2022-10-17T19:09:00+09:00';
	_ul_comment_config['url'] = '/jc/article?k=2022101700794&g=pol';
	_ul_comment_config['number_of_comments'] = 1;
	_ul_comment_config['pagination_url'] = '/jc/comment?k=2022101700794&g=pol';

	(function (c, n, s) {if (c[n] === void 0) {c['ULObject'] = n;
	c[n] = c[n] || function () {(c[n].q = c[n].q || []).push(arguments)};
	c[n].l = 1 * new Date();var e = document.createElement('script');e.async = 1;
	e.src = s + "/comment.js";var t = document.getElementsByTagName('script')[0];
	t.parentNode.insertBefore(e, t);}})
	(window, 'ul_comment_widget', 'https://cm-widget.nakanohito.jp/cm');
	ul_comment_widget('init', _ul_comment_config);
	</script>

<a href="/jc/comment?k=2022101700794&g=pol" class="btncomm btn1902"><span class="tex">全てのコメントを見る</span></a>
</aside>

	<!--下層ページサブコンテンツ-->
	<div id='pc-recommend'>
	<script type='text/javascript'>
		googletag.cmd.push(function() { googletag.display('pc-recommend'); });
	</script>
</div>


	<!-- おすすめ -->
	<section class="RecommendUnderlayer special">
<div class="Title clearfix">
<p>特集</p>
</div>
<div class="RecommendUnderlayerInner">
<img style="width:0px;height:0px;" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/kiji_photos/square/dummy/dummy.jpg" alt="時事ドットコム：時事通信社が運営するニュースサイト">
<ul><li>
<a href="/jc/article?k=2022101201097&amp;g=cyr">
<div class="ThumbImg"><img width="161" height="103" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/handmade/file/images/ichioshi-photo4/20221012atH9S_p.jpg" alt="自民、地盤争い激化へ" class="aovr"></div>
<div class="ThumbText">自民、地盤争い激化へ</div>
</a></li><li>
<a href="/jc/v8?id=20221004seiji">
<div class="ThumbImg"><img width="161" height="103" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/handmade/file/images/ichioshi-photo4/20221004kishida_218.jpg" alt="窮地の首相、迫られる選択" class="aovr"></div>
<div class="ThumbText key_icon">窮地の首相、迫られる選択</div>
</a></li><li>
<a href="/jc/v8?id=202210tenbyo06">
<div class="ThumbImg"><img width="161" height="103" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/handmade/file/images/ichioshi-photo4/20221010tenbyo_218.jpg" alt="国葬後も深まる政権危機" class="aovr"></div>
<div class="ThumbText key_icon">国葬後も深まる政権危機</div>
</a></li><li>
<a href="/jc/v8?id=20221007seikaiweb">
<div class="ThumbImg"><img width="161" height="103" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/handmade/file/images/ichioshi-photo4/20221007seikai_218.jpg" alt="語り継がれる追悼演説" class="aovr"></div>
<div class="ThumbText key_icon">首相の言葉が響かない</div>
</a></li><li>
<a href="/jc/article?k=2022101600253&amp;g=pol">
<div class="ThumbImg"><img width="161" height="103" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/handmade/file/images/ichioshi-photo4/20220922ds42_p.jpg" alt="規模・財源、反撃能力が焦点　与党協議" class="aovr"></div>
<div class="ThumbText">規模・財源、反撃能力が焦点　与党協議</div>
</a></li><li>
<a href="/jc/article?k=2022101600254&amp;g=pol">
<div class="ThumbImg"><img width="161" height="103" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/handmade/file/images/ichioshi-photo4/20221016at21S_p.jpg" alt="攻撃型無人機２５年度にも" class="aovr"></div>
<div class="ThumbText">攻撃型無人機２５年度にも</div>
</a></li><li>
<a href="/jc/article?k=2022101500326&amp;g=pol">
<div class="ThumbImg"><img width="161" height="103" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/handmade/file/images/ichioshi-photo4/20221015at41S_p.jpg" alt="茂木氏、派内で足場固め　「ポスト岸田」の焦点は" class="aovr"></div>
<div class="ThumbText">茂木氏、派内で足場固め　「ポスト岸田」の焦点は</div>
</a></li><li>
<a href="/jc/article?k=2022101500125&amp;g=pol">
<div class="ThumbImg"><img width="161" height="103" class="lazyload" src="/img/dummy161x103w.jpg" data-src="/news/handmade/file/images/ichioshi-photo4/jpp042552867.jpg" alt="ガーシー氏、なぜおとがめない？◆ニュースＱ＆Ａ" class="aovr"></div>
<div class="ThumbText">ガーシー氏、なぜおとがめない？◆ニュースＱ＆Ａ</div>
</a></li></ul>
</div>
</section>

	<div class="RakutenAd">
</div>

	<!-- 用語 -->
	<!-- Yougo Start -->
<div class="BottomArticleList">
	<div class="TitleBorder clearfix">
		<p>政治用語</p>
	</div>
	<div class="RelationWord">
		<ul>
			<li><a href="/jc/article?k=2022100900210&g=tha">全国旅行支援</a><span>(10/09 14:08)</span></li><li><a href="/jc/article?k=2022100900093&g=tha">法定外税</a><span>(10/09 04:07)</span></li><li><a href="/jc/article?k=2022100800252&g=tha">スタートアップ</a><span>(10/08 08:55)</span></li><li><a href="/jc/article?k=2022100300683&g=tha">所信表明演説</a><span>(10/03 14:54)</span></li><li><a href="/jc/article?k=2022092200153&g=tha">ＦＲＢの金利・経済見通し</a><span>(09/22 03:55)</span></li><li><a href="/jc/article?k=2022092200152&g=tha">米連邦公開市場委員会（ＦＯＭＣ）</a><span>(09/22 03:54)</span></li>
<!--			<li><a href="#">尼崎連続変死事件</a><span>(11/13 06:02)</span></li>
			<li><a href="#">国営諫早湾干拓事業</a><span>(11/13 06:02)</span></li>
			<li><a href="#">性同一性障害 </a><span>(11/13 06:02)</span></li>
			<li><a href="#">性同一性障害</a><span>(11/13 06:02)</span></li>
			<li><a href="#">民法の監督責任規定</a><span>(11/13 06:02)</span></li>
			<li><a href="#">放送倫理・番組向上機構</a><span>(11/13 06:02)</span></li>
-->
		</ul>
	</div>
</div>
<!-- Yougo End -->

	<div class="RakutenAd">
	<!-- Google Advertisement Rakuten start -->
	<!-- www/PC/pc_middle -->
	<div id='pc-middle'>
		<script type='text/javascript'>
			googletag.cmd.push(function() { googletag.display('pc-middle'); });
		</script>
	</div>
	<!-- Google Advertisement Rakuten end -->
</div>




	<div id="Target" class="BottomArticleList">
		<div class="TitleBorder clearfix">
			<p>政治</p>
		</div>
		<div class="ArticleListMain clearfix">
			<ul class="LinkList">
				<li class="ThumbList"><a href="/jc/article?k=2022101700914&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol2.jpg" alt="自民・井林氏がコロナ感染" height="65" width="65" class="lazyload"></div><p>自民・井林氏がコロナ感染</p><span>(10/17 18:58)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700913&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol2.jpg" alt="平和的解決、中国に促す　台湾情勢で岸田首相表明" height="65" width="65" class="lazyload"></div><p>平和的解決、中国に促す　台湾情勢で岸田首相表明</p><span>(10/17 18:57)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700911&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol2.jpg" alt="２４日に集中審議　衆院予算委" height="65" width="65" class="lazyload"></div><p>２４日に集中審議　衆院予算委</p><span>(10/17 18:57)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700687&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700687.jpg" alt="政府、旧統一教会を調査へ　年内に権限初行使―契約取り消し権拡大へ法改正" height="65" width="65" class="lazyload"></div><p>政府、旧統一教会を調査へ　年内に権限初行使―契約取り消し権拡大へ法改正</p><span>(10/17 18:56)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700810&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700810.jpg" alt="ウクライナ国会議員団と意見交換　超党派議連" height="65" width="65" class="lazyload"></div><p>ウクライナ国会議員団と意見交換　超党派議連</p><span>(10/17 17:34)</span></a></li><!-- fluct start -->
<div id="logly-lift-4273483"></div>
<script charset="UTF-8">
  (function(){
    var _lgy_lw = document.createElement("script");
    _lgy_lw.type = "text/javascript";
    _lgy_lw.charset = "UTF-8";
    _lgy_lw.async = true;
    _lgy_lw.src= (("https:" == document.location.protocol) ? "https://" : "http://")+"l.logly.co.jp/lift_widget.js?adspot_id=4273483";
    var _lgy_lw_0 = document.getElementsByTagName("script")[0];
    _lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);
  })();
</script>
<!-- fluct end --><li class="ThumbList"><a href="/jc/article?k=2022101700797&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700797.jpg" alt="選挙制度見直しへ改憲を　格差是正、人口以外も配慮―自民・森山氏" height="65" width="65" class="lazyload"></div><p>選挙制度見直しへ改憲を　格差是正、人口以外も配慮―自民・森山氏</p><span>(10/17 17:24)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700794&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol1-1.jpg" alt="「新安保共同宣言」締結へ　中国視野に連携強化―日豪" height="65" width="65" class="lazyload"></div><p>「新安保共同宣言」締結へ　中国視野に連携強化―日豪</p><span>(10/17 17:22)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700597&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700597.jpg" alt="岸田首相、核シェルター「現実的な対策必要」　国葬費、速報値から大幅増せず―衆院予算委" height="65" width="65" class="lazyload"></div><p>岸田首相、核シェルター「現実的な対策必要」　国葬費、速報値から大幅増せず―衆院予算委</p><span>(10/17 16:06)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700663&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700663.jpg" alt="教団被害救済法案を共同提出　立民・維新" height="65" width="65" class="lazyload"></div><p>教団被害救済法案を共同提出　立民・維新</p><span>(10/17 15:23)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700587&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700587.jpg" alt="都民ファースト、代表選へ　荒木代表が辞任" height="65" width="65" class="lazyload"></div><p>都民ファースト、代表選へ　荒木代表が辞任</p><span>(10/17 14:47)</span></a></li><!-- fluct start -->
<div id="logly-lift-4273483"></div>
<script charset="UTF-8">
  (function(){
    var _lgy_lw = document.createElement("script");
    _lgy_lw.type = "text/javascript";
    _lgy_lw.charset = "UTF-8";
    _lgy_lw.async = true;
    _lgy_lw.src= (("https:" == document.location.protocol) ? "https://" : "http://")+"l.logly.co.jp/lift_widget.js?adspot_id=4273483";
    var _lgy_lw_0 = document.getElementsByTagName("script")[0];
    _lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);
  })();
</script>
<!-- fluct end --><li class="ThumbList"><a href="/jc/article?k=2022101700581&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700581.jpg" alt="真榊奉納に「深い失望」　韓国" height="65" width="65" class="lazyload"></div><p>真榊奉納に「深い失望」　韓国</p><span>(10/17 14:43)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700158&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol1-2.jpg" alt="首相動静（１０月１７日）" height="65" width="65" class="lazyload"></div><p>首相動静（１０月１７日）</p><span>(10/17 13:16)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700495&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol1-1.jpg" alt="現職が４選出馬表明　愛媛知事選" height="65" width="65" class="lazyload"></div><p>現職が４選出馬表明　愛媛知事選</p><span>(10/17 13:16)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700179&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700179.jpg" alt="岸田首相、旧統一教会の調査を指示　「質問権」初行使、基準策定へ" height="65" width="65" class="lazyload"></div><p>岸田首相、旧統一教会の調査を指示　「質問権」初行使、基準策定へ</p><span>(10/17 12:57)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700154&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700154.jpg" alt="岸田首相、靖国に真榊奉納　高市経済安保相が参拝―秋季例大祭" height="65" width="65" class="lazyload"></div><p>岸田首相、靖国に真榊奉納　高市経済安保相が参拝―秋季例大祭</p><span>(10/17 12:46)</span></a></li><!-- fluct start -->
<div id="logly-lift-4273483"></div>
<script charset="UTF-8">
  (function(){
    var _lgy_lw = document.createElement("script");
    _lgy_lw.type = "text/javascript";
    _lgy_lw.charset = "UTF-8";
    _lgy_lw.async = true;
    _lgy_lw.src= (("https:" == document.location.protocol) ? "https://" : "http://")+"l.logly.co.jp/lift_widget.js?adspot_id=4273483";
    var _lgy_lw_0 = document.getElementsByTagName("script")[0];
    _lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);
  })();
</script>
<!-- fluct end --><li class="ThumbList"><a href="/jc/article?k=2022101700430&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol1-1.jpg" alt="台湾問題「平和的解決を」　中国主席発言で―松野官房長官" height="65" width="65" class="lazyload"></div><p>台湾問題「平和的解決を」　中国主席発言で―松野官房長官</p><span>(10/17 11:49)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700093&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700093.jpg" alt="日銀総裁人事「政府との連携重視」　通園バス安全装置で財政措置―岸田首相" height="65" width="65" class="lazyload"></div><p>日銀総裁人事「政府との連携重視」　通園バス安全装置で財政措置―岸田首相</p><span>(10/17 11:44)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700367&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol1-1.jpg" alt="日ルクセンブルク首脳が会談へ" height="65" width="65" class="lazyload"></div><p>日ルクセンブルク首脳が会談へ</p><span>(10/17 11:16)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101700252&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101700252.jpg" alt="旧統一教会との関係陳謝　自民・萩生田氏" height="65" width="65" class="lazyload"></div><p>旧統一教会との関係陳謝　自民・萩生田氏</p><span>(10/17 10:03)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101600258&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101600258.jpg" alt="冬に備えた避難民支援を　ウクライナでＩＯＭ副事務局長" height="65" width="65" class="lazyload"></div><p>冬に備えた避難民支援を　ウクライナでＩＯＭ副事務局長</p><span>(10/17 07:10)</span></a></li><!-- fluct start -->
<div id="logly-lift-4273483"></div>
<script charset="UTF-8">
  (function(){
    var _lgy_lw = document.createElement("script");
    _lgy_lw.type = "text/javascript";
    _lgy_lw.charset = "UTF-8";
    _lgy_lw.async = true;
    _lgy_lw.src= (("https:" == document.location.protocol) ? "https://" : "http://")+"l.logly.co.jp/lift_widget.js?adspot_id=4273483";
    var _lgy_lw_0 = document.getElementsByTagName("script")[0];
    _lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);
  })();
</script>
<!-- fluct end --><li class="ThumbList"><a href="/jc/article?k=2022101600254&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101600254.jpg" alt="攻撃型無人機、２５年度にも配備　離島防衛を強化―防衛省" height="65" width="65" class="lazyload"></div><p>攻撃型無人機、２５年度にも配備　離島防衛を強化―防衛省</p><span>(10/17 07:07)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101600253&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101600253.jpg" alt="規模・財源、反撃能力が焦点　防衛力強化、１８日から与党協議" height="65" width="65" class="lazyload"></div><p>規模・財源、反撃能力が焦点　防衛力強化、１８日から与党協議</p><span>(10/17 07:06)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101600294&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101600294.jpg" alt="岸田首相、旧統一教会の調査指示へ　「質問権」初行使、宗教法人法根拠" height="65" width="65" class="lazyload"></div><p>岸田首相、旧統一教会の調査指示へ　「質問権」初行使、宗教法人法根拠</p><span>(10/17 07:06)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101600178&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol1-2.jpg" alt="首相動静（１０月１６日）" height="65" width="65" class="lazyload"></div><p>首相動静（１０月１６日）</p><span>(10/16 22:03)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101600172&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101600172.jpg" alt="那覇市長選に新人２氏　オール沖縄と自公系が対決" height="65" width="65" class="lazyload"></div><p>那覇市長選に新人２氏　オール沖縄と自公系が対決</p><span>(10/16 17:29)</span></a></li><!-- fluct start -->
<div id="logly-lift-4273483"></div>
<script charset="UTF-8">
  (function(){
    var _lgy_lw = document.createElement("script");
    _lgy_lw.type = "text/javascript";
    _lgy_lw.charset = "UTF-8";
    _lgy_lw.async = true;
    _lgy_lw.src= (("https:" == document.location.protocol) ? "https://" : "http://")+"l.logly.co.jp/lift_widget.js?adspot_id=4273483";
    var _lgy_lw_0 = document.getElementsByTagName("script")[0];
    _lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);
  })();
</script>
<!-- fluct end --><li class="ThumbList"><a href="/jc/article?k=2022101500310&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101500310.jpg" alt="旧統一教会・物価高で本格論戦　１７日から衆院予算委" height="65" width="65" class="lazyload"></div><p>旧統一教会・物価高で本格論戦　１７日から衆院予算委</p><span>(10/16 15:57)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101600201&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101600201.jpg" alt="立民との共闘、継続も　選挙協力は否定―維新・馬場氏" height="65" width="65" class="lazyload"></div><p>立民との共闘、継続も　選挙協力は否定―維新・馬場氏</p><span>(10/16 11:21)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101500326&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101500326.jpg" alt="茂木氏、派内で足場固め　「ポスト岸田」、教団対応が焦点―自民" height="65" width="65" class="lazyload"></div><p>茂木氏、派内で足場固め　「ポスト岸田」、教団対応が焦点―自民</p><span>(10/16 07:04)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101500232&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/dummy/pol1-2.jpg" alt="首相動静（１０月１５日）" height="65" width="65" class="lazyload"></div><p>首相動静（１０月１５日）</p><span>(10/15 22:10)</span></a></li><li class="ThumbList"><a href="/jc/article?k=2022101500368&g=pol" class="clearfix"><div class="NewsThumb"><img src="/news2/kiji_photos/square/dummy/dummy.jpg" data-src="/news2/kiji_photos/square/202210/2022101500368.jpg" alt="献花に列、反対集会も　「開催当然」「強制許せぬ」―安倍氏県民葬" height="65" width="65" class="lazyload"></div><p>献花に列、反対集会も　「開催当然」「強制許せぬ」―安倍氏県民葬</p><span>(10/15 20:33)</span></a></li><!-- fluct start -->
<div id="logly-lift-4273483"></div>
<script charset="UTF-8">
  (function(){
    var _lgy_lw = document.createElement("script");
    _lgy_lw.type = "text/javascript";
    _lgy_lw.charset = "UTF-8";
    _lgy_lw.async = true;
    _lgy_lw.src= (("https:" == document.location.protocol) ? "https://" : "http://")+"l.logly.co.jp/lift_widget.js?adspot_id=4273483";
    var _lgy_lw_0 = document.getElementsByTagName("script")[0];
    _lgy_lw_0.parentNode.insertBefore(_lgy_lw, _lgy_lw_0);
  })();
</script>
<!-- fluct end -->
			</ul>
		<div class="LinkListMore"><a href="/jc/list?g=pol">もっと見る</a></div>
		</div>
	</div>



	<!--特集-->
	<!--編集部セレクション-->
<section class="RecommendUnderlayer selection">
<div class="Title clearfix"><p>コラム・連載</p></div>
<div class="RecommendUnderlayerInner">
<ul><li>
<a href="/jc/v8?id=202210fukudomesasaki">
<div class="ThumbImg"><img width="161" height="103" src="/news/handmade/file/images/ichioshi-photo4/tok-jpp01245315.jpg" alt="ヨッシャー！から◆福留と佐々木恭介の絆" class="aovr"></div>
<div class="ThumbText key_icon">ヨッシャー！から◆福留と佐々木恭介の絆</div>
</a></li><li>
<a href="/jc/v8?id=20221013sp-wttcteam">
<div class="ThumbImg"><img width="161" height="103" src="/news/handmade/file/images/ichioshi-photo4/wtt2022_218.jpg" alt="男子も中国を本気にさせた世界卓球" class="aovr"></div>
<div class="ThumbText key_icon">男子も中国を本気にさせた世界卓球</div>
</a></li><li>
<a href="/jc/v8?id=20221012chinawatch">
<div class="ThumbImg"><img width="161" height="103" src="/news/handmade/file/images/ichioshi-photo4/20221012_chinawatch_218-140.jpg" alt="習主席への不満？支持？◆臆測を呼ぶ長老の「露出」" class="aovr"></div>
<div class="ThumbText key_icon">習主席への不満？支持？◆臆測を呼ぶ長老の「露出」</div>
</a></li><li>
<a href="/jc/v8?id=202210keizaihyaku075">
<div class="ThumbImg"><img width="161" height="103" src="/news/handmade/file/images/ichioshi-photo4/toku-kei075.jpg" alt="売れる高級腕時計、国内勢も" class="aovr"></div>
<div class="ThumbText key_icon">売れる高級腕時計、国内勢も</div>
</a></li><li>
<a href="/jc/v8?id=202210snskodomo">
<div class="ThumbImg"><img width="161" height="103" src="/news/handmade/file/images/ichioshi-photo4/202210snskodomo-sam3.jpg" alt="スマホを捨てよ森へ…" class="aovr"></div>
<div class="ThumbText key_icon">スマホを捨てよ森へ…</div>
</a></li><li>
<a href="/jc/v8?id=202210tenbyo06">
<div class="ThumbImg"><img width="161" height="103" src="/news/handmade/file/images/ichioshi-photo4/20221010tenbyo_218.jpg" alt="国葬後も深まる政権危機" class="aovr"></div>
<div class="ThumbText key_icon">国葬後も深まる政権危機</div>
</a></li><li>
<a href="/jc/v8?id=202210ehon-team">
<div class="ThumbImg"><img width="161" height="103" src="/news/handmade/file/images/ichioshi-photo4/ehon_rogo_218.jpg" alt="なぜ売れる？絵本が人気" class="aovr"></div>
<div class="ThumbText key_icon">なぜ売れる？絵本が人気</div>
</a></li><li>
<a href="/jc/v8?id=20221009fishtopics">
<div class="ThumbImg"><img width="161" height="103" src="/news/handmade/file/images/ichioshi-photo4/tok-ft20221009.jpg" alt="サバ◆ノルウェー産が日本の主役へ" class="aovr"></div>
<div class="ThumbText key_icon">サバ◆ノルウェー産が日本の主役へ</div>
</a></li></ul>
</div>
</section>
<!--編集部セレクション-->
	<!--特集-->

	<div class="ArticleAd">
	<div class="BigAd">
		<!-- Google Advertisement pc_footer start -->
			<!-- www/PC/pc_footer -->
			<div id='pc-footer'>
			<script type='text/javascript'>
			googletag.cmd.push(function() { googletag.display('pc-footer'); });
			</script>
			</div>
		<!-- Google Advertisement pc_footer end -->
	</div>
</div>


</div>

            <!-- right start -->
			<div id="Sub" class="Normal">

    <div class="ArticleAdSide">

		<!-- Google Advertisement 1stRec start -->
		<!-- www/PC/pc_1rec -->
		<div id='pc-1rec'>
			<script type='text/javascript'>
				googletag.cmd.push(function() { googletag.display('pc-1rec'); });
			</script>
		</div>
		<!-- Google Advertisement 1stRec end -->

	</div>

	<aside class="novel">
		<a href="/jc/puzzle">
			<img src="/img/sudoku300x50.jpg" alt="数独" width="300" height="50">
		</a>
	</aside>

    <!--フォーカス-->
	<aside class="Focus Pattern6">
	<div class="AsideTitle">
		<h3 class="Title clearfix">
        	<p class="fleft">フォーカス</p>
        </h3>
	</div>
    <div class="FocusInner">
    	<ul class="clearfix"><li><a href="/jc/d4?p=ghb012&amp;d=d4_event">
<img width="65" height="65" class="aovr" alt="ジブリパーク来月開業" src="/news/handmade/file/images/focus-photo/focus-jpp043216943.jpg">
<span>ジブリパーク来月開業</span></a></li>
<li><a href="/jc/bunshun?id=57974">
<img width="65" height="65" class="aovr" alt="この言葉でいいですか" src="/news/handmade/file/images/focus-photo/pcf-bunshun57974.jpg">
<span>この言葉でいいですか</span></a></li>
<li><a href="/jc/d4?p=nkm225&amp;d=d4_mili">
<img width="65" height="65" class="aovr" alt="北朝鮮「戦術核訓練」" src="/news/handmade/file/images/focus-photo/pcf-jpp043199511.jpg">
<span>北朝鮮「戦術核訓練」</span></a></li>
<li><a href="/jc/tokushu?id=ukraine_russian_2022&amp;g=ukr">
<img width="65" height="65" class="aovr" alt="ウクライナ情勢マップ" src="/news/handmade/file/images/focus-photo/psc-urmap.jpg">
<span>ウクライナ情勢マップ</span></a></li>
<li><a href="/jc/d4?p=dlw929&amp;d=d4_mili2">
<img width="65" height="65" class="aovr" alt="ドイツ空軍空自と訓練" src="/news/handmade/file/images/focus-photo/pcf-jpp043094700.jpg">
<span>ドイツ空軍<br />空自と訓練</span></a></li>
<li><a href="/jc/v7?id=npb2022post">
<img width="65" height="65" class="aovr" alt="今年もヤｖｓオ" src="/news/handmade/file/images/focus-photo/pcf-npb2022post.jpg">
<span>今年も<br />ヤｖｓオ</span></a></li>
<li><a href="/jc/v7?id=hshibuno0805">
<img width="65" height="65" class="aovr" alt="渋野日向子は８位" src="/news/handmade/file/images/focus-photo/pcf-shibu-2.jpg">
<span>渋野日向子<br />は８位</span></a></li>
<li><a href="/jc/v7?id=202210harukimurakami">
<img width="65" height="65" class="aovr" alt="村上氏受賞はならず" src="/news/handmade/file/images/focus-photo/pcf-jpp028767822.jpg">
<span>村上氏受賞<br />はならず</span></a></li>
<li><a href="/jc/d4?p=auc005&amp;d=d4_int">
<img width="65" height="65" class="aovr" alt="８４億円で落札" src="/news/handmade/file/images/focus-photo/pcf-jpp043180772.jpg">
<span>８４億円で落札</span></a></li>
<li><a href="/jc/d4?p=fld517&amp;d=d4_ftee">
<img width="65" height="65" class="aovr" alt="大統領夫人女王国葬に" src="/news/handmade/file/images/focus-photo/pcf-jpp043010384.jpg">
<span>大統領夫人<br />女王国葬に</span></a></li>
<li><a href="/jc/d4?p=mrn225&amp;d=d4_mm">
<img width="65" height="65" class="aovr" alt="不適切な写真と謝罪" src="/news/handmade/file/images/focus-photo/pcf-jpp042743844.jpg">
<span>不適切な写真と謝罪</span></a></li>
<li><a href="/jc/d4?p=adr001&amp;d=d4_ent">
<img width="65" height="65" class="aovr" alt="朝ドラのヒロイン" src="/news/handmade/file/images/focus-photo/pcf-nhkasadora2209.jpg">
<span>朝ドラの<br />ヒロイン</span></a></li>
</ul>
</div>
</aside>
    <!--フォーカス-->

    <div class="ArticleAdSide">

		<!-- Google Advertisement pc_2rec start -->
		<!-- www/PC/pc_2rec -->
			<div id='pc-2rec'>
				<script type='text/javascript'>
					googletag.cmd.push(function() { googletag.display('pc-2rec'); });
				</script>
			</div>
		<!-- Google Advertisement 2ndRec end -->

	</div>

	<aside class="sns">
		<div class="fb"><a href="https://www.facebook.com/wwwjijicom/" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a></div>
		<div class="jiji">時事通信<span>の</span>SNS</div>
		<div class="tw"><a href="https://twitter.com/jijicom" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a></div>
	</aside>

	<aside class="SideRanking3" style="">
 <div class="AsideTitle">
   <h3 class="Title clearfix"><p class="fleft"><i class="fa fa-check fa-1x"></i>注目記事</p></h3>
 </div>
 <div class="AsideInnerBox Red">
   <ul>
     <li data-title="auto"><a href="/jc/article?k=2022101700307&g=soc" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '1');"><p>サンシャイン６０で１００人乱闘　５８階、「出所祝い」宴会中か―警視庁<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">16</span></span>
</p></a><a class="cat" href="/jc/list?g=soc" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '2');"><span>社会</span></a></li>
<li data-title="auto"><a href="/jc/article?k=2022101700097&g=int" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '3');"><p>ベラルーシのロシア軍９０００人　ウクライナ北部侵攻の懸念<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">20</span></span>
</p></a><a class="cat" href="/jc/list?g=int" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '4');"><span>国際</span></a></li>
<li data-title="auto"><a href="/jc/article?k=2022101700179&g=pol" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '5');"><p>岸田首相、旧統一教会の調査を指示　「質問権」初行使、基準策定へ<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">62</span></span>
</p></a><a class="cat" href="/jc/list?g=pol" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '6');"><span>政治</span></a></li>
<li><a href="/jc/article?k=2022101700567&g=int" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '7');"><p>ロシア軍、協力拒否の指揮者を射殺か　「併合」のヘルソン州―ウクライナ<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">18</span></span>
</p></a><a class="cat" href="/jc/list?g=int" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '8');"><span>国際</span></a></li>
<li data-title="auto"><a href="/jc/article?k=2022101500125&g=pol" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '9');"><p>ガーシー氏、なぜおとがめない？　当選後も、いまだ登院せず―ニュースＱ＆Ａ<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">73</span></span>
</p></a><a class="cat" href="/jc/list?g=pol" onclick="ga('jijiga.send' , 'event' , ' hotnews_click' , 'click ' , $(this).text() , '10');"><span>政治</span></a></li>
   </ul>
 </div>
</aside>


	<aside class="SpecialBox Pattern5">
<div class="AsideTitle">
	<h3 class="Title clearfix">
		<p class="fleft">人気記事アーカイブ</p>
		<a class="fright" href="/jc/v">特集トップ</a>
	</h3>
</div>
<div class="AsideInnerBox">
	<ul class="clearfix">
		<li>
<a class="clearfix" href="/jc/v8?id=202210kaisetsuiin038">
	<img class="lazyload" src="/img/dummy1x1white.jpg"  width="126" height="126" data-src="/news/handmade/file/images/ichioshi-photo4/arc-kai038-2.jpg" alt="政務秘書官３タイプ" class="aovr">
	<p>政務秘書官３タイプ</p>
	<p class="key_icon">長男就任で注目</p>
</a>
</li>
<li>
<a class="clearfix" href="/jc/v8?id=202209kaisetsuiin036">
	<img class="lazyload" src="/img/dummy1x1white.jpg"  width="126" height="126" data-src="/news/handmade/file/images/ichioshi-photo4/202209kaisetsuiin036-202209kaisetsuiin036-6.jpg" alt="頭をよぎる" class="aovr">
	<p>頭をよぎる</p>
	<p class="key_icon">「悪魔の選択」</p>
</a>
</li>
<li>
<a class="clearfix" href="/jc/v8?id=202208TobiAmusan">
	<img class="lazyload" src="/img/dummy1x1white.jpg"  width="126" height="126" data-src="/news/handmade/file/images/ichioshi-photo4/arc-202208TobiAmusan.jpg" alt="スーパースパイクで" class="aovr">
	<p>スーパースパイクで</p>
	<p class="key_icon">驚異の世界新記録</p>
</a>
</li>
<li>
<a class="clearfix" href="/jc/v8?id=202208skorea02">
	<img class="lazyload" src="/img/dummy1x1white.jpg"  width="126" height="126" data-src="/news/handmade/file/images/ichioshi-photo4/ninki_kaburi_180.jpg" alt="ベールに包まれた" class="aovr">
	<p>ベールに包まれた</p>
	<p class="key_icon">大統領夫人</p>
</a>
</li>
	</ul>
</div>
</aside>


</div>
<div class="sticky">

	<div class="ArticleAdSide">
		<!-- Google Advertisement 3rdRec start -->
		<!-- www/PC/pc_3rec -->
			<div id='pc-3rec'>
				<script type='text/javascript'>
					googletag.cmd.push(function() { googletag.display('pc-3rec'); });
			</script>
		</div>
		<!-- Google Advertisement 3rdRec end -->
	</div>

    <!--アクセスランキング-->
	<aside class="SideRanking2">
<div class="AsideTitle">
	<h3 class="Title clearfix">
     		<p class="fleft">アクセスランキング&nbsp;政治</p>
 		<a href="/jc/r" class="fright" onclick="ga('jijiga.send' , 'event' , ' rank_click' , 'click ' , $(this).text() , '1');">一覧へ</a>
		</h3>
</div>
<div class="AsideInnerBox Red">
		<ul>
		<li>
<span class="ranking">1</span>
<a href="/jc/article?k=2022101500125&g=pol" onclick="ga('jijiga.send' , 'event' , ' rank_click' , 'click ' , $(this).text() , '2');">
	<p>ガーシー氏、なぜおとがめない？　当選後も、いまだ登院せず―ニュースＱ＆Ａ<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">73</span></span>
</p>
	<img src="/news2/kiji_photos/square/202210/2022101500125.jpg" alt="ガーシー氏、なぜおとがめない？　当選後も、いまだ登院せず―ニュースＱ＆Ａ" width="60" height="60">
</a>
</li>
<li>
<span class="ranking">2</span>
<a href="/jc/article?k=2022101600254&g=pol" onclick="ga('jijiga.send' , 'event' , ' rank_click' , 'click ' , $(this).text() , '3');">
	<p>攻撃型無人機、２５年度にも配備　離島防衛を強化―防衛省<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">44</span></span>
</p>
	<img src="/news2/kiji_photos/square/202210/2022101600254.jpg" alt="攻撃型無人機、２５年度にも配備　離島防衛を強化―防衛省" width="60" height="60">
</a>
</li>
<li>
<span class="ranking">3</span>
<a href="/jc/article?k=2022101401009&g=pol" onclick="ga('jijiga.send' , 'event' , ' rank_click' , 'click ' , $(this).text() , '4');">
	<p>国会出席要求は「ばか」　Ｎ党・立花氏<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">156</span></span>
</p>
	<img src="/news2/kiji_photos/square/202210/2022101401009.jpg" alt="国会出席要求は「ばか」　Ｎ党・立花氏" width="60" height="60">
</a>
</li>
<li>
<span class="ranking">4</span>
<a href="/jc/article?k=2022101700581&g=pol" onclick="ga('jijiga.send' , 'event' , ' rank_click' , 'click ' , $(this).text() , '5');">
	<p>真榊奉納に「深い失望」　韓国<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">24</span></span>
</p>
	<img src="/news2/kiji_photos/square/202210/2022101700581.jpg" alt="真榊奉納に「深い失望」　韓国" width="60" height="60">
</a>
</li>
<li>
<span class="ranking">5</span>
<a href="/jc/article?k=2022101700179&g=pol" onclick="ga('jijiga.send' , 'event' , ' rank_click' , 'click ' , $(this).text() , '6');">
	<p>岸田首相、旧統一教会の調査を指示　「質問権」初行使、基準策定へ<span class="comment_count_wrap"><span class="comment_icon"></span><span class="comment_count">62</span></span>
</p>
	<img src="/news2/kiji_photos/square/202210/2022101700179.jpg" alt="岸田首相、旧統一教会の調査を指示　「質問権」初行使、基準策定へ" width="60" height="60">
</a>
</li>
	</ul>
</div>
</aside>

    <!--アクセスランキング-->

    <!--きょうは何の日？-->
	<aside class="Whatday">
	<div class="AsideTitle">
		<h3 class="Title clearfix">
        	<p class="fleft">今日は何の日？</p>
        </h3>
	</div>
    <div class="AsideInnerBox Brown">
		<a class="clearfix" href="/jc/daily">
        	<img class="aovr" alt="ハロウィーン日本人留学生射殺事件" src="/news/daily_contents/10/image/120/0930449.jpg" width="120" height="79">
            <p><span>1992年</span>ハロウィーン日本人留学生射殺事件</p>
        </a>
    </div>
</aside>

    <!--きょうは何の日？-->

    <!--ふるさと納税関連ニュース-->
	<aside class="SubNews1">
<div class="AsideTitle">
<h3 class="Title clearfix">
<p class="fleft"><a href="/jc/ti?p=index&amp;g=kanagawa2022"><b>【PR】神奈川県私大医学部特集</b></a></p>
</h3>
</div>
<div class="AsideInnerBox Blue clearfix">
<ul>

<li><a href="/jc/ti?p=index&amp;g=kanagawa2022"><b>医学部ってどんなとこ？</b></a></li>

<li><a href="/jc/ti?p=symposium_dean/index&amp;g=kanagawa2022"><b>医学部長が語る面接試験のポイント</b></a></li>

</ul>
<div class="PhotoSubNews1">

<li><a href="/jc/ti?p=symposium/index&amp;g=kanagawa2022">

<img height="128" width="128" class="aovr" alt="" src="/news/handmade/file/images/ichioshi-photo3/mori.jpg">

</a></li>
</div>
</div>
</aside>

<style type="text/css">
.yayoi_ad_box2 {
	width:300px;
	height:190px;
    border: 1px solid #ddd;
	text-align:center;
    padding-top: 20px;
    margin-bottom: 20px;
}

.yayoi_ad_box2 img:hover {
	opacity: 0.7;
}
.yayoi_ad_unit2 {
	padding-top: 15px;
    	font-size: 90%;
	font-weight:normal;
	color:#000000;
}
</style>


<div class="yayoi_ad_box2">

<a href="https://greenfinancesemi.metro.tokyo.lg.jp/">
<img src="/ad/img/GF_250x140.jpg" style="padding-left:25px" alt=""></a>

<div class="yayoi_ad_unit2"><a href="https://greenfinancesemi.metro.tokyo.lg.jp/"><b>東京都からイベントのご案内（PR）</b></a></div>

</div>
    <!--ふるさと納税関連ニュース-->

    <!--日本語検定-->
    <aside class="Nihongokentei">
<div class="AsideTitle">
	<h3 class="TitleBlue">きょうの日本語検定&#12288;正しいのはどれ？</h3>
	</div>
<div class="NihongokenteiInner">
    	<h4>【日常－平素】と同じ関係になる言葉の組み合わせは？[4級]</h4>
	<ol>
		<li class="NihongokenteiA"><a href="/jc/e?g=e07&d=20221017&ans=1">絶賛－酷評</a></li>
		<li class="NihongokenteiB"><a href="/jc/e?g=e07&d=20221017&ans=2">早世－若死に</a></li>
		<li class="NihongokenteiC"><a href="/jc/e?g=e07&d=20221017&ans=3">疎遠－親近</a></li>
	</ol>
</div>
<span><a href="https://www.nihongokentei.jp/exam/" target="_blank">日本語検定受検申込みはこちら！</a></span>
</aside>

    <!--日本語検定-->

	<!--pr bottom-->

	<!--pr bottom-->

	<div class="ArticleAdSide">
<aside>
	<div id="yads_r2"><script src="https://yads.c.yimg.jp/js/yads-async.js" async onload="yadsRequestAsync({yads_ad_ds:'93479_278227',yads_parent_element:'yads_r2'})"></script></div>
</aside>
</div>

</div>

            <!-- right end -->

        </div>
    </div>

	<!-- footer start -->
	<div id="Index"></div>
	<div id="Loader"></div>
		<div id="ContentEnd">
	<div class="clearfix" id="ToTop"><a href="#PageHeader">ページの先頭へ</a></div>
	<div id="ContentEndTop">
		<div class="ContentEndTopInner clearfix">
			<div class="Book">
	         	<a href="http://www.jaro.or.jp/">
	                    <dl>
	                        <dt>【JAROってなんじゃろ？】</dt>
	                        <dd>JAROは、これからも広告・表示のフェアプレイを推進してます。詳しくはこちら。</dd>
	                    </dl>
	                </a>
			</div>
			<div class="Book">
	            	<a href="https://www.jiji.co.jp/service/e-world/">
	                    <dl>
	                        <dt>【e-World Premium】</dt>
	                        <dd>「国際情報電子書籍」<br />１０月号の特集は「世界で進む分断」。
米中・米ロの対立や米中間選挙、欧州政治情勢など分断の実像に迫る。
</dd>
	                    </dl>
	                </a>
			</div>
			<div class="Book">
	            	<a href="https://www.jiji.co.jp/service/agrio/">
	                    <dl>
	                        <dt>【農林水産業のデジタル情報誌】</dt>
	                        <dd>デジタル情報誌「Agrio」は２０１４年３月創刊。「６次産業化」「輸出」「ＴＰＰ対策」などをテーマに週１回発行。農林水産ビジネスのヒントも満載です。</dd>
	                    </dl>
	                </a>
			</div>
			<div class="Book mr0">
	            	<a href="https://medical.jiji.com/">
	                    <dl>
	                        <dt>【時事メディカル】</dt>
	                        <dd>医療情報サイト「時事メディカル」が伝える最新の医療ニュースに加え、気になる慢性疾患や流行中の感染症など時宜にかなった情報を日々、紹介します。</dd>
	                    </dl>
	                </a>
			</div>
			<div class="Book">
	            	<a href="https://bookpub.jiji.com/book/b437097.html">
	                    <dl>
	                        <dt>【新刊】「怒る上司のトリセツ」 </dt>
	                        <dd>あなたの周りの「困った人」に、振り回されていませんか？ 理不尽な怒りは相手の問題で、あなたの問題ではありません。怒りは「初期消火」が肝心。怒りのストーリーを見極めて、上手に対処しましょう。  </dd>
	                    </dl>
	                </a>
			</div>
			<div class="Book">
	            	<a href="https://www.jiji.co.jp/service/file/">
	                    <dl>
	                        <dt>【新刊】</dt>
	                        <dd>社団法人・地方行財政調査会の「全国知事・市町村長ファイル2021-2022」発売開始！</dd>
	                    </dl>
	                </a>
			</div>
			<div class="Book">
	            	<a href="https://www.jiji.co.jp/service/senmon/">
	                    <dl>
	                        <dt>【専門情報誌】</dt>
	                        <dd>教育・福祉・地方行政・税務・ビジネスの最前線にいるあなたに新聞が書かない情報を！</dd>
	                    </dl>
	                </a>
			</div>
			<div class="Book mr0">
	            	<a href="https://financial.jiji.com/service/important_factinfo.html
">
	                    <dl>
	                        <dt>【重要事実情報】</dt>
	                        <dd>「売買管理支援情報」とも呼ばれる当情報サービスは、インサイダー取引の防止や、株式投資情報として活用できます。Webサービスの他、データ提供サービスも。</dd>
	                    </dl>
	                </a>
			</div>

			<div class="Img">
				<a href="https://barrons.jiji.com/?utm_source=jijicom&amp;utm_medium=banner&amp;utm_campaign=listed_in_services">
					<img class="lazyload" src="/img/dummy1x1navy.jpg" data-src="/ad/img/jijicom_300x60.jpg" width="235" height="47" alt="バロンズ・ダイジェスト">
				</a>
			</div>

			<div class="Img">
				<a href="https://equity.jiji.com/">
					<img class="lazyload" src="/img/dummy1x1navy.jpg" data-src="/ad/img/jijiequity_300_60.jpg" width="235" height="47" alt="時事エクイティ">
				</a>
			</div>

			<div class="Img">
				<a href="https://financial.jiji.com/long_investment/article_list.html?utm_source=jijicom&amp;utm_medium=banner&amp;utm_campaign=after20211130">
					<img class="lazyload" src="/img/dummy1x1navy.jpg" data-src="/ad/img/MicrosoftTeams-image (16) (1).jpg" width="235" height="47" alt="長期投資応援団">
				</a>
			</div>

			<div class="Img mr0">
				<a href="/jc/v7?id=shouhis">
					<img class="lazyload" src="/img/dummy1x1navy.jpg" data-src="/ad/img/202210_naijyo.png" width="235" height="47" alt="商品ヒストリー">
				</a>
			</div>

		</div>
	</div>

	<div id="ContentEndBottom">
		<dl>
			<dt>時事通信の商品・サービス　ラインナップ</dt>
			<dd>
				<ul class="clearfix">
					<li><a href="/hall/">時事通信ホール</a></li>
					<li><a href="http://naijyo.or.jp/">内外情勢調査会</a></li>
					<li><a href="https://www.jiji.co.jp/service/yoron/">世論調査・内閣支持率</a></li>
					<li><a href="https://bookpub.jiji.com/">時事通信出版局</a></li>
					<li><a href="http://jijiweb.jiji.com/info/asia_info.html">時事速報</a></li>
					<li><a href="https://www.jiji.co.jp/service/jijitopseminar">時事トップセミナー</a></li>
					<li><a href="http://kouensupport.jiji.com/">講演サポート.com</a></li>
					<li><a href="https://www.jiji.co.jp/service/senmon/">専門情報誌</a></li>
					<li><a href="http://jamp.jiji.com/info/">iJAMP時事行政情報モニター</a></li>

				</ul>
       		</dd>
       	</dl>
	</div>
</div>
<!-- DISPLAY on SP ICON -->
<script type="text/javascript">
	$(document).ready(function(){
		var mobile_url = '/sp/article?k=2022101700794&g=pol';
		var m_url = mobile_url.substr(0,6);
		var dmmy_tmplvar = '<tmpl_';
		//UA check
		if (jijicom_UA_check() == 'SP'){
			if ( m_url != dmmy_tmplvar ) {
				if ( mobile_url != '' ) {
					$('.SwitchSP').show();
				}
			}
		}
	});
	function SwitchSp(){
		$.cookie( "jijicom_device_cookie" , "SP" ,{ expires: 1000 , path: '/'});
		//window.location.reload( true );
		location.href = '/sp/article?k=2022101700794&g=pol';
	}
</script>

<!-- DISPLAY on SP ICON -->
<div class="SwitchSP" style="display:none;">
	<a href="javascript:void(0)" onclick="SwitchSp(); return false;">スマートフォン版へ</a>
</div>

<footer>
	<div class="FooterInner clearfix">
        <div id="FooterLogo"><a href="/"><img width="212" height="72" alt="時事通信社" src="/news2/common/img/footer-logo.gif"></a></div>
        <ul class="clearfix">
            <li><a href="https://www.jiji.co.jp/">会社案内</a></li>
            <li><a href="https://www.jiji.co.jp/service/">個人・法人向けサービス</a></li>
            <li><a href="https://www.jiji.co.jp/recruit">採用情報</a></li>
            <li><a href="https://www.jiji.co.jp/policy/privacy">個人情報保護方針</a></li>
            <li><a href="javascript:footerwin('/policy/disclaimer.html')">著作権・免責</a></li>
            <li><a href="javascript:footerwin('/policy/link.html')">リンク</a></li>
            <li><a href="javascript:footerwin('/policy/rss.html')">RSS規約</a></li>
            <li><a href="javascript:footerwin('/webpush/unsubscribe.html')">通知解除</a></li>
            <li><a href="https://www.jiji.co.jp/contact/">お問い合わせ</a></li>
			<li><a href="javascript:footerwin('/policy/privacypolicy.html')">プライバシーポリシー</a></li>
			<li><div id="datasign_privacy_notice__527404bb"><input type="hidden" class="opn_link_text" value="オンラインプライバシー通知"><script class="__datasign_privacy_notice__" src="//as.datasign.co/js/opn.js" data-hash="527404bb" async></script></div></li>
			<li><a href="/jc/members_agreement">会員規約</a></li>
			<li><a href="/jc/members_faq">会員ヘルプ</a></li>
        </ul>
    </div>
</footer>

<!-- weather js -->
<script type="text/javascript">
  (function() {
            var sc = document.createElement('script');
            sc.type = 'text/javascript';
            sc.async = true;
            sc.src = '/news2/forecast/js/4410_2.js';
            var stat = $.cookie('FORECAST');
            if(stat){
              if (stat != ''){
                sc.src = '/news2/forecast/js/' + stat + '_2.js';
              }
            }
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(sc, s);
          })();
</script>
<!-- /weather js -->
	<!-- footer end -->

	<script src="/news2/common/js/lazysizes.min.js"></script>

	<!-- Piano Login -->
	<script>tp=window.tp||[];const coLogin=document.getElementById("piano-login-register-container");const coLogout=document.getElementById("piano-logout-container");const btLogin=document.getElementById("piano-login-button");const btLogout=document.getElementById("piano-logout-button");pianoLoginLogoutButtons=function(){if(tp.user.isUserValid()){coLogout.style.display="flex";coLogin.style.display="none"}else{coLogout.style.display="none";coLogin.style.display="flex"}};tp.push(["init",function(){pianoLoginLogoutButtons();btLogin.addEventListener("click",function(){tp.pianoId.show({screen:"login",loggedIn:pianoLoginLogoutButtons})});btLogout.addEventListener("click",function(){tp.pianoId.logout(pianoLoginLogoutButtons)})}]);</script>
	<!-- /Piano Login -->

	<!--rubiconproject.com start-->
	<iframe id="multisync-iframe" height="0" width="0" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://secure-assets.rubiconproject.com/utils/xapi/multi-sync.html?p=dfp&endpoint=apac" style="border: 0px; display: none;"></iframe>
	<!--rubiconproject.com end-->

<!--chatbeat start-->
<script type='text/javascript'>
(function() {
var path = location.pathname;
var section = '';
var channel;
if ((path == '/') || (path == '/index.html') || (path == '/office.html')) {
channel = 'section:home';
} else if (path.indexOf('jc') > -1) {
channel = 'section:' + path.replace('/jc/', '');
} else {
channel = 'section:other';
}
section += channel;
var arg = new Object;
var param = location.search.substring(1).split('&');
for (var i = 0; param[i]; i++) {
var value = param[i].split('=');
arg[value[0]] = value[1];
}
if (arg.g) {
section += ',genre:' + arg.g;
}
console.log(section);
var title = document.querySelector('meta[name="title"]').getAttribute('content');
if (title === undefined) {
title = document.title;
}
/** CONFIGURATION START **/
var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
_sf_async_config.uid = 65742;
_sf_async_config.domain = 'jiji.com';
_sf_async_config.useCanonical = true;
_sf_async_config.sections = section;
_sf_async_config.title = title;
/** CONFIGURATION END **/
function loadChartbeat() {
var e = document.createElement('script');
var n = document.getElementsByTagName('script')[0];
e.type = 'text/javascript';
e.async = true;
e.src = '//static.chartbeat.com/js/chartbeat.js';
n.parentNode.insertBefore(e, n);
}
loadChartbeat();
})();
</script>
<!--chatbeat end-->

<script type="text/javascript" src="//csm.cxpublic.com/JIJI.js" async></script>

	<!-- popIn script start-->
	<script type="text/javascript">
    (function() {
        var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
        pa.src = window.location.protocol + "//api.popin.cc/searchbox/jiji_new.js";
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
    })();
	</script>
	<!-- popIn script end -->

	<script>
	var userAgent = window.navigator.userAgent.toLowerCase();
	if(userAgent.indexOf('safari') != -1) {
		var frame;
		frame = document.createElement('iframe');
		frame.src = 'https://jen.jiji.com/cookie.html';
		frame.style.display = 'none';
		frame.id = 'itp';
		document.body.appendChild(frame);
	}
	</script>

	<script src="/news2/common/js/article_iframe.js"></script>

	<div class="OUTBRAIN" data-src="DROP_PERMALINK_HERE" data-widget-id="AR_5"></div>

</body></html>`;

import { writeFileSync } from 'fs';
(async () => {
  async function doConvert() {
    const a11yConverter = new A11yConverter();
    const res = await a11yConverter.convert({
      // url: 'https://www.jiji.com/jc/article?k=2022101700794&g=pol',
      html: orgHtml,
      loadedUrl: 'https://www.jiji.com/jc/article?k=2022100501260&g=pol',
      method: 'GET',
      googleAnalyticsId: 'UA-XXXXX-Y',
      scrapingOptions: {
        contentSelector: '#11',
      },
      // extendFunction: async ({ html, $, contentType }) => {},
      extendFunction: ({ $ }) => {
        console.log('extendFunction');
        // add class to table
        // $('table').addClass('uv_binh111');
      },
      stylesheets: ['https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,300&display=swap']
    });

    const { html } = res;
    writeFileSync('./output/a11y.html', html);
  }

  await doConvert();
})();
