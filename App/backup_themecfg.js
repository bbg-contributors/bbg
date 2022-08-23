const {mkdirSync, existsSync, copyFileSync} = require("fs");

module.exports = function(){
  if(existsSync(`${rootDir}/themecfg/themecfg.json`)){
    if(existsSync(`${rootDir}/themecfg_backup/`)){
      copyFileSync(`${rootDir}/themecfg/themecfg.json`,`${rootDir}/themecfg_backup/themecfg_${Date.parse(new Date())}.json`);
    }else{
      mkdirSync(`${rootDir}/themecfg_backup/`);
      copyFileSync(`${rootDir}/themecfg/themecfg.json`,`${rootDir}/themecfg_backup/themecfg_${Date.parse(new Date())}.json`);
    }

    window.alert("由于主题改变或更新，原有的主题配置文件已被新的主题配置文件替换，原有的主题配置文件备份在站点根目录下的themecfg_backup目录中，文件名为themecfg_<timestamp>.json如有需要请前往查阅。");
  }
};