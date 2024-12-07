
const dialog = require("@electron/remote").dialog;
const shell = require("@electron/remote").shell;

module.exports = function (filename) {
  window.open(`./markdown_editor.html?rootdir=${rootDir}&path=/data/pages/${filename}`);
};
