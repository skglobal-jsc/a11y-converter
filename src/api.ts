import jsdom, { JSDOM } from 'jsdom';

const options: jsdom.ConstructorOptions = {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  includeNodeLocations: true,
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const renderHtmlToEditor = async (
  html: string,
  opt?: jsdom.ConstructorOptions
) => {
  const { window } = new JSDOM(
    `<!DOCTYPE html>
  <div id="editorJs"></div>
  <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/header/dist/bundle.js"></script><!-- Header -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/simple-image/dist/bundle.js"></script><!-- Image -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/image/dist/bundle.js"></script><!-- Image -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/delimiter/dist/bundle.js"></script><!-- Delimiter -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/list/dist/bundle.js"></script>
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/nested-list/dist/nested-list.js"></script><!-- Nested List -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/checklist/dist/bundle.js"></script><!-- Checklist -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/quote/dist/bundle.js"></script><!-- Quote -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/code/dist/bundle.js"></script><!-- Code -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/embed/dist/bundle.js"></script><!-- Embed -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/table/dist/table.js"></script><!-- Table -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/link/dist/bundle.js"></script><!-- Link -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/raw/dist/bundle.js"></script><!-- Raw -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/warning/dist/bundle.js"></script><!-- Warning -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/paragraph/dist/bundle.js"></script><!-- Warning -->

    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/marker/dist/bundle.js"></script><!-- Marker -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/tools/inline-code/dist/bundle.js"></script><!-- Inline Code -->

    <!-- Load Editor.js's Core -->
    <script src="https://d3javs2py746ea.cloudfront.net/ragt-editor/editor.js"></script>
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
    { ...options, ...opt }
  );

  await sleep(2000);

  // render the html
  window.editor.blocks.renderFromHTML(html);

  // save the data
  const data = await window.editor.save();

  // return the data
  return data;
};
