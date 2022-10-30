const { existsSync, readFileSync, writeFileSync } = require("fs");
function config_third_party_theme() {

  const configThemeModal = new bootstrap.Modal(document.getElementById("config_thirdparty_theme_dialog"));
  configThemeModal.toggle();
  if (existsSync(`${rootDir}/themecfg/themecfg.json`)) {
    
    document.getElementById("config_thirdparty_theme_content").innerHTML = "";
    const themecfg_json = JSON.parse(readFileSync(`${rootDir}/themecfg/themecfg.json`,"utf-8"));

    if(existsSync(`${rootDir}/themecfg/themecfg_manual.html`)){
      document.getElementById("config_thirdparty_theme_content").innerHTML += `
      <button class="btn btn-outline-primary" onclick="shell.openPath('${rootDir}/themecfg/themecfg_manual.html')"><i class="fa fa-book"></i> 此主题提供了配置文档，点击这里以查阅</button>
    `;
    }

    document.getElementById("config_thirdparty_theme_content").innerHTML += `
      <button class="btn btn-outline-primary" onclick="save_config_of_third_party_theme()"><i class="fa fa-download"></i> ${langdata.SAVE_CONFIGURATION[lang_name]}</button>
      <br /><br />
    `;

    document.getElementById("config_thirdparty_theme_content").innerHTML += `
    <textarea spellcheck="false" style="height:300px;font-family:monospace;color:blue" class="form-control" id="themecfg_rawinput">${readFileSync(`${rootDir}/themecfg/themecfg.json`,"utf-8")}</textarea>
    `;
  } else {
    document.getElementById("config_thirdparty_theme_content").innerHTML = `
            当前所使用的第三方主题不支持被配置。
        `;
  }
}


function save_config_of_third_party_theme() {
  try {
    JSON.parse(document.getElementById("themecfg_rawinput").value);
    THEME_CONFIG_VALID_JSON = true;
  } catch (error) {
    window.alert(`配置不会被保存，因为 JSON 格式错误！报错如下：\n ${error}`);
    THEME_CONFIG_VALID_JSON = false;
  }

  if(THEME_CONFIG_VALID_JSON){
    writeFileSync(`${rootDir}/themecfg/themecfg.json`,document.getElementById("themecfg_rawinput").value);
  }
}


module.exports.config_third_party_theme = config_third_party_theme;
module.exports.save_config_of_third_party_theme = save_config_of_third_party_theme;