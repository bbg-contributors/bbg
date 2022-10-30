module.exports = function () {
  document.getElementById("container").innerHTML += getUiFileContent("page_manager_titleui.html");

  document.getElementById("edit_page_meta_dialog_footer").innerHTML = getUiFileContent("edit_page_meta_dialog_footer.html");

  for (let i = 0; i < blog["页面列表"].length; i++) {
    document.getElementById("container").innerHTML += `
      <div class="page-item">
      <h2>${blog["页面列表"][i]["页面标题"]}</h2>
      <p id="if_view_in_menu_${i}"  class="page-item-sub"></p>
      <p>
      <button class="btn btn-outline-primary" onclick="edit_page('${blog["页面列表"][i]["文件名"]}')"><i class="fa fa-edit"></i> ${langdata.EDIT_PAGE_CONTENT[lang_name]}</button>
      <button class="btn btn-outline-primary" onclick="edit_page_meta(${i})"><i class="fa fa-cogs"></i> ${langdata.EDIT_PAGE_META[lang_name]}</button>
      <button class="btn btn-outline-danger" onclick="delete_page(${i})"><i class="fa fa-trash-o"></i> ${langdata.DELETE_PAGE[lang_name]}</button>
      </p>
  
      </div>
      
      `;

    if (blog["页面列表"][i]["是否显示在菜单中"] === true)
      document.getElementById(`if_view_in_menu_${i}`).innerHTML = `<i class="fa fa-cogs"></i> ${langdata.PAGE_VIEWNAME[lang_name]}<b>${blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"]}</b>`;
    else
      document.getElementById(`if_view_in_menu_${i}`).innerHTML = "<i class=\"fa fa-cogs\"></i> 此页面不显示在菜单中";
  }

  document.getElementById("nav_to_page_manager").classList.add("active");
};
