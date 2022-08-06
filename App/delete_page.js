module.exports = function (i) {

  create_confirm_dialog(`
  
  是否确认删除此页面？<b>此操作不可逆</b>
  
  `,"",`
  
  try {
    rmSync(\`${rootDir}/data/pages/${blog["页面列表"][i]["文件名"]}\`);
  } catch (error) {

  }

  blog["页面列表"].splice(${i}, 1);
  BlogInstance.writeBlogData();

  sitemap_hook();

  toast_creator("success","done");

  document.getElementById("container").innerHTML = "";
  render_page_manager();
  
  `);
};
