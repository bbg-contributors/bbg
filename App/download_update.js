const fs = require("fs");
const request = require("request");
const dialog = require("@electron/remote").dialog;
const win = require("@electron/remote").getCurrentWindow();
const path = require("path");
const app = require("@electron/remote").app;
const os = require("os");
const { shell } = require("electron");

module.exports = function () {
  const targetPath = path.join(app.getPath("downloads"), download_filename);

  progress_modal.show();

  let rec = 0; let tot;
  const req = request({
    method: "GET", uri: download_url,
  });
  const out = fs.createWriteStream(targetPath);
  req.pipe(out);
  req.on("response", (data) => {
    tot = parseInt(data.headers["content-length"]);
  });
  req.on("data", (chunk) => {
    rec += chunk.length;
    document.getElementById("download_progress_text").innerHTML = `${(rec / tot) * 100}%`;
    document.getElementById("update-progress-bar").setAttribute("style", `width:${(rec / tot) * 100}%;`);
    win.setProgressBar(rec / tot);
  });
  req.on("end", () => {
    if (window.confirm("下载结束，是否现在打开安装程序所在的文件夹？")) {
      shell.showItemInFolder(targetPath);
      setInterval(() => { app.exit(); }, 1000);
    }

    win.setProgressBar(-1);
  });
};
