const { dialog } = require("electron");

const currentProgramVersion = require("./currentProgramVersion.js").toString();
progress_modal = new bootstrap.Modal(document.getElementById("update-progress-dialog"), {
  backdrop: "static",
  keyboard: false,
});

module.exports = function () {
  fetch("https://api.github.com/repos/bbg-contributors/bbg/releases/latest")
    .then(response => response.json())
    .then((data) => {
      if (parseInt(currentProgramVersion) < parseInt(data.tag_name)) {
        let msgBox = dialog.showMessageBox({
          type: "info",
          buttons: ["是", "否"],
          title: "检测到新版本",
          message: `检测到新版本 ${data.tag_name}，要下载并安装更新吗？`,
        });
        if (
          msgBox === 0
        ) {
          shell.openExternal("https://bbg.nekomoe.xyz/download.html");
        }
      } else {
        window.alert(`${langdata.CURRENTLY_USING_LATEST_VERSION_ALREADY[lang_name]}`);
      }
    })
    .catch((err) => {
      window.alert(`检查更新失败：${err}`);
    });
};
