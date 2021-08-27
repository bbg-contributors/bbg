const path = require("path");
const { remote } = require("electron");
const app = remote.app;
const currentProgramVersion = require("./currentProgramVersion.js").toString();
const download_link = require("./download_link.js");
const download_file = require("./download_file.js")

module.exports = function(){
    fetch('https://gitee.com/api/v5/repos/baiyang-lzy/bbg/releases')
  .then(response => response.json())
  .then(function(data){
    if(currentProgramVersion !== data[data.length - 1]["tag_name"]){
        if(window.confirm(`当前版本不是最新版本。 \n \n 当前版本：${currentProgramVersion}\n 最新版本：${data[data.length - 1]["tag_name"]} \n \n 要从 ${download_link[0]} 下载更新吗？`)) {
		download_file(download_link[0], path.join(app.getPath('downloads'), download_link[1]));
	}
    }else{
        window.alert(`当前已经是最新版本！`)
    }
  })
  .catch(function(err){
      window.alert("检查更新失败："+err);
  }); 
}
