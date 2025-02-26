const { existsSync, appendFileSync, mkdirSync, writeFileSync } = require("fs");
const xssStrict = require("xss");
const doNothing = require("./doNothing.js");
const randomString = require("./randomString.js"); // Import the randomString module

module.exports = function (i) {
  const meta_page_title = document.getElementById("meta_page_title").value;
  const meta_page_title_menu = document.getElementById("meta_page_title_menu").value;
  const meta_page_isviewinmenu = document.getElementById("meta_page_isviewinmenu").checked;
  const meta_page_iscommentenabled = document.getElementById("meta_page_iscommentenabled").checked;
  const meta_page_openinnewtab = document.getElementById("meta_page_openinnewtab").checked;

  if (i === -1) {
    // Create a new page
    //const filename = `page_${Date.now()}.md`; //original line
    const filename = `${randomString(16)}.md`; // Generate a unique filename using randomString
    const newPage = {
      "页面标题": meta_page_title,
      "是否显示在菜单中": meta_page_isviewinmenu,
      "若显示在菜单中，则在菜单中显示为": meta_page_title_menu,
      "启用评论": meta_page_iscommentenabled,
      "是否在新标签页打开": meta_page_openinnewtab,
      "文件名": filename, 
      "内容": ""
    };
    blog["页面列表"].unshift(newPage);

    // Create the actual file
    try {
      writeFileSync(`${rootDir}/data/pages/${filename}`, ""); 
    } catch (err) {
      console.error("Error creating page file:", err);
      toast_creator("error", "Error creating page file.");
      return;
    }

  } else {
    // Edit an existing page
    blog["页面列表"][i]["页面标题"] = meta_page_title;
    blog["页面列表"][i]["是否显示在菜单中"] = meta_page_isviewinmenu;
    blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"] = meta_page_title_menu;
    blog["页面列表"][i]["启用评论"] = meta_page_iscommentenabled;
    blog["页面列表"][i]["是否在新标签页打开"] = meta_page_openinnewtab;
  }

  BlogInstance.writeBlogData();

  sitemap_hook();

  document.getElementById("container").innerHTML = "";
  render_page_manager();

  toast_creator("success", "changes have been saved!");
};
