import jsdom from 'jsdom';

const options: jsdom.ConstructorOptions = {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  includeNodeLocations: true,
};

const { JSDOM } = jsdom;
const { window } = new JSDOM(
  `<!DOCTYPE html>
<div id="editorJs"></div>
<script src="http://${host}:${port}/example/tools/header/dist/bundle.js"></script><!-- Header -->
  <script src="http://${host}:${port}/example/tools/simple-image/dist/bundle.js"></script><!-- Image -->
  <script src="http://${host}:${port}/example/tools/image/dist/bundle.js"></script><!-- Image -->
  <script src="http://${host}:${port}/example/tools/delimiter/dist/bundle.js"></script><!-- Delimiter -->
  <script src="http://${host}:${port}/example/tools/list/dist/bundle.js"></script>
  <script src="http://${host}:${port}/example/tools/nested-list/dist/nested-list.js"></script><!-- Nested List -->
  <script src="http://${host}:${port}/example/tools/checklist/dist/bundle.js"></script><!-- Checklist -->
  <script src="http://${host}:${port}/example/tools/quote/dist/bundle.js"></script><!-- Quote -->
  <script src="http://${host}:${port}/example/tools/code/dist/bundle.js"></script><!-- Code -->
  <script src="http://${host}:${port}/example/tools/embed/dist/bundle.js"></script><!-- Embed -->
  <script src="http://${host}:${port}/example/tools/table/dist/table.js"></script><!-- Table -->
  <script src="http://${host}:${port}/example/tools/link/dist/bundle.js"></script><!-- Link -->
  <script src="http://${host}:${port}/example/tools/raw/dist/bundle.js"></script><!-- Raw -->
  <script src="http://${host}:${port}/example/tools/warning/dist/bundle.js"></script><!-- Warning -->
  <script src="http://${host}:${port}/example/tools/paragraph/dist/bundle.js"></script><!-- Warning -->

  <script src="http://${host}:${port}/example/tools/marker/dist/bundle.js"></script><!-- Marker -->
  <script src="http://${host}:${port}/example/tools/inline-code/dist/bundle.js"></script><!-- Inline Code -->

  <!-- Load Editor.js's Core -->
  <script src="http://${host}:${port}/dist/editor.js"></script>
<script>


  const editor = new EditorJS({
          holder: 'editorJs',
          tools: {
            paragraph: {
              class: Paragraph,
              inlineToolbar: ["marker", "link"],
            },
            header: {
              class: Header,
              inlineToolbar: ["marker", "link"],
              config: {
                placeholder: "Header",
              },
              shortcut: "CMD+SHIFT+H",
            },

            /**
             * Or pass class directly without any configuration
             */
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  uploadByUrl(url) {
                    return new Promise((resolve) => {
                      resolve({
                        success: 1,
                        file: {
                          url
                        }
                      })
                    })
                  }
                }
              }
            },

            list: {
              class: NestedList,
              inlineToolbar: ["marker", "link"],
              shortcut: "CMD+SHIFT+L",
            },

            marker: {
              class: Marker,
              shortcut: "CMD+SHIFT+M",
            },

            embed: Embed,

            table: {
              class: Table,
              inlineToolbar: true,
              shortcut: "CMD+ALT+T",
            },
          }
  })
  let me = this
  editor.isReady.then(()=>{
      me.editor = editor
  })
</script>`,
  options
);

window.blocks = null;

