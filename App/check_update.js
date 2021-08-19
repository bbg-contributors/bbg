const currentProgramVersion = require("./currentProgramVersion.js").toString();

module.exports = function(){
    fetch('https://gitee.com/api/v5/repos/baiyang-lzy/bbg/releases')
  .then(response => response.json())
  .then(function(data){
    if(currentProgramVersion !== data[data.length - 1]["tag_name"]){
        window.alert(`当前版本不是最新版本。 \n \n 当前版本：${currentProgramVersion}\n 最新版本：${data[data.length - 1]["tag_name"]} \n \n 请前往 https://gitee.com/baiyang-lzy/bbg/releases 获取最新更新。`)
    }else{
        window.alert(`当前已经是最新版本！`)
    }
  })
  .catch(function(err){
      window.alert("检查更新失败："+err);
  }); 
}