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
${langdata["CURRENTLY_EDITING"][lang_name]}“${title}”`+document.getElementById("markdown_filename").innerHTML;

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
    let text=langdata["MARKDOWN_EDITOR_USAGE_DETAIL"][lang_name];
    dialog.showMessageBoxSync({message: text});
  };

  const exit_markdown_editor=function(){
    if(editor_status === 0){
      window.location.href=`./${type}_manager.html?rootdir=${rootDir}`;
    }else if(dialog.showMessageBoxSync({buttons: [langdata["OK"][lang_name],langdata["CANCEL"][lang_name]],message:langdata["WARN_UNSAVED_CHANGES"][lang_name]}) === 0){
      window.location.href=`./${type}_manager.html?rootdir=${rootDir}`;
    }
  };
  document.getElementById("btn_exit").onclick=exit_markdown_editor;

  const markdown_editor_save_changes=function(){
    writeFileSync(`${rootDir}/${path}`,markdownEditor.content);
    document.getElementById("btn_save_changes").innerHTML="<i class=\"fa fa-check\"></i> "+langdata["ALREADY_SAVED"][lang_name];
    editor_status=0;
    setTimeout(function(){
      document.getElementById("btn_save_changes").innerHTML="<i class=\"fa fa-check\"></i> "+langdata["SAVE_CHANGES_CTRL_S"][lang_name];
    },1200);
  };

  document.getElementById("btn_save_changes").onclick=markdown_editor_save_changes;

  document.getElementById("btn_change_to_default_editor").onclick=function(){
    if(editor_status === 1){
      if(dialog.showMessageBoxSync({buttons: [langdata["OK"][lang_name],langdata["CANCEL"][lang_name]],message:langdata["WARN_UNSAVED_CHANGES_BEFORE_SWITCHING_TO_SYSTEM_DEFAULT_EDITOR"][lang_name]}) === 0){
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
    let original_event = document.getElementsByClassName("list-group-item")[i].getAttribute("onclick");
    document.getElementsByClassName("list-group-item")[i].setAttribute("onclick","void(0)");
    document.getElementsByClassName("list-group-item")[i].onclick=function(){
      if(editor_status === 0){
        eval(original_event);
      }else{
        if(dialog.showMessageBoxSync({buttons: [langdata["OK"][lang_name],langdata["CANCEL"][lang_name]],message:langdata["WARN_UNSAVED_CHANGES"][lang_name]}) === 0){
          eval(original_event);
        }
      }
    };
  }

};