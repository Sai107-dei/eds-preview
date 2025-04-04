export default async function decorate(block) {
  block.innerHTML = `
 <div id="toolbar">
    <select id="fontName">
      <option value="Arial">Arial</option>
      <option value="Courier New">Courier New</option>
      <option value="Georgia">Georgia</option>
      <option value="Tahoma">Tahoma</option>
      <option value="Verdana">Verdana</option>
    </select>

    <select id="fontSize">
      <option value="1">10px</option>
      <option value="2">13px</option>
      <option value="3" selected>16px</option>
      <option value="4">18px</option>
      <option value="5">24px</option>
      <option value="6">32px</option>
      <option value="7">48px</option>
    </select>

    <button data-cmd="bold"><b>B</b></button>
    <button data-cmd="italic"><i>I</i></button>
    <button data-cmd="underline"><u>U</u></button>
    <button id="insertLink">Insert Link</button>
    <button id="insertTable">Insert Table</button>
  </div>

  <div id="editor" contenteditable="true">
    Start editing...
  </div>

`;

const editor = document.getElementById('editor');

// Formatting buttons
document.querySelectorAll('[data-cmd]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.execCommand(btn.dataset.cmd, false, null);
  });
});

// Font family
document.getElementById('fontName').addEventListener('change', (e) => {
  document.execCommand("fontName", false, e.target.value);
});

// Font size
document.getElementById('fontSize').addEventListener('change', (e) => {
  document.execCommand("fontSize", false, e.target.value);
});

// Insert link with tab option
document.getElementById('insertLink').addEventListener('click', () => {
  const url = prompt("Enter URL:");
  if (url) {
    const target = confirm("Open in new tab?") ? "_blank" : "_self";
    const selection = document.getSelection();
    const selectedText = selection.toString() || url;
    const anchor = `<a href="${url}" target="${target}">${selectedText}</a>`;
    document.execCommand('insertHTML', false, anchor);
  }
});

// Insert table (3x3 example)
document.getElementById('insertTable').addEventListener('click', () => {
  let rows = prompt("Number of rows", 3);
  let cols = prompt("Number of columns", 3);
  if (!rows || !cols) return;

  let table = '<table border="1" cellpadding="4" cellspacing="0">';
  for (let i = 0; i < rows; i++) {
    table += "<tr>";
    for (let j = 0; j < cols; j++) {
      table += "<td>&nbsp;</td>";
    }
    table += "</tr>";
  }
  table += "</table><br/>";
  document.execCommand('insertHTML', false, table);
});}