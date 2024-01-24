
const fs = require("fs");
const os = require("os");
const path = require("path");
const { copyFileSync, constants, readFileSync, existsSync } = require("fs");
const dialog = require("@electron/remote").dialog;
const shell = require("@electron/remote").shell;
const AppPath = require("@electron/remote").app.getPath("userData");
const storage = require("electron-json-storage");
const { ipcRenderer } = require("electron");

const doNothing = require("./doNothing.js");

const langdata = require("./LangData.js");

storage.setDataPath(AppPath);

const loadUniStyle = require("./loadUniStyle.js");

const getAppInfo = require("./getAppInfo.js");
const AppInfo = getAppInfo();
const currentProgramVersion = require("./currentProgramVersion.js");
const check_update = require("./check_update.js");

const BlogData = require("./BlogData.js");

const create_new_site_dialog = new bootstrap.Modal(document.getElementById("create-new-site-dialog"));
const err_dialog = new bootstrap.Modal(document.getElementById("err-dialog"));
const info_dialog = new bootstrap.Modal(document.getElementById("info-dialog"));
const language_dialog = new bootstrap.Modal(document.getElementById("language-dialog"), {
  backdrop: "static",
  keyboard: false,
});
const stylesheet_dialog = new bootstrap.Modal(document.getElementById("stylesheet-dialog"), {
  keyboard: false,
});

const ai_assisted_writing_dialog = new bootstrap.Modal(document.getElementById("ai_assisted_writing-dialog"));

function create_new_site_dialog_show() {
  create_new_site_dialog.show();
}

function create_new_site_dialog_hide() {
  create_new_site_dialog.hide();
}

function createErrDialog(title, content) {
  err_dialog.show();
  document.getElementById("err-dialog-title").innerHTML = title;
  document.getElementById("err-dialog-content").innerHTML = content;
}

function createInfoDialog(title, content) {
  info_dialog.show();
  document.getElementById("info-dialog-title").innerHTML = title;
  document.getElementById("info-dialog-content").innerHTML = content;
}

function create_new_site_choose_root_dir() {
  const rootDir = dialog.showOpenDialogSync({
    properties: ["openDirectory"],
  });
  if (rootDir !== undefined) {
    generateNewBlog(rootDir[0]);
  } else {
    // 用户放鸽子的情况
  }
}

function open_site() {
  const rootDir = dialog.showOpenDialogSync({
    properties: ["openDirectory"],
  });
  if (rootDir !== undefined)

    manageSiteByRootDir(rootDir);
}

function generateNewBlog(rootDir) {
  try {
    fs.mkdirSync(path.join(rootDir, "data"));
    fs.mkdirSync(path.join(rootDir, "data/articles"));
    fs.mkdirSync(path.join(rootDir, "data/pages"));

    copyFileSync(path.join(__dirname, "default_theme_src/index.html"), path.join(rootDir, "index.html"), constants.COPYFILE_EXCL);

    if (lang_name !== "简体中文" && lang_name !== "日本語") {
      // languages other than zh_CN and ja_JP
      copyFileSync(path.join(__dirname, "blog_source/data/articles/first.english.md"), path.join(rootDir, "data/articles/first.md"), constants.COPYFILE_EXCL);

      copyFileSync(path.join(__dirname, "blog_indexjson_template/index.english.json"), path.join(rootDir, "data/index.json"), constants.COPYFILE_EXCL);
      copyFileSync(path.join(__dirname, "blog_source/data/pages/about.english.md"), path.join(rootDir, "data/pages/about.md"), constants.COPYFILE_EXCL);
    }

    if (lang_name === "简体中文") {
      // zh_CN
      copyFileSync(path.join(__dirname, "/blog_source/data/articles/first.zhcn.md"), path.join(rootDir, "/data/articles/first.md"), constants.COPYFILE_EXCL);

      copyFileSync(path.join(__dirname, "/blog_indexjson_template/index.zhcn.json"), path.join(rootDir, "/data/index.json"), constants.COPYFILE_EXCL);
      copyFileSync(path.join(__dirname, "/blog_source/data/pages/about.zhcn.md"), path.join(rootDir, "/data/pages/about.md"), constants.COPYFILE_EXCL);
    }

    if (lang_name === "日本語") {
      // ja_JP
      copyFileSync(path.join(__dirname, "/blog_source/data/articles/first.japanese.md"), path.join(rootDir, "/data/articles/first.md"), constants.COPYFILE_EXCL);

      copyFileSync(path.join(__dirname, "/blog_indexjson_template/index.japanese.json"), path.join(rootDir, "/data/index.json"), constants.COPYFILE_EXCL);
      copyFileSync(path.join(__dirname, "/blog_source/data/pages/about.japanese.md"), path.join(rootDir, "/data/pages/about.md"), constants.COPYFILE_EXCL);
    }

    const BlogInstance = new BlogData(rootDir);

    blog = BlogInstance.getBlogData();

    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] = currentProgramVersion;

    BlogInstance.writeBlogData();

    dialog.showMessageBox({message: langdata["ALERT_SUCCESSFUL_INIT"][lang_name]});

    window.location.href = `./blog_settings.html?rootdir=${rootDir}`;
  } catch (error) {
    create_new_site_dialog_hide();
    console.error(error);
    createErrDialog("博客站点初始化错误（ERR_CANNOT_INIT）", `未能正确的初始化博客站点。<br />请确保你选择的文件夹是一个空目录，并且你有足够的访问权限，否则可能无法正常初始化。<br />已中止初始化操作，没有任何已有文件被覆盖。<br />以下是错误日志，请将此信息报告给开发者：<br /><br />${error}`);
  }
}

function manageSiteByRootDir(rootDir) {
  try {
    JSON.parse(readFileSync(`${rootDir}/data/index.json`, "utf8"));
    window.location.href = `./article_manager.html?rootdir=${rootDir}`;
  } catch (error) {
    createErrDialog("此站点不是有效的博客站点（ERR_CANNOT_PARSE_DATA）", `博客数据文件解析失败。<br />请确保你打开了正确的博客根目录，并且博客数据文件没有损坏。<br />以下是错误日志，请将此信息报告给开发者：<br /><br />${error}`);
  }
}

function displayContributers() {
  shell.openExternal("https://github.com/orgs/bbg-contributors/people");
}

function openGroupDialog() {
  createInfoDialog(langdata.JOIN_OUR_GROUP[lang_name], `
    
    <a onclick="shell.openExternal('https://qm.qq.com/cgi-bin/qm/qr?k=b0Q0ZdEnioDMxsOmhlpP_928Eq-rJsft&authKey=yiB+kzW4OP/TluIlnlJQzNxcuCjJCB+hqCWXYUVrKTaUdCkImrrCnbLMtK8Q/xc5&noverify=0')" href="">${langdata.QQ_GROUP_NUMBER[lang_name]}</a>
    <p>${langdata.QQ_GROUP_DESCRIPTION[lang_name]}</p>
    `);
}

function openAiAssistedWritingConfigDialog(){

}

function save_ai_api_settings(){
  
}

function render_language_selections() {
  document.getElementById("language-selection-list").innerHTML = "";
  for (let i = 0; i < lang_meta["名称与文件名之间的映射关系"].length; i++) {
    document.getElementById("language-selection-list").insertAdjacentHTML("beforeend",`<p>
    <a href="#" onclick="select_language('${lang_meta["名称与文件名之间的映射关系"][i]["name"]}')">${lang_meta["名称与文件名之间的映射关系"][i]["name"]}</a>
  </p>`);
  }
}

function learn_more_about_version(type){
  const learn_more_about_version_dialog = new bootstrap.Modal(document.getElementById("learn_more_about_version-dialog"));
  document.getElementById("learn_more_about_version-dialog-content").innerHTML = langdata[`${type}_VERSION_INFO`][lang_name];
  learn_more_about_version_dialog.show();
}

render_language_selections();

storage.has("language", (error, hasKey) => {
  if (error) console.error(error);
  if (hasKey) {
    storage.get("language", (error, data) => {
      if (error) console.error(error);
      storage.has("stylesheet", (error, hasKey) => {
        if (error) console.error(error);
        if (hasKey) {
          storage.get("stylesheet", (error, data) => {
            if (error) console.error(error);
            loadUniStyle();
          });
        } else {
          storage.set("stylesheet", { file: "default.css" }, (err) => {
            if (err) console.error(err);
            window.location.reload();
          });
        }
      });
      storage.has("ai_api_enabled", (error, hasKey) => {
        if (error) {
          console.error(error);
        }
        if (hasKey === false) {
          storage.set("ai_api_enabled", {
            enabled: false
          });
        }
      });

      storage.has("ai_api_type", (error, hasKey) => {
        if (error) {
          console.error(error);
        }
        if (hasKey === false) {
          storage.set("ai_api_type", {
            type: "none"
          });
        }
      });

      storage.has("builtin_ime_status", (error, hasKey) => {
        if (error) {
          console.error(error);
        }
        if (hasKey === false) {
          storage.set("builtin_ime_status", {
            enabled: "auto",
            ime: "auto"
          });
        }
      });

      lang_name = data.name;
      document.getElementById("info-dialog-ok").innerHTML = `<i class="fa fa-check" aria-hidden="true"></i> ${langdata.OK[lang_name]}`;
      document.getElementById("create-new-site-dialog-title").innerHTML = langdata.CREATE_NEW_SITE[lang_name];

      document.getElementById("create-new-site-dialog-content").innerHTML = `
           
           <p>${langdata.CREATE_NEW_SITE_DESCRIPTION[0][lang_name]}</p>
           <p><b>${langdata.CREATE_NEW_SITE_DESCRIPTION[1][lang_name]}</b></p>
           <button type="button" class="btn btn-outline-success"
             onclick="create_new_site_choose_root_dir();">${langdata.SELECT_SITE_ROOT_DIRECTORY[lang_name]}</button>
           
           `;

      document.getElementById("create-new-site-dialog-footer").innerHTML = `
           
           <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">${langdata.CANCEL[lang_name]}</button>
           `;

      document.getElementsByTagName("title")[0].innerHTML = `${langdata.STARTPAGE_TITLE[lang_name]}`;

      document.getElementById("interface_firstpart").innerHTML = `
           <h1>${langdata.STARTPAGE_TITLE[lang_name]}</h1><br />
           <br />
          <a class="btn btn-outline-primary" id="open_site_btn" onclick="open_site()"><span style="font-size: 33px"><i class="fa fa-folder-open-o"></i></span> <br />${langdata.OPEN_EXISTING_SITE[lang_name]}</a>
          <a class="btn btn-outline-primary" id="create_site_btn" onclick="create_new_site_dialog_show()"><span style="font-size: 33px"><i class="fa fa-plus"></i></span><br /> ${langdata.CREATE_NEW_SITE[lang_name]}</a>
          <div class="btn-group" role="group">
          <a class="btn btn-outline-primary dropdown-toggle"  data-bs-toggle="dropdown" id="recent_open_btn" onclick=""><span style="font-size: 33px"><i class="fa fa-clock-o"></i></span><br /> ${langdata.RECENT_OPEN[lang_name]}</a>
          <ul class="dropdown-menu">
          <li><a class="dropdown-item" id="last_managed_site"></a></li>
          </ul>
          
          </div>
          <div class="btn-group" role="group">
          <a class="btn btn-outline-primary  dropdown-toggle" id="application_settings_btn" onclick="" data-bs-toggle="dropdown" aria-expanded="false"><span style="font-size: 33px"><i class="fa fa-cog"></i></span><br /> ${langdata.APPLICATION_SETTINGS[lang_name]}</a>
          <ul class="dropdown-menu">
      <li><a class="dropdown-item" onclick="language_dialog.show();"><i class="fa fa-flag" aria-hidden="true"></i> Language Settings / 语言设定</a></li>
      <li><a class="dropdown-item" onclick="openStylesheetDialog()"><i class="fa fa-paint-brush" aria-hidden="true"></i> ${langdata.APPLICATION_STYLE_SETTING[lang_name]}</a></li>
      <li><a class="dropdown-item" onclick="displayContributers()"><i class="fa fa-users" aria-hidden="true"></i> ${langdata.DISPLAY_CONTRIBUTORS[lang_name]}</a></li>
      <li><a class="dropdown-item" onclick="check_update()"><i class="fa fa-refresh" aria-hidden="true"></i> ${langdata.CHECK_UPDATE[lang_name]}</a></li>

      </ul>

          </div>
          <br /><br /><br /><br />
           `;

      document.getElementById("bbg_settings").innerHTML = `
        <div id="check_update_interface">
        ${langdata.SOFTWARE_VERSION[lang_name]}<b><span id="current_program_version"></span></b> <br />
        </div>
        <div id="current_program_version_additional_info">

        </div>
        <br />
        <span>${langdata.UNLICENSED[lang_name]}</span><br />
        <br />
       


        <br />
        
            
            `;

      document.getElementById("current_program_version").innerHTML = `${currentProgramVersion}`;

      storage.has("last_managed_site", (error, hasKey) => {
        if (error) console.error(error);
        if (hasKey) {
          storage.get("last_managed_site", (error, data) => {
            if (error) console.error(error);
            document.getElementById("last_managed_site").innerHTML = `${data.title} (${data.rootdir})`;
            document.getElementById("last_managed_site").setAttribute("onclick", `manageSiteByRootDir('${data.rootdir.replace(/\\/g, "/")}')`);
          });
        } else {
          document.getElementById("last_managed_site").innerText = `(${langdata["NONE"][lang_name]})`;
        }
      });

      if (existsSync(`${__dirname}/is_aur_build`)){
        document.getElementById("current_program_version_additional_info").innerHTML = `<br />
        <button class="btn btn-outline-primary" onclick="learn_more_about_version('AUR')"><i class="fa fa-info-circle"></i> ${langdata["LEARN_ABOUT_AUR_VERSION"][lang_name]}</button>
        `;
      } else if(existsSync(`${__dirname}/is_released_version`) === false){
        document.getElementById("current_program_version").innerHTML = `${langdata.UNRELEASED_VERSION[lang_name]}  <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="(base_version = ${currentProgramVersion})">
        <i class="fa fa-info-circle" style="color:grey"></i>
      </span>
      `;
        const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
      }
    });
  } else {
    language_dialog.show();
  }
});

function select_language(language_name) {
  storage.set("language", { name: language_name }, (err) => {
    if (err) console.error(err);
    ipcRenderer.send("render_menu_again");
    window.location.reload();
  });
}

function changeStylesheet(css_filename) {
  storage.set("stylesheet", { file: css_filename }, (err) => {
    if (err) console.error(err);
    window.location.reload();
  });
}

function openStylesheetDialog() {
  stylesheet_dialog.show();
  document.getElementById("stylesheet-dialog-content").innerHTML = `
    <div class="container-fluid">
    <h3>${langdata["APPLICATION_STYLE_SETTING"][lang_name]}</h3>
    <br />
      <div class="row">
      <div class="col" id="stylesheet_list">
      </div>
      </div>
    </div>
    `;

  let stylesheet_list = JSON.parse(readFileSync(`${__dirname}/stylesheets/meta.json`,"utf-8"));
    
  for(let i=0;i<stylesheet_list.length;i++){
    document.getElementById("stylesheet_list").insertAdjacentHTML("beforeend",`
      <p><a href="javascript:void(0)" onclick="changeStylesheet('${stylesheet_list[i]["filename"]}')">${stylesheet_list[i]["display_name"]}</a></p>
      `);
  }
}

ipcRenderer.on("openExistingSite", ()=>{
  open_site();
});

ipcRenderer.on("createNewSite", ()=>{
  create_new_site_dialog_show();
});