const path = require("path");
const app = require('@electron/remote').app;
const currentProgramVersion = require("./currentProgramVersion.js").toString();
const download_update = require("./download_update.js");
const os = require("os");
	
progress_modal =  new bootstrap.Modal(document.getElementById('update-progress-dialog'));

module.exports = function () {
  fetch("https://gitee.com/api/v5/repos/baiyang-lzy/bbg/releases/latest")
    .then((response) => response.json())
    .then(function (data) {
      if (currentProgramVersion !== data["tag_name"]) {
        if (
          window.confirm(`检测到新版本 ${data["tag_name"]}，要下载并安装更新吗？`)
        ) {

          darwin_updateInfo = [
            `https://gh.api.99988866.xyz/https://github.com/scientificworld/bbg_mac_build/releases/download/${data["tag_name"]}/bbg-darwin-x64.zip`,
            "bbg-darwin-x64.zip",
          ];

          for (let i = 0; i < data.assets.length; i++) {
            if(data.assets[i]["name"] !== undefined && data.assets[i]["name"] !== null){
              if (data.assets[i]["name"].indexOf("windows") != -1) {
                windows_updateInfo = [
                  data.assets[i]["browser_download_url"],
                  data.assets[i]["name"],
                ];
              }
  
              if (data.assets[i]["name"].indexOf("linux") != -1) {
                linux_updateInfo = [
                  data.assets[i]["browser_download_url"],
                  data.assets[i]["name"],
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

          if(os.platform() !== "win32" && os.platform() !== "linux" && os.platform() !== "darwin"){
              window.alert("你使用的是不受支持的操作系统。请自行前往 https://gitee.com/baiyang-lzy/bbg 编译安装新版本。")
          }

        }
      } else {
        window.alert(`当前已经是最新版本！`);
      }
    })
    .catch(function (err) {
      window.alert("检查更新失败：" + err);
    });
    
};
