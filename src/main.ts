import { JSDOM, ConstructorOptions } from 'jsdom';

const options: ConstructorOptions = {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  includeNodeLocations: true,
};

const editorHtml = `
<!DOCTYPE html>
<div id="editorjs"></div>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
<!--<script src="https://cdn.jsdelivr.net/npm/codex.editor.header@2.0.4/dist/bundle.js"></script>-->
<script src="https://cdn.jsdelivr.net/npm/@editorjs/table@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/link@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/embed@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/quote@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/inline-code@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/warning@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/code@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/marker@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/underline@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/delimiter@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/paragraph@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/list@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/raw@latest"></script>
<!--<script src="https://cdn.jsdelivr.net/npm/@editorjs/image@latest"></script>-->
<script src="https://cdn.jsdelivr.net/npm/@editorjs/simple-image@latest"></script>
<script>
    const editor = new EditorJS({
            holder: 'editorjs',
            tools: {
              header: Header,
              image: SimpleImage,
              checklist:Checklist,
              list: List,
              raw: RawTool,
              quote: Quote,
              Code: CodeTool,
              warning: Warning,
              Marker: Marker,
              delimiter:Delimiter,
              underline:Underline,
              paragraph:Paragraph,
              inlineCode:InlineCode,
              table: Table
            }
    })

    let me = this
    editor.isReady.then(()=>{
        console.log('editor is ready')
        me.editor = editor
    })

</script>`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class Html2Blocks {
  async convert(html: string) {
    const dom = new JSDOM(editorHtml, options);

    const window = dom.window;

    await sleep(1000);

    if (window.editor) {
      window.editor.blocks.renderFromHTML(html);
      const data = await window.editor.save();
      return data;
    }

    return null;
  }
}
export default Html2Blocks;
