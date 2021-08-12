module.exports = function () {

    document.getElementById("container").innerHTML += `
    
    <h2>管理页面</h2>
    <button class="btn btn-primary" onclick="add_a_page()"> 新建一张页面 </button>
    <hr />
    
    `

    for (let i = 0; i < blog["页面列表"].length; i++) {

        document.getElementById("container").innerHTML += `
      <div class="page-item">
      <h2>${blog["页面列表"][i]["页面标题"]}</h2>
      <p id="if_view_in_menu_${i}"  class="page-item-sub"></p>
      <p>
      <button class="btn btn-sm btn-primary" onclick="edit_page('${blog["页面列表"][i]["文件名"]}')">使用系统默认编辑器编辑页面内容</button>
      <button class="btn btn-sm btn-primary" onclick="edit_page_meta(${i})">页面设置</button>
      <button class="btn btn-sm btn-danger" onclick="delete_page(${i})">删除此页面</button>
      </p>
  
      </div>
      
      `

        if (blog["页面列表"][i]["是否显示在菜单中"] === true) {
            document.getElementById("if_view_in_menu_" + i).innerHTML = "此页面在菜单中显示为：<b>" + blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"] + "</b>";
        } else {
            document.getElementById("if_view_in_menu_" + i).innerHTML = "此页面不显示在菜单中";

        }
    }
}