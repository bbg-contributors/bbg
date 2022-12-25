const { readFileSync,writeFileSync } = require("fs");
const { dialog } = require("@electron/remote");

module.exports = function () {
  let path = getUrlArgs("path");
  let filename = path.replaceAll("/data/articles/", "").replaceAll("/data/pages/", "");
  let title,type;
  let original_content = readFileSync(rootDir + path, "utf-8");
  var editor_status = 0;
  if (path.indexOf("/data/articles/") !== -1) {
    // article
    type = "article";
    for (let i = 0; i < blog["文章列表"].length; i++) {
      if (blog["文章列表"][i]["文件名"] === filename) {
        title = blog["文章列表"][i]["文章标题"];
      }
    }
  } else {
    // page
    type = "page";
    for (let i = 0; i < blog["页面列表"].length; i++) {
      if (blog["页面列表"][i]["文件名"] === filename) {
        title = blog["页面列表"][i]["页面标题"];
      }
    }
  }
  document.getElementById("container").innerHTML += getUiFileContent(
    "markdown_editor_title_ui.html",
  );
  document.getElementById("container").innerHTML += `
  <div id="editor-container" style="position:fixed;height:70%;width:90%">
    <div id="editor"></div>
  </div>
  `;

  document.getElementById("markdown_filename").innerHTML=`  <button id="btn_exit" class="btn btn-outline-primary">
  <i class="fa fa-arrow-left"></i>
</button>
正在编辑《${title}》`+document.getElementById("markdown_filename").innerHTML;

  var markdownEditor = new MarkdownPalettes("#editor");
  markdownEditor.content = original_content;
  // 监听markdown预览区域的变化情况
  // 如果图片的相对路径错误则进行修复
  // 如果编辑区有更改则记录
  let MutationObserver = window.MutationObserver;
  let observer = new MutationObserver(function () {
    for (let i = 0; i < document.getElementsByTagName("img").length; i++) {
      let original_src = document.getElementsByTagName("img")[i].getAttribute("src");
      if (original_src.includes(`${rootDir}/data/${type}s/`) === false) {
        // 已经修复过的相对路径
        if (original_src.includes("http://") === false && original_src.includes("https://") === false) {
          // 来自网络的图片不属于相对路径
          let src = `${rootDir}/data/${type}s/${original_src}`;
          document.getElementsByTagName("img")[i].setAttribute("src", src);
        }
      }
    }
    editor_status=1;
  });
  observer.observe(document.getElementsByClassName("mp-preview-area")[0], { characterData: true, subtree: true, childList: true });
  setTimeout(function(){
    editor_status=0;
  },500);
  document.getElementById("btn_help").onclick=function(){
    let text=`
    【什么是 Markdown】\n
    Markdown 是一个简单的标记语言，使用 BBG 创建的博客默认都使用 Markdown 作为博客文章或者页面所使用的格式。\n
    【Markdown 编辑器使用说明】\n
    这是一个简单的 Markdown 编辑器，基于 Markdown*Palettes 开发。\n
    左边是编辑区，你可以在编辑区输入 Markdown 代码。\n
    右边是预览区，你可以在预览区实时预览你所编写的 Markdown 代码经过渲染之后的效果。
    `;
    dialog.showMessageBoxSync({message: text});
  };

  const exit_markdown_editor=function(){
    if(editor_status === 0){
      window.location.href=`./article_manager.html?rootdir=${rootDir}`;
    }else if(dialog.showMessageBoxSync({buttons: ["确定","取消"],message:"确定退出吗？未保存的更改会丢失。"}) === 0){
      window.location.href=`./article_manager.html?rootdir=${rootDir}`;
    }
  };
  document.getElementById("btn_exit").onclick=exit_markdown_editor;

  const markdown_editor_save_changes=function(){
    writeFileSync(`${rootDir}/${path}`,markdownEditor.content);
    document.getElementById("btn_save_changes").innerHTML="<i class=\"fa fa-check\"></i> 已保存！";
    editor_status=0;
    setTimeout(function(){
      document.getElementById("btn_save_changes").innerHTML="<i class=\"fa fa-check\"></i> 保存更改 (Ctrl + S)";
    },1200);
  };

  document.getElementById("btn_save_changes").onclick=markdown_editor_save_changes;

  document.getElementById("btn_change_to_default_editor").onclick=function(){
    if(editor_status === 1){
      if(dialog.showMessageBoxSync({buttons: ["确定","取消"],message:"你在当前编辑环境中还有未保存的更改，确定立刻切换到系统默认的编辑器吗？\n（如果立即切换，这些更改将会丢失）"}) === 0){
        shell.openPath(`${rootDir}/${path}`);
        window.location.href=`./article_manager.html?rootdir=${rootDir}`;
      }
    }else{
      shell.openPath(`${rootDir}/${path}`);
      window.location.href=`./article_manager.html?rootdir=${rootDir}`;
    }
  };

  document.onkeydown = function(event){
    let toReturn = true;
    if(event.ctrlKey || event.metaKey){  // detect ctrl or cmd
      if(event.which == 83){
        markdown_editor_save_changes();
        toReturn = false;
      }
    }
  
    return toReturn;
  };

  for(let i=0;i<document.getElementsByClassName("list-group-item").length;i++){
    document.getElementsByClassName("list-group-item")[i].setAttribute("onclick","void(0)");
    document.getElementsByClassName("list-group-item")[i].onclick = exit_markdown_editor;
  }

};