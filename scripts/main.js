let htmlEditor = document.getElementById("html-code");
let cssEditor = document.getElementById("css-code");
let jsEditor = document.getElementById("js-code");
let themeButton = document.getElementById("theme-button");
let preview = document.getElementById("preview");
let logo = document.getElementById("motive-logo");
let runButton = document.getElementById("run-button");
let clearButton = document.getElementById("clear-button");
let saveStatus = document.getElementById("save-status");
let saveTimer;

function createOutput() {

    let htmlCode = htmlEditor.value;
    let cssCode = cssEditor.value;
    let jsCode = jsEditor.value;

    let output = `<!DOCTYPE html>
        <html>
        <head>
            <style>
                ${cssCode}
            </style>
        </head>
        <body>
            ${htmlCode}

            <script>
                ${jsCode}
            </script>
        </body>
        </html>`;

    return output;
}

function runCode() {

    let htmlCode = htmlEditor.value;
    let cssCode = cssEditor.value;
    let jsCode = jsEditor.value;

    console.log(htmlCode);
    console.log(cssCode);
    console.log(jsCode);

    let output = createOutput();

    preview.srcdoc = output;
}

runButton.addEventListener("click", function() {
    runCode();
});

clearButton.addEventListener("click", function() {

    let answer = confirm("Are you sure you want to clear everything?");

    if (answer) {

        htmlEditor.value = "";
        cssEditor.value = "";
        jsEditor.value = "";

        document.getElementById("html-count").textContent = "Characters: 0";
        document.getElementById("css-count").textContent = "Characters: 0";
        document.getElementById("js-count").textContent = "Characters: 0";

        preview.srcdoc = "";

        localStorage.removeItem("htmlCode");
        localStorage.removeItem("cssCode");
        localStorage.removeItem("jsCode");

        saveStatus.textContent = "Cleared";

        clearTimeout(saveTimer);
    }

});

htmlEditor.addEventListener("input", function() {

    document.getElementById("html-count").textContent =
        `Characters: ${htmlEditor.value.length}`;

    localStorage.setItem("htmlCode", htmlEditor.value);

    saveStatus.textContent = "Saving...";

    clearTimeout(saveTimer);

    saveTimer = setTimeout(function() {
        saveStatus.textContent = "✓ Saved";
    }, 500);

});

cssEditor.addEventListener("input", function() {

    document.getElementById("css-count").textContent =
        `Characters: ${cssEditor.value.length}`;

    localStorage.setItem("cssCode", cssEditor.value);

    saveStatus.textContent = "Saving...";

    clearTimeout(saveTimer);

    saveTimer = setTimeout(function() {
        saveStatus.textContent = "✓ Saved";
    }, 500);

});

jsEditor.addEventListener("input", function() {

    document.getElementById("js-count").textContent =
        `Characters: ${jsEditor.value.length}`;

    localStorage.setItem("jsCode", jsEditor.value);

    saveStatus.textContent = "Saving...";

    clearTimeout(saveTimer);

    saveTimer = setTimeout(function() {
        saveStatus.textContent = "✓ Saved";
    }, 500);

});

let editors = document.querySelectorAll(".code-editor");

editors.forEach(function(editor) {

    editor.addEventListener("keydown", function(event) {

        if (event.key === "Tab") {

            event.preventDefault();

            let start = editor.selectionStart;
            let end = editor.selectionEnd;

            editor.value =
                editor.value.substring(0, start) +
                "    " +
                editor.value.substring(end);

            editor.selectionStart = start + 4;
            editor.selectionEnd = start + 4;
        }

        if (event.key === "Enter" && event.ctrlKey) {

            event.preventDefault();

            runCode();
        }

    });

});

let savedHTML = localStorage.getItem("htmlCode") || "";
let savedCSS = localStorage.getItem("cssCode") || "";
let savedJS = localStorage.getItem("jsCode") || "";

htmlEditor.value = savedHTML;
cssEditor.value = savedCSS;
jsEditor.value = savedJS;

saveStatus.textContent = "✓ Saved";

document.getElementById("html-count").textContent =
    `Characters: ${savedHTML.length}`;

document.getElementById("css-count").textContent =
    `Characters: ${savedCSS.length}`;

document.getElementById("js-count").textContent =
    `Characters: ${savedJS.length}`;

runCode();

let downloadButton = document.getElementById("download-button");

downloadButton.addEventListener("click", function() {

    let fileName = prompt("Enter a file name:");

    if (!fileName || !fileName.trim()) {
        return;
    }

    let output = createOutput();

    let file = new Blob([output], {
        type: "text/html"
    });

    let url = URL.createObjectURL(file);

    let link = document.createElement("a");

    link.href = url;

    fileName = fileName.trim();

    if (fileName.toLowerCase().endsWith(".html")) {
        link.download = fileName;
    } else {
        link.download = `${fileName}.html`;
    }

    link.click();

    URL.revokeObjectURL(url);

});

themeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.textContent = "☀️";

        localStorage.setItem("theme", "dark");

        logo.src = "../images/darkmode.png";

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem("theme", "light");

        logo.src = "../images/lightmode.png";
    }

});

let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeButton.textContent = "☀️";

    logo.src = "../images/darkmode.png";

} else {

    themeButton.textContent = "🌙";

    logo.src = "../images/lightmode.png";
}