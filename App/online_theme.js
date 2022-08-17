const fs = require("fs");
const currentProgramVersion = require("./currentProgramVersion.js");
const request = require("request");

function install_theme(theme_id) {

  downloadCompleted = false;

  document.getElementById("root").innerHTML+=` 
  <div class="fluentinterface fixed-top" style="width:30%;left:20px;z-index:9999;">
  <h5><i class="fa fa-fownload"></i> 正在下载主题（已完成<span id="download_theme_progress_percentage">0</span> %）</h5>
    <div class="progress" style="height:10px">
    
      <div class="progress-bar bg-success" role="progressbar" style="width: 0%;height:50px;" id="download_theme_progress_width"></div>
    </div>
  </div>`;

  if(fs.existsSync(rootDir+"/temp_theme_downloaded_by_bbg_online_theme_store.zip")){
    fs.rmSync(rootDir+"/temp_theme_downloaded_by_bbg_online_theme_store.zip");
  }


  window.alert(`${langdata.ALERT_3RD_THEME_DOWNLOAD_STARTED[lang_name]}`);

  let req = request({
    method: "GET",
    uri: theme_list[theme_id]["download_url"],
  });
  let out = fs.createWriteStream(rootDir + "/temp_theme_downloaded_by_bbg_online_theme_store.zip");
  req.pipe(out);

  req.on("response", (data) => {
    tot = parseInt(data.headers["content-length"]);
  });

  let rec=0;

  req.on("data", (chunk) => {
    rec += chunk.length;
    document.getElementById("download_theme_progress_width").setAttribute("style", `width:${(rec / tot) * 100}%`);
    document.getElementById("download_theme_progress_percentage").innerHTML = (rec / tot) * 100;
  });

  req.on("end", () => {
    // 这个回调函数执行时request还没有退出和保存下载的文件，现在如果读取下载的主题文件，那么读取到的仍然是不完整的文件
    // 当这个回调函数完成后，request才会退出并保存下载的主题文件
    downloadCompleted = true;
  });

  setInterval(()=>{
    // 上面的回调函数执行完成后主题文件已经正确完整的保存，可以开始安装主题了
    // 使用 downloadCompleted 变量判断上面的回调函数是否执行完成
    if(downloadCompleted){
      apply_thirdparty_theme_v2_core(rootDir + "/temp_theme_downloaded_by_bbg_online_theme_store.zip",false,theme_list[theme_id]["name"],theme_list[theme_id]["last_update_date"]);
    }
  },2000);

}

function render_theme_detail(theme_id) {
  document.getElementById("download_online_theme_dialog_content").innerHTML =
    "";

  document.getElementById("download_online_theme_dialog_content").innerHTML += `
  <button class="fluentbtn" onclick="render_online_theme_list();"><i class="fa fa-arrow-left"></i> 返回主题列表</button><br /><br />
  <h4> ${theme_list[theme_id]["name"]} ${langdata.THEME_INFO_OF[lang_name]}</h4>
  <p><i class="fa fa-user-o"></i> ${langdata.THEME_AUTHOR[lang_name]}<a href="javascript:void(0)" onclick="shell.openExternal('${theme_list[theme_id]["author_url"]}')">${theme_list[theme_id]["author"]}</a></p>
  <p>${theme_list[theme_id]["intro"]}</p>
  <hr />
  <p><i class="fa fa-copyright"></i> ${langdata.THEME_IS_USING_LICENSE[lang_name]}${theme_list[theme_id]["license"]}</p>
  <div id="more_info_of_theme_detail">
  </div>
  <hr />
  <button class="fluentbtn fluentbtn-blue" onclick="install_theme(${theme_id})"><i class="fa fa-download"></i> ${langdata.INSTALL_THIS_THEME[lang_name]}</button>
  <button class="fluentbtn" onclick="render_online_theme_list();">${langdata.BACK_TO_THEME_LIST[lang_name]}</button><br /><br />

  `;

  if (
    theme_list[theme_id]["compatible_with_newer_bbg_version"] &&
    currentProgramVersion >= theme_list[theme_id]["last_tested_on_bbg_version"]
  ) {
    document.getElementById("more_info_of_theme_detail").innerHTML += `
    
    <p><i class="fa fa-check"></i> ${langdata.THEME_AUTHOR_THINKS_COMPATIBLE[lang_name]}</p>
    `;
  } else if (
    theme_list[theme_id]["compatible_with_older_bbg_version"] &&
    currentProgramVersion <= theme_list[theme_id]["last_tested_on_bbg_version"]
  ) {
    document.getElementById("more_info_of_theme_detail").innerHTML += `
    
    <p><i class="fa fa-check"></i> ${langdata.THEME_AUTHOR_THINKS_COMPATIBLE[lang_name]}</p>
    `;
  } else if(currentProgramVersion === theme_list[theme_id]["last_tested_on_bbg_version"]){
    document.getElementById("more_info_of_theme_detail").innerHTML += `
    
    <p><i class="fa fa-check"></i> ${langdata.THEME_AUTHOR_THINKS_COMPATIBLE[lang_name]}</p>
    `;

  } else{
    document.getElementById("more_info_of_theme_detail").innerHTML += `
    
    <p><i class="fa fa-times"></i> ${langdata.THEME_AUTHOR_THINKS_NOT_COMPATIBLE[lang_name]}</p>
    `;
  }
}

function check_thirdparty_theme_update(){
  fetch("https://bbg-themes.nekomoe.xyz/index.json")
    .then((response) => response.json())
    .then((data) => {
      theme_list = data["theme_list"];

      for(let i=0;i<data["theme_list"].length;i++){
        if(data.theme_list[i]["name"] === blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"]){
          if(data.theme_list[i]["last_update_date"] > blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"]){
            if(window.confirm(`A New Version of ${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"]} (${data.theme_list[i][last_update_date]}) is currently available, upgrade it now?`)){
              install_theme(i);
            }
          }else{
            window.alert(langdata["CURRENTLY_USING_LATEST_VERSION_ALREADY"][lang_name]);
          }
        }
      }
    });
}

function render_online_theme_list() {
  document.getElementById("download_online_theme_dialog_content").innerHTML =
    "";
  // todo

  document.getElementById("download_online_theme_dialog_content").innerHTML +=
    `<h2>${langdata.THEME_LIST[lang_name]}</h2><p>${langdata.THEME_LIST_DESCRIPTION[lang_name]}</p><hr />`;

  fetch("https://bbg-themes.nekomoe.xyz/index.json")
    .then((response) => response.json())
    .then((data) => {
      theme_list = data["theme_list"];

      for (let i = 0; i < theme_list.length; i++) {
        document.getElementById(
          "download_online_theme_dialog_content"
        ).innerHTML += `
        <a href="javascript:void(0)" onclick="render_theme_detail(${i})"><h5 id="theme_list_id_${i}">${theme_list[i]["name"]}</h5></a>
        <p><i class="fa fa-user-o"></i> ${langdata.THEME_AUTHOR[lang_name]}<a href="javascript:void(0)" onclick="shell.openExternal('${theme_list[i]["author_url"]}')">${theme_list[i]["author"]}</a></p>
        <p>${theme_list[i]["intro"]}</p>

        <hr />

        `;
        if(theme_list[i]["is_example_theme"]){
          document.getElementById(`theme_list_id_${i}`).innerHTML += " <span style=\"font-size:12px\" class=\"badge bg-danger\">此主题仅用于功能测试，不建议使用</span>";
        }
      }
    })
    .catch((err) => {
      window.alert(`网络错误：${err}`);
    });
}

function open_online_theme_dialog() {
  const online_theme_modal = new bootstrap.Modal(
    document.getElementById("download_online_theme_dialog")
  );
  online_theme_modal.toggle();
  render_online_theme_list();
}

module.exports.open_online_theme_dialog = open_online_theme_dialog;
module.exports.render_theme_detail = render_theme_detail;
module.exports.render_online_theme_list = render_online_theme_list;
module.exports.install_theme = install_theme;
module.exports.check_thirdparty_theme_update = check_thirdparty_theme_update;
