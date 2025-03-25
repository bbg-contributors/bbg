
import i18n from "../i18n.js";

export default function () {
        document.querySelector("#app").innerHTML = /* html */ `
                                                    <div id="blogmanager_page_app_bar">
                                                    </div>
        
                                                    <mdui-layout>
                                                        <mdui-layout-item id="blog_manager_nav_rail">
                                                        </mdui-layout-item>
                                                        <mdui-layout-main>
                                                            <mdui-card id="blog_manager_mdeditor_page_card">
                                                                <mdui-card-content>
                                                                    <div>
                                                                        <p><mdui-button variant="text" id="mdeditor_backbtn" icon="arrow_back">${i18n("universal_back")}</mdui-button><span id="mdeditor_toolbar"></span></p>
                                                                        <div class="mdui-prose">
                                                                            <h2> <span id="mdeditor_actual_title"></span></h2>
                                                                            <div id="blog_manager_markdown_editor">
                                                                                <textarea id="mdeditor_editing_area"></textarea>
                                                                                <div id="mdeditor_preview_area"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </mdui-card-content>
                                                            </mdui-card>
                                                        </mdui-layout-main>
                                                    </mdui-layout>`;
        bbg.renderNavRail("blog_manager_nav_rail");
        bbg.renderTitleBar("blogmanager_page_app_bar", i18n("blogmanager_title_prefix") + i18n("blogmanager_mdeditor_title"));
    
        document.querySelector("#mdeditor_backbtn").addEventListener("click", async () => {
            if (fileType === "articles") {
                await bbg.routePage("/manage/articles");
            } else if (fileType === "pages") {
                await bbg.routePage("/manage/pages");
            }
        });
    
        const fileName = bbg.cntPath.split("/").pop();
        const fileType = bbg.cntPath.split("/")[2];
        let itemData = null;
        if (fileType === "articles") {
            itemData = bbg.blogData["文章列表"].find((item) => item["文件名"] === fileName);
        } else if (fileType === "pages") {
            itemData = bbg.blogData["页面列表"].find((item) => item["文件名"] === fileName);
        }
    
        const markdownFileHandle = await bbg.fs.getFileHandle(fileType==="articles"?bbg.blogArticlesDirHandle:bbg.blogPagesDirHandle, fileName);
        const markdownFileText = await bbg.fs.readFile(markdownFileHandle);
    
        if (markdownFileText.trim() === "") {
            bbg.mdeditorCurrentStatus = "editing";
        } else {
            bbg.mdeditorCurrentStatus = "preview_only";
        }
    
        let mdeditor_actual_title = (bbg.mdeditorCurrentStatus !== "preview_only" ? i18n("blogmanager_mdeditor_currentediting") : i18n("blogmanager_mdeditor_currentpreviewing")) + (fileType === "articles" ? itemData["文章标题"] : itemData["页面标题"]);
    
    
        document.querySelector("#mdeditor_actual_title").innerText = mdeditor_actual_title;
    
        function renderMarkdownPreview() {
            document.querySelector("#mdeditor_preview_area").innerHTML = marked(markdownFileText);
    
            document.querySelector("#mdeditor_editing_area").style.display = "none";
            document.querySelector("#mdeditor_preview_area").style.display = "block";
            document.querySelector("#mdeditor_preview_area").style.left = "2vw";
            document.querySelector("#mdeditor_preview_area").style.width = "80vw";
    
            mdeditor_actual_title = i18n("blogmanager_mdeditor_currentpreviewing") + (fileType === "articles" ? itemData["文章标题"] : itemData["页面标题"]);
            document.querySelector("#mdeditor_actual_title").innerText = mdeditor_actual_title;
        }
    
        function previewWhenEditing() {
            document.querySelector("#mdeditor_preview_area").innerHTML = marked(document.getElementById("mdeditor_editing_area").value);
        }
    
        function renderMarkdownEditing() {
            document.querySelector("#mdeditor_editing_area").value = markdownFileText;
            document.querySelector("#mdeditor_preview_area").innerHTML = marked(document.getElementById("mdeditor_editing_area").value);
    
            document.querySelector("#mdeditor_editing_area").style.display = "block";
            document.querySelector("#mdeditor_preview_area").style.display = "block";
            document.querySelector("#mdeditor_preview_area").style.left = "45vw";
            document.querySelector("#mdeditor_preview_area").style.width = "35vw";
    
            mdeditor_actual_title = i18n("blogmanager_mdeditor_currentediting") + (fileType === "articles" ? itemData["文章标题"] : itemData["页面标题"]);
    
            document.querySelector("#mdeditor_actual_title").innerText = mdeditor_actual_title;
    
    
            document.querySelector("#mdeditor_editing_area").addEventListener("input", previewWhenEditing);
        }
    
        function renderPreviewToolbar() {
            const template = /* html */ `<mdui-button id="mdeditor_switch_to_editing_mode" variant="outlined" icon="edit">${i18n("blogmanager_mdeditor_switch_to_editing_mode")}</mdui-button>`;
            document.querySelector("#mdeditor_toolbar").innerHTML = template;
            document.querySelector("#mdeditor_switch_to_editing_mode").addEventListener("click", () => {
                bbg.mdeditorCurrentStatus = "editing";
                document.querySelector("#mdeditor_switch_to_editing_mode").remove();
                renderMarkdownEditing();
                renderEditingToolbar();
            });
        }
    
        function renderEditingToolbar() {
            const template = /* html */ `
                                <mdui-button id="mdeditor_save" variant="outlined" icon="save">${i18n("blogmanager_mdeditor_savechanges")}</mdui-button>
                                <mdui-button id="mdeditor_switch_to_preview_mode" variant="outlined" icon="preview">${i18n("blogmanager_mdeditor_switch_to_preview_mode")}</mdui-button>`;
            document.querySelector("#mdeditor_toolbar").innerHTML = template;
            document.querySelector("#mdeditor_save").addEventListener("click", async () => {
                await bbg.fs.writeFile(markdownFileHandle, document.getElementById("mdeditor_editing_area").value);
                window.alert(i18n("blogmanager_mdeditor_save_success"));
            });
            document.querySelector("#mdeditor_switch_to_preview_mode").addEventListener("click", () => {
                bbg.mdeditorCurrentStatus = "preview_only";
                document.querySelector("#mdeditor_save").remove();
                document.querySelector("#mdeditor_switch_to_preview_mode").remove();
                renderMarkdownPreview();
                renderPreviewToolbar();
                document.getElementById("mdeditor_editing_area").removeEventListener("input", previewWhenEditing);
            });
        }
    
        if (itemData === null) {
            console.error(`Error in bbg.renderMarkdownEditorPage func: Unable to find data for file '${fileName}'.`);
            return;
        } else {
            if (bbg.mdeditorCurrentStatus === "editing") {
                renderMarkdownEditing();
                renderEditingToolbar();
            } else if (bbg.mdeditorCurrentStatus === "preview_only") {
                renderMarkdownPreview();
                renderPreviewToolbar();
            }
        }
    
    
    }