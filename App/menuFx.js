
const shell = require("electron").remote.shell;

function exitThisSite() {
    window.location.href = "./start.html";
}

function preview_site() {
    window.location.href = `./server.html?rootdir=${rootDir}`;

}

function open_blog_dir() {
    shell.openPath(rootDir);
}

module.exports.exitThisSite = exitThisSite;
module.exports.preview_site = preview_site;
module.exports.open_blog_dir = open_blog_dir;