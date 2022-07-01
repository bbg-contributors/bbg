
const shell = require("@electron/remote").shell;

function exitThisSite () {
  window.location.href = "./start.html";
}

function preview_site () {
  window.location.href = `./server.html?rootdir=${rootDir}`;
}

function open_blog_dir () {
  if (process.platform === "win32") { // fix windows error in '/'
    shell.openPath(rootDir.replaceAll("/", "\\"));
  } else {
    shell.openPath(rootDir);
  }
}

module.exports.exitThisSite = exitThisSite;
module.exports.preview_site = preview_site;
module.exports.open_blog_dir = open_blog_dir;
