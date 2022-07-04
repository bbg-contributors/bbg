
const fs = require("fs");
const os = require("os");
const path = require("path");
const { copyFileSync, constants, readFileSync, existsSync } = require("fs");
const dialog = require("@electron/remote").dialog;
const shell = require("@electron/remote").shell;
const AppPath = require("@electron/remote").app.getPath("userData");
const storage = require("electron-json-storage");

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

    copyFileSync(path.join(__dirname, "blog_source/index.html"), path.join(rootDir, "index.html"), constants.COPYFILE_EXCL);

    if (lang_name === "English") {
      copyFileSync(path.join(__dirname, "blog_source/data/articles/first.english.md"), path.join(rootDir, "data/articles/first.md"), constants.COPYFILE_EXCL);

      copyFileSync(path.join(__dirname, "blog_source/data/index.english.json"), path.join(rootDir, "data/index.json"), constants.COPYFILE_EXCL);
      copyFileSync(path.join(__dirname, "blog_source/data/pages/about.english.md"), path.join(rootDir, "data/pages/about.md"), constants.COPYFILE_EXCL);
    }

    if (lang_name === "简体中文") {
      copyFileSync(path.join(__dirname, "/blog_source/data/articles/first.zhcn.md"), path.join(rootDir, "/data/articles/first.md"), constants.COPYFILE_EXCL);

      copyFileSync(path.join(__dirname, "/blog_source/data/index.zhcn.json"), path.join(rootDir, "/data/index.json"), constants.COPYFILE_EXCL);
      copyFileSync(path.join(__dirname, "/blog_source/data/pages/about.zhcn.md"), path.join(rootDir, "/data/pages/about.md"), constants.COPYFILE_EXCL);
    }

    const BlogInstance = new BlogData(rootDir);

    blog = BlogInstance.getBlogData();

    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] = currentProgramVersion;

    BlogInstance.writeBlogData();

    window.alert("博客站点初始化成功！接下来将进入博客设置页。");

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
  shell.openExternal("https://github.com/bbg-contributors/bbg/graphs/contributors");
}

function openGroupDialog() {
  createInfoDialog(langdata.JOIN_OUR_GROUP[lang_name], `
    
    <p>${langdata.QQ_GROUP_NUMBER[lang_name]}</p>
    <p>${langdata.QQ_GROUP_DESCRIPTION[lang_name]}</p>
    `);
}

function openImageCopyrightDialog() {
  createInfoDialog(langdata.ABOUT_IMAGE_COPYRIGHT[lang_name], langdata.ABOUT_IMAGE_COPYRIGHT_DESCRIPTION[lang_name]);
}

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

      lang_name = data.name;
      document.getElementById("info-dialog-ok").innerHTML = `<i class="fa fa-check" aria-hidden="true"></i> ${langdata.OK[lang_name]}`;
      document.getElementById("create-new-site-dialog-title").innerHTML = langdata.CREATE_NEW_SITE[lang_name];

      document.getElementById("create-new-site-dialog-content").innerHTML = `
           
           <p>${langdata.CREATE_NEW_SITE_DESCRIPTION[0][lang_name]}</p>
           <p><b>${langdata.CREATE_NEW_SITE_DESCRIPTION[1][lang_name]}</b></p>
           <button type="button" class="fluentbtn fluentbtn-blue"
             onclick="create_new_site_choose_root_dir();">${langdata.SELECT_SITE_ROOT_DIRECTORY[lang_name]}</button>
           
           `;

      document.getElementById("create-new-site-dialog-footer").innerHTML = `
           
           <button type="button" class="fluentbtn" data-bs-dismiss="modal">${langdata.CANCEL[lang_name]}</button>
           `;

      document.getElementsByTagName("title")[0].innerHTML = `${langdata.STARTPAGE_TITLE[lang_name]}`;

      document.getElementById("interface_firstpart").innerHTML = `
           <h1>${langdata.STARTPAGE_TITLE[lang_name]}</h1><br />
           <p>${langdata.STARTPAGE_DESCRIPTION[0][lang_name]}</p>
           <p>${langdata.STARTPAGE_DESCRIPTION[1][lang_name]}</p>

           <br />
        <p>
          <a href="#" class="fluentbtn fluentbtn-blue" id="open_site_btn" onclick="open_site()"><i class="fa fa-folder-open-o"></i> ${langdata.OPEN_EXISTING_SITE[lang_name]}</a>
          <a href="#" class="fluentbtn fluentbtn-blue" id="create_site_btn" onclick="create_new_site_dialog_show()"><i class="fa fa-plus"></i> ${langdata.CREATE_NEW_SITE[lang_name]}</a>
  
        </p>
           `;

      document.getElementById("last_managed_site_link").innerHTML = `
           ${langdata.LAST_MANAGED_SITE[lang_name]}<span style="font-weight: bold;"  id="last_managed_site_title"></span>`;

      document.getElementById("bbg_settings").innerHTML = `
        <div id="check_update_interface">
        ${langdata.SOFTWARE_VERSION[lang_name]}<b><span id="current_program_version"></span></b> <br />
        </div>
        <br />
        <span>${langdata.UNLICENSED[lang_name]}</span><br />
        <br />
       


        <br />
        
            
            `;

      document.getElementById("interface_secondpart").innerHTML = `
            
            <button class="fluentbtn" onclick="language_dialog.show();"><i class="fa fa-flag" aria-hidden="true"></i> Language Settings / 语言设定</button>
            <button class="fluentbtn" onclick="openStylesheetDialog()"><i class="fa fa-paint-brush" aria-hidden="true"></i> 应用程序风格设置</button>
            <button class="fluentbtn" onclick="displayContributers()"><i class="fa fa-users" aria-hidden="true"></i> ${langdata.DISPLAY_CONTRIBUTERS[lang_name]}</button>
            <br /><br />
            <button class="fluentbtn" onclick="openGroupDialog()"><i class="fa fa-qq" aria-hidden="true"></i> ${langdata.JOIN_OUR_GROUP[lang_name]}</button>
            <button class="fluentbtn" onclick="openImageCopyrightDialog()"><i class="fa fa-copyright" aria-hidden="true"></i> ${langdata.ABOUT_IMAGE_COPYRIGHT[lang_name]}</button>
            <a href="#" class="fluentbtn" id="check_update_btn" onclick="check_update()"><i class="fa fa-refresh" aria-hidden="true"></i> ${langdata.CHECK_UPDATE[lang_name]}</a>
            `;

      document.getElementById("current_program_version").innerHTML = `${currentProgramVersion}`;

      storage.has("last_managed_site", (error, hasKey) => {
        if (error) console.error(error);
        if (hasKey) {
          storage.get("last_managed_site", (error, data) => {
            if (error) console.error(error);
            document.getElementById("last_managed_site").setAttribute("style", "display:block");
            document.getElementById("last_managed_site_title").innerHTML = data.title;
            document.getElementById("last_managed_site").setAttribute("onclick", `manageSiteByRootDir('${data.rootdir.replace(/\\/g, "/")}')`);
          });
        } else {
          
        }
      });

      if (os.platform() === "linux") {
        if (existsSync("/usr/share/bbg/bbgvertype")) {
          bbgvertype = readFileSync("/usr/share/bbg/bbgvertype", "utf8").replace("\n", "");
          switch (bbgvertype) {
          case "aur-bbg-git-misaka13514":
            document.getElementById("check_update_interface").innerHTML = `
                        <h5>版本信息</h5>
                        安装通道：AUR（bbg-git）<br />
                        打包者：Misaka13514<br />
                        内部版本号：${currentProgramVersion}<br />

                        `;
            break;
          case "aur-bbg-zzjzxq33-misaka13514":
            document.getElementById("check_update_interface").innerHTML = `
                        <h5>版本信息</h5>
                        安装通道：AUR（bbg）<br />
                        打包者：zzjzxq33 和 Misaka13514<br />
                        内部版本号：${currentProgramVersion}<br />

                        `;
            break;
          case "debpkg-mzwing":
            document.getElementById("check_update_interface").innerHTML = `
                        <h5>版本信息</h5>
                        安装通道：DEB 包<br />
                        打包者：mzwing<br />
                        内部版本号：${currentProgramVersion}<br />

                        `;
            break;
          default:
            break;
          }
        }
      }
    });
  } else {
    language_dialog.show();
  }
});

function select_language(language_name) {
  storage.set("language", { name: language_name }, (err) => {
    if (err) console.error(err);
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
      <div class="row">
      
      <div class="col">
      
      <div class="card" onclick="changeStylesheet('default.css')">
    <img src="./res/light_theme.png" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Default Blue</p>
    </div>
  </div>
      </div>
      <div class="col">
      
      <div class="card" onclick="changeStylesheet('dark.css')">
  <img src="./res/dark_theme.png" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Dark</p>
  </div>
</div>
      
      </div>
      </div>
    
    </div>
    

  
    `;
}
