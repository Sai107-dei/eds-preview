export default async function decorate(block) {
  block.innerHTML = `
   <div class="toolbar">
    <!-- Headings -->
    <select title="Apply Heading" onchange="execCmd('formatBlock', this.value)">
      <option value="">Heading</option>
      <option value="H1">H1</option>
      <option value="H2">H2</option>
      <option value="H3">H3</option>
      <option value="H4">H4</option>
      <option value="H5">H5</option>
      <option value="H6">H6</option>
    </select>

    <!-- Font Family -->
    <select title="Choose Font Family" onchange="execCmd('fontName', this.value)">
      <option value="">Font</option>
      <option value="Arial">Arial</option>
      <option value="Courier New">Courier New</option>
      <option value="Georgia">Georgia</option>
      <option value="Times New Roman">Times New Roman</option>
      <option value="Verdana">Verdana</option>
    </select>

    <!-- Font Size -->
    <select title="Adjust Font Size" onchange="execCmd('fontSize', this.value)">
      <option value="">Font Size</option>
      <option value="1">8px</option>
      <option value="2">10px</option>
      <option value="3">12px</option>
      <option value="4">14px</option>
      <option value="5">18px</option>
      <option value="6">24px</option>
      <option value="7">32px</option>
    </select>

    <!-- Formatting -->
    <button title="Bold" onclick="execCmd('bold')"><b>B</b></button>
    <button title="Italic" onclick="execCmd('italic')"><i>I</i></button>
    <button title="Underline" onclick="execCmd('underline')"><u>U</u></button>
    <button title="Superscript" onclick="execCmd('superscript')">X<sup>2</sup></button>
    <button title="Subscript" onclick="execCmd('subscript')">X<sub>2</sub></button>
    <button title="Clear Formatting" onclick="execCmd('removeFormat')">Clear</button>

    <!-- Undo, Copy, Paste -->
    <button title="Undo" onclick="execCmd('undo')">Undo</button>
    <button title="Copy Selected Text" onclick="copyText()">Copy</button>
    <button title="Paste from Clipboard" onclick="pasteText()">Paste</button>

    <!-- List and Table -->
    <button title="Insert Ordered List" onclick="execCmd('insertOrderedList')">List</button>
    <button title="Insert Table" onclick="insertTable()">Table</button>

    <!-- Color Picker -->
    <input type="color" title="Text Color" onchange="execCmd('foreColor', this.value)" />
    <input type="color" title="Background Color (Highlight)" onchange="execCmd('hiliteColor', this.value)" />

    <!-- Alignment -->
    <button title="Align Left" onclick="execCmd('justifyLeft')">Left</button>
    <button title="Align Center" onclick="execCmd('justifyCenter')">Center</button>
    <button title="Align Top" onclick="alignTop()">Top</button>

    <!-- Emoji -->
    <button title="Insert Emoji" onclick="insertEmoji()">😊</button>

    <!-- Link -->
    <button title="Insert Link" onclick="insertLink()">Link</button>

    <!-- Save -->
    <button class="save-button" title="Save Content Below" onclick="saveContent()">💾 Save</button>
  </div>

  <div id="editor" contenteditable="true" spellcheck="true" ondrop="handleDrop(event)"></div>

  <div id="savedContent">
    <strong>Saved Content:</strong>
    <div id="output"></div>
  </div>

`;

function execCmd(cmd, val = null) {
  document.execCommand(cmd, false, val);
}

function copyText() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  navigator.clipboard.writeText(range.toString()).then(() => {
    alert("Copied to clipboard!");
  });
}

function pasteText() {
  navigator.clipboard.readText().then(text => {
    execCmd('insertText', text);
  });
}

function insertTable() {
  const rows = parseInt(prompt("Enter number of rows", 2));
  const cols = parseInt(prompt("Enter number of columns", 2));
  if (rows && cols) {
    let table = "<table border='1' style='border-collapse: collapse;'>";
    for (let i = 0; i < rows; i++) {
      table += "<tr>";
      for (let j = 0; j < cols; j++) {
        table += "<td>&nbsp;</td>";
      }
      table += "</tr>";
    }
    table += "</table>";
    execCmd('insertHTML', table);
  }
}

function alignTop() {
  document.getElementById("editor").style.verticalAlign = "top";
}

function insertEmoji() {
  const emoji = prompt("Enter an emoji to insert 😊🔥🚀👇");
  if (emoji) execCmd('insertText', emoji);
}

function insertLink() {
  const url = prompt("Enter URL (https:// or /internal/path)");
  if (url) {
    const selection = window.getSelection();
    const text = selection.toString() || url;
    const newTab = confirm("Open in new tab?");
    const anchor = `<a href="${url}" ${newTab ? 'target="_blank"' : ''}>${text}</a>`;
    execCmd('insertHTML', anchor);
  }
}

function saveContent() {
  const content = document.getElementById("editor").innerHTML;
  document.getElementById("output").innerHTML = content;
  alert("Content saved!");
}

function handleDrop(e) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(event) {
      execCmd('insertImage', event.target.result);
    };
    reader.readAsDataURL(files[0]);
  }
}

document.getElementById("editor").addEventListener("dragover", (e) => e.preventDefault());
}