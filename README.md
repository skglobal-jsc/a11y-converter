# @sk-global/a11y-converter

Convert original HTML codes to a11y HTML


Reference:

- https://github.com/dequelabs/axe-core/blob/develop/doc/API.md)
- https://github.com/ffoodd/a11y.css
- https://www.npmjs.com/package/htmlparser2



- https://www.htmlwasher.com/


## What exactly does it do?
* Fixes or removes non-well formed tags and attributes (e.g. adds alt attributes to images if missing)
* Converts the markup to HTML5 (if it is XHTML for example)
* Reduces the markup to: `<a href>, <body>, <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, <head>, <hr>, <html>, <i>, <img src width height alt>, <li>, <ol>, <p>, <ruby>, <strong>, <table>, <tbody>, <td colspan rowspan>, <th colspan rowspan>, <title>, <tr>, <ul>`
* Replaces: `<b> to <strong>`, `<div> to <p>`
* Reformats the HTML (line breaks, indents)
