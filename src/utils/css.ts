export const uvCss = `<style>
body {
  font-family: 'Noto Sans JP', sans-serif;
}

#skg-style {
  float: left;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 20px 80px 20px;
  font-family: 'Noto Sans JP', sans-serif;
}

@media screen and (min-width:520px) {
  #skg-style {
    /*padding: 0 40px*/
  }
}

@media screen and (min-width:960px) {
  #skg-style {
    /*padding: 64px 40px 0*/
  }
}

@media screen and (min-width:1140px) {
  #skg-style {
    /*padding-left: 0;*/
    /*padding-right: 0*/
  }
}

@media screen and (max-width:959px) {

  #skg-style>.globalNav,
  #skg-style>.tagMenu {
    display: none
  }
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%
}

body {
  margin: 0
}

main {
  display: block
}

a {
  background-color: initial
}

b,
strong {
  font-weight: bolder
}

small {
  font-size: 80%
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: initial
}

sub {
  bottom: -.25em
}

sup {
  top: -.5em
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0
}

button,
input {
  overflow: visible
}

button,
select {
  text-transform: none
}

legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal
}

progress {
  vertical-align: initial
}

textarea {
  overflow: auto
}


details {
  display: block
}

summary {
  display: list-item
}

img {
  border-style: none;
  height: auto;
  vertical-align: bottom;
  display: inline-block;
  max-width: 100%
}

body {
  color: #222;
  font-family: Noto Sans JP, -apple-system, blinkmacsystemfont, Segoe UI, Hiragino Kaku Gothic ProN, BIZ UDPGothic, meiryo, sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: .04em;
  word-break: break-all
}

h1 {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 2.25rem;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 64px
}

@media screen and (max-width:519px) {
  h1 {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 2rem
  }
}

h2 {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 64px
}

@media screen and (max-width:519px) {
  h2 {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.625rem
  }
}

h3 {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1.625rem;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 24px;
  margin-top: 40px
}

@media screen and (max-width:519px) {
  h3 {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.39rem
  }
}

h4 {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1.375rem;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 16px;
  margin-top: 40px
}

@media screen and (max-width:519px) {
  h4 {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.28rem
  }
}

h5 {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 16px;
  margin-top: 40px
}

@media screen and (max-width:519px) {
  h5 {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.16rem
  }
}

h6 {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1.125rem;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 16px;
  margin-top: 24px
}

@media screen and (max-width:519px) {
  h6 {
    font-size: 1.07rem
  }
}

blockquote {
  background-color: #f4f4f4;
  line-height: 1.75;
  padding: 16px
}

blockquote>:first-child {
  margin-top: 0
}

blockquote>:last-child {
  margin-bottom: 0
}

ol,
ul {
  line-height: 1.75
}

/*table template for Uni-Voice ->*/
.uv_table table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 5px;
  max-width: 720px;
}

.uv_table table,
.uv_table table td,
.uv_table table th {
  border: 1px solid #808080;
}

.uv_table table caption {
  text-align: left;
  font-weight: 700;
  color: #ffffff;
  padding: 5px 10px;
  background-color: #434343;
}

.uv_table table caption a {
  color: #FFFFFF;
  text-decoration: underline;
}

.uv_table table td,
.uv_table table th {
  text-align: left;
  vertical-align: baseline;
  padding: 5px 10px;
}

.uv_table table th {
  font-weight: 700;
  background-color: #EFEFEF;
}

.uv_table table tr:nth-child(2n+1) {
  background: #EFEFEF;
}

/* <- table template for Uni-Voice */

.uv_annotation {
  font-size: .9rem;
  line-height: 1;
  display: table;
  list-style-type: none;
  padding: 10px;
}
</style>`;

export const commonCssLinks = [
  '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">',
  '<link rel="stylesheet" href="https://unpkg.com/a11y-css-reset/combo.css" />',
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">',
];
