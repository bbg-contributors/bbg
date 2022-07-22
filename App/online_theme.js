const fs = require("fs");
const currentProgramVersion = require("./currentProgramVersion.js");
const request = require("request");

function install_theme(theme_id) {

  downloadCompleted = false;

  if(fs.existsSync(rootDir+"/temp_theme_downloaded_by_bbg_online_theme_store.zip")){
    fs.rmSync(rootDir+"/temp_theme_downloaded_by_bbg_online_theme_store.zip");
  }


  window.alert("下载已开始，请稍等。你现在可以关闭这个对话框了，但先不要退出博客设置界面。");

  let req = request({
    method: "GET",
    uri: theme_list[theme_id]["download_url"],
  });
  let out = fs.createWriteStream(rootDir + "/temp_theme_downloaded_by_bbg_online_theme_store.zip");
  req.pipe(out);

  req.on("end", () => {
    // 这个回调函数执行时request还没有退出和保存下载的文件，现在如果读取下载的主题文件，那么读取到的仍然是不完整的文件
    // 当这个回调函数完成后，request才会退出并保存下载的主题文件
    downloadCompleted = true;
  });

  setInterval(()=>{
    // 上面的回调函数执行完成后主题文件已经正确完整的保存，可以开始安装主题了
    // 使用 downloadCompleted 变量判断上面的回调函数是否执行完成
    if(downloadCompleted){
      apply_thirdparty_theme_v2_core(rootDir + "/temp_theme_downloaded_by_bbg_online_theme_store.zip",false,theme_list[theme_id]["name"],theme_list[theme_id]["last_tested_on_bbg_version"]);
    }
  },2000);

}

function render_theme_detail(theme_id) {
  document.getElementById("download_online_theme_dialog_content").innerHTML =
    "";

  document.getElementById("download_online_theme_dialog_content").innerHTML += `
  <button class="fluentbtn" onclick="render_online_theme_list();"><i class="fa fa-arrow-left"></i> 返回主题列表</button><br /><br />
  <h4> ${theme_list[theme_id]["name"]} 的主题信息</h4>
  <p><i class="fa fa-user-o"></i> 主题作者：<a href="javascript:void(0)" onclick="shell.openExternal('${theme_list[theme_id]["author_url"]}')">${theme_list[theme_id]["author"]}</a></p>
  <p>${theme_list[theme_id]["intro"]}</p>
  <hr />
  <p><i class="fa fa-copyright"></i> 此主题使用许可证：${theme_list[theme_id]["license"]}</p>
  <div id="more_info_of_theme_detail">
  </div>
  <hr />
  <button class="fluentbtn fluentbtn-blue" onclick="install_theme(${theme_id})"><i class="fa fa-download"></i> 安装该主题</button>
  <button class="fluentbtn" onclick="render_online_theme_list();">返回主题列表</button><br /><br />

  `;

  if (
    theme_list[theme_id]["compatible_with_newer_bbg_version"] &&
    currentProgramVersion >= theme_list[theme_id]["last_tested_on_bbg_version"]
  ) {
    document.getElementById("more_info_of_theme_detail").innerHTML += `
    
    <p><i class="fa fa-check"></i> 此主题的作者认为该版本的主题与你所使用的 BBG 版本相适配。</p>
    `;
  } else if (
    theme_list[theme_id]["compatible_with_older_bbg_version"] &&
    currentProgramVersion <= theme_list[theme_id]["last_tested_on_bbg_version"]
  ) {
    document.getElementById("more_info_of_theme_detail").innerHTML += `
    
    <p><i class="fa fa-check"></i> 此主题的作者认为该版本的主题与你所使用的 BBG 版本相适配。</p>
    `;
  } else {
    document.getElementById("more_info_of_theme_detail").innerHTML += `
    
    <p><i class="fa fa-error"></i> 此主题的作者认为该版本的主题与你所使用的 BBG 版本不兼容。当然，你可以尝试安装该主题，但是如果遇到问题，请换用一个兼容的主题或者重置回官方主题。</p>
    `;
  }
}

function render_online_theme_list() {
  document.getElementById("download_online_theme_dialog_content").innerHTML =
    "";
  // todo

  document.getElementById("download_online_theme_dialog_content").innerHTML +=
    "<h2>主题列表</h2><p>以下列出了主题商店中的主题。</p><hr />";

  fetch("https://bbg-themes.nekomoe.xyz/index.json")
    .then((response) => response.json())
    .then((data) => {
      theme_list = data["theme_list"];

      for (let i = 0; i < theme_list.length; i++) {
        document.getElementById(
          "download_online_theme_dialog_content"
        ).innerHTML += `
        <a href="javascript:void(0)" onclick="render_theme_detail(${i})"><h5 id="theme_list_id_${i}">${theme_list[i]["name"]}</h5></a>
        <p><i class="fa fa-user-o"></i> 主题作者：<a href="javascript:void(0)" onclick="shell.openExternal('${theme_list[i]["author_url"]}')">${theme_list[i]["author"]}</a></p>
        <p>${theme_list[i]["intro"]}</p>

        <hr />

        `;
        if(theme_list[i]["is_example_theme"]){
          document.getElementById(`theme_list_id_${i}`).innerHTML += ` <span style="font-size:12px" class="badge bg-danger">此主题仅用于功能测试，不建议使用</span>`;
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
