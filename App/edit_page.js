
const dialog = require("@electron/remote").dialog;
const shell = require("@electron/remote").shell;

module.exports = function (filename) {
  window.location.href=`./markdown_editor.html?rootdir=${rootDir}&path=/data/pages/${filename}`;
};
