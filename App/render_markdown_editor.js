const { readFileSync, writeFileSync } = require("fs");
const { dialog } = require("@electron/remote");
const shell = require("@electron/remote").shell;
const { clipboard } = require("electron");
const marked = require("marked");
const xss_filter = require("xss");
const toast_creator = require("./toast_creator.js");
const oai_function = require("./oai_function.js");
const rss_hook = require("./rss_hook.js");
const { baseUrl } = require("marked-base-url");


module.exports = function () {
  let path = decodeURIComponent(getUrlArgs("path"));
  let filename = path.replaceAll("/data/articles/", "").replaceAll("/data/pages/", "");
  let title, type;
  let original_content = readFileSync(rootDir + path, "utf-8");
  var editor_status = 0, default_editor = false;
  var whoScrolling;
  var ai = new oai_function();
  var ai_task_list = new Object();
  var is_cnt_article_encrypted = false;
  var password_if_enabled_encryption_for_article = "";
  let encrypted_orginal_content_if_encrypted;
  let saved_editor_content = original_content;

  if (path.indexOf("/data/articles/") !== -1) {
    // article
    type = "article";
    for (let i = 0; i < blog["文章列表"].length; i++) {
      if (blog["文章列表"][i]["文件名"] === filename) {
        title = blog["文章列表"][i]["文章标题"];
        if (blog["文章列表"][i]["是否加密"] === true) {
          is_cnt_article_encrypted = true;
          var encryptionOptionsModal = new bootstrap.Modal(document.getElementById("encryptionOptionsModal"), {
            backdrop: "static",
            keyboard: false,
          });
          encryptionOptionsModal.show();
          encrypted_orginal_content_if_encrypted = original_content;
          original_content = "";
          document.getElementById("encryptionOptionsModalBody").innerHTML = `<div class="mb-3">
          <label class="form-label"><i class="fa fa-password"></i> ${langdata.INPUT_A_PASSWORD[lang_name]}</label>
          <input class="form-control" placeholder="${langdata.INPUT_A_PASSWORD[lang_name]}" value="" id="article_password_modal_value">
        </div>
        <button class="btn btn-outline-primary" id="encryptionOptionsModalStartEditingBtn">${langdata.START_EDITING[lang_name]}</button>
        <button class="btn btn-outline-primary" onclick="window.location.href='./article_manager.html?rootdir=${rootDir}'">${langdata.CANCEL[lang_name]}</button>
        `;


          document.getElementById("encryptionOptionsModalStartEditingBtn").addEventListener("click", () => {
            password_if_enabled_encryption_for_article = document.getElementById("article_password_modal_value").value;
            original_content = encrypted_orginal_content_if_encrypted;
            original_content = decrypt_content(original_content, password_if_enabled_encryption_for_article);
            document.getElementById("editor_textarea").value = original_content;
            encryptionOptionsModal.hide();
            preview_markdown_content();
          });
        }
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

  // marked.use(baseUrl(`file://${rootDir}/data/${type}s/`));
  document.getElementById("container").insertAdjacentHTML("beforeend", getUiFileContent(
    "markdown_editor_title_ui.html",
  ));
  document.getElementById("markdown_filename").innerHTML = `${icon("edit-svgrepo-com")}
${langdata["CURRENTLY_EDITING"][lang_name]}“${title}”` + document.getElementById("markdown_filename").innerHTML;

  const ai_function_dialog = new bootstrap.Modal(document.getElementById("ai_function-dialog"), {
    backdrop: "static",
    keyboard: false,
  });

  const insertModal = new bootstrap.Modal(document.querySelector("#insertModal"));
  const insertModalBody = document.querySelector("#insertModalBody");

  document.querySelector("#btn_insert_partial_encryption").addEventListener("click", function () {
    insertModalBody.innerHTML = `<div class="mb-3">
      <label class="form-label"><i class="fa fa-lock"></i> ${langdata.INPUT_A_PASSWORD[lang_name]}</label>
      <input class="form-control" placeholder="${langdata.INPUT_A_PASSWORD[lang_name]}" value="" id="partial_encryption_modal_value_pswd">
      
      <br />
      <label class="form-label"><i class="fa fa-lock"></i> ${langdata.ENCRYPT_CONTENT[lang_name]}</label>
      <textarea class="form-control" placeholder="${langdata.ENCRYPT_CONTENT[lang_name]}" id="partial_encryption_modal_value_txt" rows="5"></textarea>
      <br />
      <button id="insert_partial_encryption_confirmbtn" class="primary_btn">${langdata.OK[lang_name]}</button>
      <button data-bs-dismiss="modal" class="primary_btn">${langdata.CANCEL[lang_name]}</button>
    </div>`;

    insertModal.show();
    document.getElementById("insert_partial_encryption_confirmbtn").addEventListener("click", insert_partial_encryption);
  });

  function insert_partial_encryption() {
    const pswd = document.getElementById("partial_encryption_modal_value_pswd").value;
    const txt = document.getElementById("partial_encryption_modal_value_txt").value;

    const encrypted_content = encrypt_content(txt, pswd);

    document.querySelector("#editor_textarea").value += `\n<partial_encrypted>
${encrypted_content}
</partial_encrypted>\n`;

    insertModal.hide();
  }

  document.querySelector("#btn_decrypt_partial_encryption").addEventListener("click", function () {
    insertModalBody.innerHTML = `<div class="mb-3">
      <label class="form-label"><i class="fa fa-lock"></i> ${langdata.INPUT_A_PASSWORD[lang_name]}</label>
      <input class="form-control" placeholder="${langdata.INPUT_A_PASSWORD[lang_name]}" value="" id="partial_encryption_modal_value_pswd">
      
      <br />
      <label class="form-label"><i class="fa fa-lock"></i> ${langdata.PLEASE_COPY_PARTIAL_ENCRYPTION[lang_name]}</label>
      <textarea class="form-control" placeholder="${langdata.PLEASE_INPUT_CONTENT[lang_name]}" id="partial_encryption_modal_value_txt" rows="5"></textarea>
      <br />
      <label class="form-label"><i class="fa fa-lock"></i> ${langdata.DECRYPT_RESULT[lang_name]}</label>
      <div>
      <textarea disabled id="decryptResultTextarea" class="form-control"></textarea>
      </div>
      
      <button id="decrypt_partial_encryption_confirmbtn" class="primary_btn">${langdata.OK[lang_name]}</button>
      <button data-bs-dismiss="modal" class="primary_btn">${langdata.CANCEL[lang_name]}</button>
    </div>`;

    insertModal.show();
    document.getElementById("decrypt_partial_encryption_confirmbtn").addEventListener("click", decrypt_partial_encryption);
  });

  function decrypt_partial_encryption() {
    const pswd = document.getElementById("partial_encryption_modal_value_pswd").value;
    const txt = document.getElementById("partial_encryption_modal_value_txt").value.replaceAll("<partial_encrypted>", "").replaceAll("</partial_encrypted>", "");

    console.log(11111);
    console.log(txt);

    const decrypted_content = decrypt_content(txt, pswd);
    document.getElementById("decryptResultTextarea").value = decrypted_content;
  }

  function refreshEditorStatus() {
    const textarea = document.getElementById("editor_textarea");
    if (textarea === null) {
      return;
    }
    editor_status = textarea.value === saved_editor_content ? 0 : 1;
  }


  function getAiTaskExecutingText(taskType) {
    if (taskType === "textImprove") {
      return langdata["POLISHING_TEXT"][lang_name];
    }
    if (taskType === "textSummary") {
      return langdata["SUMMARIZING_TEXT"][lang_name];
    }
    return langdata["TEXT_CONTINUATION_TASK_IS_BEING_OPERATED"][lang_name];
  }

  function showAiConfigRequiredDialog() {
    dialog.showMessageBoxSync({
      message: lang_name === "简体中文"
        ? "请先回到开始界面的“应用设置”里配置 OpenAI API。"
        : "Please configure OpenAI API from Application Settings on the start page first."
    });
  }

  function showAiFailureDialog(message) {
    dialog.showMessageBoxSync({
      message: `${lang_name === "简体中文" ? "AI 请求失败：" : "AI request failed: "}${message}`
    });
  }

  function getAiAmountLabel(taskType, amount) {
    const labels = {
      "textCompletion": {
        "简体中文": ["很短", "偏短", "适中", "偏长", "很长"],
        "default": ["Very Short", "Short", "Medium", "Long", "Very Long"]
      },
      "textSummary": {
        "简体中文": ["极简", "简短", "适中", "详细", "很详细"],
        "default": ["Minimal", "Brief", "Medium", "Detailed", "Very Detailed"]
      }
    };
    const languageKey = lang_name === "简体中文" ? "简体中文" : "default";
    return labels[taskType][languageKey][amount - 1];
  }

  function getAiCustomRequirementTitle() {
    return lang_name === "简体中文" ? "自定义要求" : "Custom Requirements";
  }

  function getAiCustomRequirementPlaceholder(taskType) {
    if (lang_name === "简体中文") {
      if (taskType === "textCompletion") {
        return "例如：延续当前论证方向，补一个带小标题的段落";
      }
      if (taskType === "textImprove") {
        return "例如：保留口语化语气，不要改动 Markdown 标题层级";
      }
      return "例如：重点概括结论部分，使用 3 条项目符号";
    }
    if (taskType === "textCompletion") {
      return "Example: continue the current argument and add one subsection";
    }
    if (taskType === "textImprove") {
      return "Example: keep the casual tone and preserve Markdown headings";
    }
    return "Example: focus on the conclusion and use 3 bullet points";
  }

  function getAiDialogTitle(taskType) {
    if (taskType === "textImprove") {
      return lang_name === "简体中文" ? "AI 润色设置" : "AI Polishing Settings";
    }
    if (taskType === "textSummary") {
      return lang_name === "简体中文" ? "AI 摘要设置" : "AI Summary Settings";
    }
    return lang_name === "简体中文" ? "AI 续写设置" : "AI Completion Settings";
  }

  function insertTextAtCursor(textarea, text, start, end) {
    const insertStart = typeof start === "number" ? start : textarea.selectionStart;
    const insertEnd = typeof end === "number" ? end : textarea.selectionEnd;
    textarea.value = textarea.value.slice(0, insertStart) + text + textarea.value.slice(insertEnd);
    const nextCaretPosition = insertStart + text.length;
    textarea.focus();
    textarea.setSelectionRange(nextCaretPosition, nextCaretPosition);
  }

  function buildCompletionContentFromCursor(textarea) {
    const cursorStart = textarea.selectionStart;
    const cursorEnd = textarea.selectionEnd;
    return {
      cursorStart,
      cursorEnd,
      targetText: `${textarea.value.slice(0, cursorStart)}[[BBG_CURSOR_HERE]]${textarea.value.slice(cursorEnd)}`
    };
  }

  function openAiTaskOptionsDialog(taskType) {
    const defaultAmount = taskType === "textSummary" ? 2 : 3;
    let dialogContent = `
      <h5>${getAiDialogTitle(taskType)}</h5>
      <br />
    `;
    if (taskType !== "textImprove") {
      const amountTitle = taskType === "textSummary"
        ? (lang_name === "简体中文" ? "摘要详细度" : "Summary Detail")
        : (lang_name === "简体中文" ? "生成量" : "Generation Amount");
      dialogContent += `
      <label class="form-label">${amountTitle}: <span id="ai_amount_value">${getAiAmountLabel(taskType, defaultAmount)}</span></label>
      <input type="range" class="form-range" min="1" max="5" step="1" value="${defaultAmount}" id="ai_amount_range">
      <br />
      `;
    }
    dialogContent += `
      <label class="form-label">${getAiCustomRequirementTitle()}</label>
      <textarea class="form-control" rows="5" id="ai_custom_requirement_input" placeholder="${getAiCustomRequirementPlaceholder(taskType)}"></textarea>
      <br />
      <button class="btn btn-primary" id="btn_confirm_ai_task_options">${lang_name === "简体中文" ? "开始生成" : "Generate"}</button>
      <button class="btn btn-secondary" id="btn_cancel_ai_task_options">${langdata.CANCEL[lang_name]}</button>
    `;
    document.getElementById("ai_function-dialog-content").innerHTML = dialogContent;
    ai_function_dialog.show();
    if (taskType !== "textImprove") {
      document.getElementById("ai_amount_range").oninput = function () {
        document.getElementById("ai_amount_value").innerText = getAiAmountLabel(taskType, Number(this.value));
      };
    }
    document.getElementById("btn_cancel_ai_task_options").onclick = function () {
      ai_function_dialog.hide();
    };
    document.getElementById("btn_confirm_ai_task_options").onclick = function () {
      const options = {
        amount: taskType === "textImprove" ? null : Number(document.getElementById("ai_amount_range").value),
        customRequirement: document.getElementById("ai_custom_requirement_input").value
      };
      const runtimeOptions = taskType === "textCompletion"
        ? buildCompletionContentFromCursor(document.getElementById("editor_textarea"))
        : {};
      ai_function_dialog.hide();
      runAiTask(taskType, options, runtimeOptions);
    };
  }

  function showAiResultDialog(taskType, responseText, runtimeOptions = {}) {
    let descriptionText = langdata["TEXT_CONTINUATION_COMPLETED_INFO"][lang_name];
    let confirmButtonText = langdata["OK"][lang_name];

    if (taskType === "textImprove") {
      descriptionText = langdata["TEXT_POLISHMENT_COMPLETED_INFO"][lang_name];
    } else if (taskType === "textSummary") {
      descriptionText = langdata["TEXT_SUMMARY_COMPLETED_INFO"][lang_name];
      confirmButtonText = lang_name === "简体中文" ? "复制到剪贴板" : "Copy to Clipboard";
    }

    document.getElementById("ai_function-dialog-content").innerHTML = `
      <p>${descriptionText}</p>
      <hr />
      <pre>${responseText}</pre>
      <hr />
      <button class="btn btn-primary" id="btn_accept_ai_result">${confirmButtonText}</button>
      <button class="btn btn-primary" id="btn_abandon_ai_result">${langdata.CANCEL[lang_name]}</button>
    `;
    ai_function_dialog.show();

    document.getElementById("btn_accept_ai_result").onclick = function () {
      if (taskType === "textCompletion") {
        insertTextAtCursor(
          document.getElementById("editor_textarea"),
          responseText,
          runtimeOptions.cursorStart,
          runtimeOptions.cursorEnd
        );
      } else if (taskType === "textImprove") {
        document.getElementById("editor_textarea").value = responseText;
      } else if (taskType === "textSummary") {
        clipboard.writeText(responseText);
      }
      if (taskType !== "textSummary") {
        preview_markdown_content();
        refreshEditorStatus();
      }
      ai_function_dialog.hide();
      enableEditingWhenAiTaskIsCompletedOrTerminated();
    };

    document.getElementById("btn_abandon_ai_result").onclick = function () {
      ai_function_dialog.hide();
      enableEditingWhenAiTaskIsCompletedOrTerminated();
    };
  }

  function runAiTask(taskType, options, runtimeOptions = {}) {
    if (ai.isConfigured() === false) {
      showAiConfigRequiredDialog();
      return;
    }

    const taskMap = {
      "textCompletion": ai.requestTextCompletions.bind(ai),
      "textImprove": ai.requestTextImprove.bind(ai),
      "textSummary": ai.requestTextSummary.bind(ai)
    };
    const targetText = runtimeOptions.targetText || document.getElementById("editor_textarea").value;
    const ai_task_id = randomString(16);
    ai_task_list[ai_task_id] = "waiting_response";
    disableEditingWhenAiTaskIsExcuting(getAiTaskExecutingText(taskType));

    document.getElementById("btn_terminate_text_completion_task").onclick = function () {
      ai_task_list[ai_task_id] = "terminated";
      enableEditingWhenAiTaskIsCompletedOrTerminated();
    };

    taskMap[taskType](targetText, options, function (response) {
      if (ai_task_list[ai_task_id] === "terminated") {
        ai_task_list[ai_task_id] = "completed";
        return;
      }

      ai_task_list[ai_task_id] = "completed";

      if (response.error !== undefined) {
        showAiFailureDialog(response.error.message);
        enableEditingWhenAiTaskIsCompletedOrTerminated();
        return;
      }

      showAiResultDialog(taskType, response.text, runtimeOptions);
    });
  }

  document.getElementById("btn_ai_text_completion").onclick = function (event) {
    event.preventDefault();
    openAiTaskOptionsDialog("textCompletion");
  };
  document.getElementById("btn_ai_text_improve").onclick = function (event) {
    event.preventDefault();
    openAiTaskOptionsDialog("textImprove");
  };
  document.getElementById("btn_ai_text_summary").onclick = function (event) {
    event.preventDefault();
    openAiTaskOptionsDialog("textSummary");
  };

  function disableEditingWhenAiTaskIsExcuting(taskText) {
    document.getElementById("first-wrapper").style.filter = "blur(5px)";
    document.getElementById("btn_save_changes").style.display = "none";
    document.getElementById("btn_change_to_default_editor").disabled = true;
    document.getElementById("third-wrapper").style.display = "";
    document.getElementById("btn_insert_partial_encryption").disabled = true;
    document.getElementById("btn_decrypt_partial_encryption").disabled = true;
    document.getElementById("btn_ai_text_completion").disabled = true;
    document.getElementById("btn_ai_text_improve").disabled = true;
    document.getElementById("btn_ai_text_summary").disabled = true;
    document.getElementById("btn_help").style.display = "none";
    document.getElementById("btn_save_changes").style.display = "none";
    document.getElementById("ai_task_status_text").innerText = taskText;
  }

  function enableEditingWhenAiTaskIsCompletedOrTerminated() {
    document.getElementById("first-wrapper").style.filter = "";
    document.getElementById("btn_save_changes").style.display = "";
    document.getElementById("btn_change_to_default_editor").disabled = false;
    document.getElementById("third-wrapper").style.display = "none";
    document.getElementById("btn_insert_partial_encryption").disabled = false;
    document.getElementById("btn_decrypt_partial_encryption").disabled = false;
    document.getElementById("btn_ai_text_completion").disabled = false;
    document.getElementById("btn_ai_text_improve").disabled = false;
    document.getElementById("btn_ai_text_summary").disabled = false;
    document.getElementById("btn_help").style.display = "";
    document.getElementById("btn_save_changes").style.display = "";
  }

  /*

  // 为了获得更好的可定制性，不再使用markdown-palettes

  document.getElementById("container").insertAdjacentHTML("beforeend", `
  <div id="editor-container" style="position:fixed;height:70%;width:90%">
    <div id="editor"></div>
  </div>
  `);

  var markdownEditor = new MarkdownPalettes("#editor");
  markdownEditor.content = original_content;

  */

  // 以下为新的实现方式

  function scrollSyncChange(changeToWhat) {
    whoScrolling = changeToWhat;
  }


  document.getElementById("container").insertAdjacentHTML("beforeend", `
  <div id="first-wrapper">
    <div id="editor-container" style="position:fixed;height:85vh;width:40vw">
      <textarea id="editor_textarea" placeholder="Input markdown source code here" class="form-control" style="width:110%;height:100%;font-family: monospace">
      </textarea>
    </div>
    <div id="preview-section-container" style="position:fixed;height:85vh;width:40vw;margin-left:45vw;overflow-y: scroll;overflow-x:auto;word-break:break-all">
    </div>
  </div>
  <div id="second-wrapper" style="position:fixed;top:0;left:0;height:100vh;width:100vw;display:none;z-index:20;background:rgba(251,252,254,0.85)">
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:720px;width:calc(100vw - 80px);text-align:center">
      <h4>${langdata["EDITOR_WRAPPER_HINT"][lang_name]}</h4>
      <p style="margin:20px 0;color:#555">${langdata["EXTERNAL_EDITOR_SYNC_HINT"][lang_name]}</p>
      <button id="btn_confirm_exit_default_editor" class="success_btn">${langdata["EXITED_EXTERNAL_EDITOR"][lang_name]}</button>
    </div>
  </div>
  <div id="third-wrapper" style="position:relative;height:70vh;width:75vw;display:none">
    <h4 style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"><span id="ai_task_status_text">${langdata["TEXT_CONTINUATION_TASK_IS_BEING_OPERATED"][lang_name]}</span>
    <br />
    <button id="btn_terminate_text_completion_task" class="btn btn-primary">${langdata["TERMINATE_THE_TASK"][lang_name]}</button>
    </h4>
    
  </div>
  `);

  // 监听markdown预览区域的变化情况
  // 如果图片的相对路径错误则进行修复
  // 如果编辑区有更改则记录
  let MutationObserver = window.MutationObserver;
  let previewContainer = document.getElementById("preview-section-container");
  let observer = new MutationObserver(function () {
    for (let i = 0; i < previewContainer.getElementsByTagName("img").length; i++) {
      let original_src = previewContainer.getElementsByTagName("img")[i].getAttribute("src");
      if (original_src.includes(`${rootDir}/data/${type}s/`) === false) {
        // 已经修复过的相对路径
        if (original_src.includes("http://") === false && original_src.includes("https://") === false) {
          // 来自网络的图片不属于相对路径
          let src = `${rootDir}/data/${type}s/${original_src}`;
          previewContainer.getElementsByTagName("img")[i].setAttribute("src", src);
        }
      }
    }
  });
  observer.observe(previewContainer, { characterData: true, subtree: true, childList: true });

  function render_hint_tags() {
    const langdata = {
      "INFO": {
        "简体中文": "提示",
        "English": "Hint",
        "日本語": "Hint"
      },
      "WARNING": {
        "简体中文": "注意",
        "English": "Warning",
        "日本語": "Warning"
      },
      "SUCCESS": {
        "简体中文": "成功",
        "English": "Success",
        "日本語": "Success"
      },
      "DANGER": {
        "简体中文": "危险",
        "English": "Danger",
        "日本語": "Danger"
      }
    };
    for (let i = 0; i < document.getElementsByTagName("info-hint").length; i++) {
      document.getElementsByTagName("info-hint")[i].innerHTML = `<span class="hint-heading"><i class="fa fa-info-circle"></i> ${langdata["INFO"][lang_name]} </span><br />` + document.getElementsByTagName("info-hint")[i].innerHTML;
    }
    for (let i = 0; i < document.getElementsByTagName("warning-hint").length; i++) {
      document.getElementsByTagName("warning-hint")[i].innerHTML = `<span class="hint-heading"><i class="fa fa-exclamation-circle"></i> ${langdata["WARNING"][lang_name]} </span><br />` + document.getElementsByTagName("warning-hint")[i].innerHTML;
    }
    for (let i = 0; i < document.getElementsByTagName("danger-hint").length; i++) {
      document.getElementsByTagName("danger-hint")[i].innerHTML = `<span class="hint-heading"><i class="fa fa-exclamation-triangle"></i> ${langdata["DANGER"][lang_name]} </span><br />` + document.getElementsByTagName("danger-hint")[i].innerHTML;
    }
    for (let i = 0; i < document.getElementsByTagName("success-hint").length; i++) {
      document.getElementsByTagName("success-hint")[i].innerHTML = `<span class="hint-heading"><i class="fa fa-check-circle-o"></i> ${langdata["SUCCESS"][lang_name]} </span><br />` + document.getElementsByTagName("success-hint")[i].innerHTML;
    }
  }

  function render_ref_tags() {
    const langdata = {
      "REFERENCE": {
        "简体中文": "参考",
        "English": "References",
        "日本語": "References"
      }
    };
    let ref_tags = [];
    let current_number = 1;
    for (let i = 0; i < document.getElementsByTagName("ref").length; i++) {
      let ref = document.getElementsByTagName("ref")[i];
      ref_tags.push({
        "ref_name": ref.innerText,
        "ref_id": current_number,
        "ref_has_target": ref.getAttribute("url") !== undefined && ref.getAttribute("url") !== null && ref.getAttribute("url") !== ""
      });
      document.getElementsByTagName("ref")[i].innerHTML = `<sup style="font-size: 14px;"><a href="#reference_list_id_${current_number}">[${current_number}]</a></sup>`;
      document.getElementsByTagName("ref")[i].setAttribute("style", "display:inline");
      document.getElementsByTagName("ref")[i].setAttribute("id", `reference_id_${current_number}`);
      if (ref_tags[ref_tags.length - 1].ref_has_target === true) {
        ref_tags[ref_tags.length - 1].ref_target = ref.getAttribute("url");
      }
      current_number += 1;
    }

    if (ref_tags.length !== 0) {
      let ref_html = `<div id="content_reference_list"><h3>${langdata.REFERENCE[lang_name]}</h3><hr />`;
      for (const ref of ref_tags) {
        ref_html += `<div id="reference_list_id_${ref.ref_id}"><b>${ref.ref_id}.<a href="#reference_id_${ref.ref_id}">^</a></b>&nbsp;  ${ref.ref_has_target === false ? ref.ref_name : `<a href="javascript:void(0)">${ref.ref_name}</a>`} </div>`;
      }
      ref_html += "</div>";
      document.getElementById("preview-section-container").innerHTML += ref_html;
    }
  }

  const prevent_goto_link = () => {
    for (let i = 0; i < document.getElementsByTagName("a").length; i++) {
      let linkTarget = document.getElementsByTagName("a")[i].getAttribute("href");
      document.getElementsByTagName("a")[i].onclick = () => {
        toast_creator("warning", "For security reasons, this operation is not allowed.");
      };
      document.getElementsByTagName("a")[i].setAttribute("href", "javascript:void(0)");
    }
  };

  const preview_markdown_content = () => {
    // 自定义过滤白名单
    let filter_whiteList = xss_filter.whiteList;
    filter_whiteList.ref = ["url"];
    filter_whiteList["info-hint"] = [];
    filter_whiteList["warning-hint"] = [];
    filter_whiteList["danger-hint"] = [];
    filter_whiteList["success-hint"] = [];
    filter_whiteList["input"] = ["disabled", "type", "checked"];

    const markdown_content = document.getElementById("editor_textarea").value;
    const html_content = xss_filter(marked.parse(markdown_content), { whiteList: filter_whiteList });
    document.getElementById("preview-section-container").innerHTML = html_content;
    render_hint_tags();
    render_ref_tags();
    prevent_goto_link();
    scrollSyncChange("preview跟着writing滚动");
  };

  document.querySelector("#preview-section-container").onmousemove = () => {
    scrollSyncChange("writing跟着preview滚动");
  };
  document.querySelector("#editor_textarea").onmousemove = () => {
    scrollSyncChange("preview跟着writing滚动");
  };


  document.getElementById("editor_textarea").onkeyup = () => {
    preview_markdown_content();
    refreshEditorStatus();
    previewSectionSyncScrollStatusFromWritingSection();
  };

  document.getElementById("editor_textarea").value = original_content;
  saved_editor_content = original_content;

  preview_markdown_content();
  refreshEditorStatus();

  function previewSectionSyncScrollStatusFromWritingSection() {
    if (whoScrolling !== "writing跟着preview滚动") {
      whoScrolling = "preview跟着writing滚动";
      console.log(whoScrolling);
      var ih =
        document.querySelector("#editor_textarea").scrollHeight -
        document.getElementById("editor_textarea").clientHeight;
      var oh =
        document.querySelector("#preview-section-container").scrollHeight -
        document.querySelector("#preview-section-container").clientHeight;
      var ipn = document.querySelector("#editor_textarea").scrollTop;

      // 滚动位置计算
      // 此实现方式是按照滚动条的比例计算，不一定精确，但问题不大
      document.querySelector("#preview-section-container").scrollTop = (ipn / ih) * oh;
    }
  }

  // 同步滚动（类型1）
  document.getElementById("editor_textarea").addEventListener("scroll", function (e) {
    previewSectionSyncScrollStatusFromWritingSection();
  });

  // 同步滚动(类型2)

  document.getElementById("preview-section-container").addEventListener("scroll", function (e) {
    if (whoScrolling !== "preview跟着writing滚动") {
      whoScrolling = "writing跟着preview滚动";
      console.log(whoScrolling);
      var ih =
        document.querySelector("#editor_textarea").scrollHeight -
        document.getElementById("editor_textarea").clientHeight;
      var oh =
        document.querySelector("#preview-section-container").scrollHeight -
        document.querySelector("#preview-section-container").clientHeight;
      var ipn = document.querySelector("#preview-section-container").scrollTop;

      document.querySelector("#editor_textarea").scrollTop = (ipn / oh) * ih;
    }

  });


  document.getElementById("btn_help").onclick = function () {
    let text = langdata["MARKDOWN_EDITOR_USAGE_DETAIL"][lang_name];
    dialog.showMessageBoxSync({ message: text });
  };

  const exit_markdown_editor = function () {
    if (editor_status === 0) {
      window.location.href = `./${type}_manager.html?rootdir=${rootDir}`;
    } else if (dialog.showMessageBoxSync({ buttons: [langdata["OK"][lang_name], langdata["CANCEL"][lang_name]], message: langdata["WARN_UNSAVED_CHANGES"][lang_name] }) === 0) {
      window.location.href = `./${type}_manager.html?rootdir=${rootDir}`;
    }
  };
  const markdown_editor_save_changes = function () {
    const currentContent = document.getElementById("editor_textarea").value;
    writeContentToDisk(currentContent);
    runSaveSideEffects(currentContent, true);
  };

  document.getElementById("btn_save_changes").onclick = markdown_editor_save_changes;
  function updateArticleModifiedTime() {
    if (type !== "article") {
      return;
    }
    const currentTimestamp = Date.now();
    for (let i = 0; i < blog["文章列表"].length; i++) {
      if (blog["文章列表"][i]["文件名"] === filename) {
        blog["文章列表"][i]["修改时间（时间戳）"] = currentTimestamp;
        break;
      }
    }
  }

  function writeContentToDisk(content, preservePlainTextForExternalEditor = false) {
    if (is_cnt_article_encrypted === true && preservePlainTextForExternalEditor === false) {
      writeFileSync(`${rootDir}/${path}`, encrypt_content(content, password_if_enabled_encryption_for_article));
      return;
    }
    writeFileSync(`${rootDir}/${path}`, content);
  }

  function runSaveSideEffects(content, showSaveFeedback = false) {
    updateArticleModifiedTime();
    BlogInstance.writeBlogData();
    rss_hook();
    saved_editor_content = content;
    refreshEditorStatus();
    if (showSaveFeedback) {
      document.getElementById("btn_save_changes").innerHTML = "<i class=\"fa fa-check\"></i> " + langdata["ALREADY_SAVED"][lang_name];
      setTimeout(function () {
        document.getElementById("btn_save_changes").innerHTML = "<i class=\"fa fa-check\"></i> " + langdata["SAVE_CHANGES_CTRL_S"][lang_name];
      }, 1200);
    }
  }

  function switchToDefaultEditor() {
    const currentContent = document.getElementById("editor_textarea").value;
    writeContentToDisk(currentContent, true);
    saved_editor_content = currentContent;
    refreshEditorStatus();
    shell.openPath(`${rootDir}/${path}`);
    document.getElementById("editor_switch").innerHTML = langdata["SWITCH_TO_BUILTIN_EDITOR"][lang_name];
    document.getElementById("first-wrapper").style.filter = "blur(5px)";
    document.getElementById("btn_save_changes").style.display = "none";
    document.getElementById("second-wrapper").style.display = "";
    document.getElementById("btn_help").style.display = "none";
    default_editor = true;
  }

  function switchBackToBuiltinEditor() {
    const latestContent = readFileSync(rootDir + path, "utf-8");
    document.getElementById("editor_textarea").value = latestContent;
    preview_markdown_content();
    writeContentToDisk(latestContent);
    runSaveSideEffects(latestContent, true);
    document.getElementById("editor_switch").innerHTML = langdata["SWITCH_TO_SYSTEM_DEFAULT_EDITOR"][lang_name];
    document.getElementById("first-wrapper").style.filter = "";
    document.getElementById("btn_save_changes").style.display = "";
    document.getElementById("second-wrapper").style.display = "none";
    document.getElementById("btn_help").style.display = "";
    default_editor = false;
  }

  document.getElementById("btn_change_to_default_editor").onclick = function () {
    if (document.getElementById("third-wrapper").style.display !== "none") {
      return;
    }
    if (default_editor) {
      switchBackToBuiltinEditor();
      return;
    }
    if (editor_status === 1) {
      if (dialog.showMessageBoxSync({ buttons: [langdata["OK"][lang_name], langdata["CANCEL"][lang_name]], message: langdata["WARN_UNSAVED_CHANGES_BEFORE_SWITCHING_TO_SYSTEM_DEFAULT_EDITOR"][lang_name] }) === 0) {
        switchToDefaultEditor();
      }
      return;
    }
    switchToDefaultEditor();
  };

  document.getElementById("btn_confirm_exit_default_editor").onclick = function () {
    switchBackToBuiltinEditor();
  };
  document.onkeydown = function (event) {
    let toReturn = true;
    if (event.ctrlKey || event.metaKey) {  // detect ctrl or cmd
      if (event.which == 83) {
        markdown_editor_save_changes();
        toReturn = false;
      } else if (event.which == 74) {
        event.preventDefault();
        openAiTaskOptionsDialog("textCompletion");
        toReturn = false;
      }
    }

    return toReturn;
  };

  for (let i = 0; i < document.getElementsByClassName("list-group-item").length; i++) {
    let original_event = document.getElementsByClassName("list-group-item")[i].getAttribute("onclick");
    document.getElementsByClassName("list-group-item")[i].setAttribute("onclick", "void(0)");
    document.getElementsByClassName("list-group-item")[i].onclick = function () {
      if (editor_status === 0) {
        eval(original_event);
      } else {
        if (dialog.showMessageBoxSync({ buttons: [langdata["OK"][lang_name], langdata["CANCEL"][lang_name]], message: langdata["WARN_UNSAVED_CHANGES"][lang_name] }) === 0) {
          eval(original_event);
        }
      }
    };
  }

  window.onbeforeunload = (e) => {
    if (is_cnt_article_encrypted && default_editor) {
      writeFileSync(`${rootDir}/${path}`, encrypt_content(readFileSync(rootDir + path, "utf-8"), password_if_enabled_encryption_for_article));
    }
    if (editor_status === 1) {
      e.preventDefault();
      const result = dialog.showMessageBoxSync({ buttons: [langdata["OK"][lang_name], langdata["CANCEL"][lang_name]], message: langdata["WARN_UNSAVED_CHANGES"][lang_name] });
      if (result === 0) {
        window.close();
      }
    }
  };

};
