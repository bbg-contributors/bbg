// const path = require("path");
// const app = require("@electron/remote").app;
const os = require("os");
const currentProgramVersion = require("./currentProgramVersion.js").toString();
const download_update = require("./download_update.js");

progress_modal = new bootstrap.Modal(document.getElementById("update-progress-dialog"), {
  backdrop: "static",
  keyboard: false,
});

module.exports = function () {
  fetch("https://api.github.com/repos/bbg-contributors/bbg/releases/latest")
    .then(response => response.json())
    .then((data) => {
      if (parseInt(currentProgramVersion) < parseInt(data.tag_name)) {
        if (
          window.confirm(`检测到新版本 ${data.tag_name}，要下载并安装更新吗？`)
        ) {
          for (let i = 0; i < data.assets.length; i++) {
            if (data.assets[i].name !== undefined && data.assets[i].name !== null) {
              if (data.assets[i].name.includes("win32")) {
                windows_updateInfo = [
                  data.assets[i].browser_download_url,
                  data.assets[i].name,
                ];
              }

              if (data.assets[i].name.includes("linux")) {
                linux_updateInfo = [
                  data.assets[i].browser_download_url,
                  data.assets[i].name,
                ];
              }

              if (data.assets[i].name.includes("darwin")) {
                darwin_updateInfo = [
                  data.assets[i].browser_download_url,
                  data.assets[i].name,
                ];
              }
            }
          }

          if (os.platform() === "win32") {
            download_url = windows_updateInfo[0];
            download_filename = windows_updateInfo[1];
            download_update();
          }

          if (os.platform() === "linux") {
            download_url = linux_updateInfo[0];
            download_filename = linux_updateInfo[1];
            download_update();
          }

          if (os.platform() === "darwin") {
            download_url = darwin_updateInfo[0];
            download_filename = darwin_updateInfo[1];
            download_update();
          }

          if (os.platform() !== "win32" && os.platform() !== "linux" && os.platform() !== "darwin")
            window.alert("你使用的是不受支持的操作系统。请自行前往 https://github.com/bbg-contributors/bbg 编译安装新版本。");
        }
      } else {
        window.alert(`${langdata.CURRENTLY_USING_LATEST_VERSION_ALREADY[lang_name]}`);
      }
    })
    .catch((err) => {
      window.alert(`检查更新失败：${err}`);
    });
};
