export const _applyScript = () => {
  return `<script>
    const POST_MESSAGE_NAME = "FOCUS_EVENT";
    const TAG_NAME = {p: "p", tr: "tr"};

    onload = () => {
      document.querySelectorAll('#skg-style > p, tr').forEach(item => {
        item.addEventListener('focus', ({target}) => {
          const nodeName = target.nodeName?.toLowerCase();
          let nodeId;
          if (nodeName == TAG_NAME.tr) {
            const tableNode = $(target).closest('table')[0];
            nodeId = tableNode.id;
          } else if (nodeName == TAG_NAME.p) {
            nodeId = target.id;
          }

          window.top.postMessage({
            postMessageName: POST_MESSAGE_NAME,
            nodeName,
            nodeId,
          }, '*')
        }, false);
      })
    }
  </script>`;
};
