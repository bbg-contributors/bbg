
import i18n from "../i18n.js";

function openCreateNewPageDialog() {
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_pages_add_new_page"),
        body: /* html */ `
                <mdui-text-field label="${i18n("blogmanager_pages_create_new_page_filename")}" id="create_new_page_filename" value="${generateRandomString(12)}.md"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${i18n("blogmanager_pages_create_new_page_title")}" id="create_new_page_title"></mdui-text-field>
                <br /><br />
                <mdui-checkbox id="create_new_page_display_in_menu">${i18n("blogmanager_pages_create_new_page_display_in_menu")}</mdui-checkbox>
                <br /><br />
                <mdui-text-field label="${i18n("blogmanager_pages_create_new_page_menu_name")}" id="create_new_page_menu_name"></mdui-text-field>
                <br /><br />
                <mdui-checkbox id="create_new_page_open_in_new_tab">${i18n("blogmanager_pages_create_new_page_open_in_new_tab")}</mdui-checkbox>
                <br /><br />
                <mdui-checkbox id="create_new_page_enable_comments">${i18n("blogmanager_pages_create_new_page_enable_comments")}</mdui-checkbox>
                <br /><br />
                <mdui-button id="create_new_page_save" icon="check">${i18n("universal_save")}</mdui-button>
                <mdui-button id="create_new_page_close" icon="close" variant="outlined">${i18n("universal_close")}</mdui-button>`,
    });

    document.querySelector("#create_new_page_save").addEventListener("click", async () => {
        const newPageTitle = document.querySelector("#create_new_page_title").value;
        const newPageFilename = document.querySelector("#create_new_page_filename").value;
        const newPageDisplayInMenu = document.querySelector("#create_new_page_display_in_menu").checked;
        const newPageMenuName = document.querySelector("#create_new_page_menu_name").value;
        const newPageOpenInNewTab = document.querySelector("#create_new_page_open_in_new_tab").checked;
        const newPageEnableComments = document.querySelector("#create_new_page_enable_comments").checked;

        if (newPageTitle.trim() === "" || newPageFilename.trim() === "") {
            window.alert(i18n("blogmanager_pages_create_new_page_empty"));
            return;
        }
        if (bbg.blogData["页面列表"].find((item) => item["文件名"] === newPageFilename) !== undefined) {
            window.alert(i18n("blogmanager_pages_create_new_page_exists"));
            return;
        }

        bbg.blogData["页面列表"].push({
            "页面标题": newPageTitle,
            "文件名": newPageFilename,
            "是否显示在菜单中": newPageDisplayInMenu,
            "若显示在菜单中，则在菜单中显示为": newPageMenuName,
            "是否在新标签页打开": newPageOpenInNewTab,
            "启用评论": newPageEnableComments
        });

        await bbg.fs.createFile(bbg.blogPagesDirHandle, newPageFilename);

        await bbg.saveBlogDataFile();

        dialog.open = false;
        await bbg.routePage("/manage/pages");
    });

    document.querySelector("#create_new_page_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

function openEditPageMetaDialog(pageId) {
    const pageData = bbg.blogData["页面列表"][pageId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_pages_editmeta_title"),
        body: /* html */ `
                <mdui-text-field label="${i18n("blogmanager_pages_editmeta_page_title")}" value="${xss(pageData["页面标题"])}" id="edit_page_meta_title"></mdui-text-field>
                <br /><br />
                <mdui-checkbox id="blogmanager_pages_editmeta_display_in_menu">${i18n("blogmanager_pages_editmeta_display_in_menu")}</mdui-checkbox>
                <br /><br />
                <mdui-text-field label="${i18n("blogmanager_pages_editmeta_menu_name")}" value="${xss(pageData["若显示在菜单中，则在菜单中显示为"])}" id="blogmanager_pages_editmeta_menu_name"></mdui-text-field>
                <br /><br />
                <mdui-checkbox id="blogmanager_pages_editmeta_open_in_new_tab">${i18n("blogmanager_pages_editmeta_open_in_new_tab")}</mdui-checkbox>
                <br /><br />
                <mdui-checkbox id="blogmanager_pages_editmeta_enable_comments">${i18n("blogmanager_pages_editmeta_enable_comments")}</mdui-checkbox>
                <br /><br />
                <mdui-button id="edit_page_meta_save" icon="check">${i18n("universal_save")}</mdui-button>
                <mdui-button id="edit_page_meta_close" icon="close" variant="outlined">${i18n("universal_close")}</mdui-button>`,
    });

    document.querySelector("#blogmanager_pages_editmeta_display_in_menu").setAttribute("checked", pageData["是否显示在菜单中"]);
    document.querySelector("#blogmanager_pages_editmeta_open_in_new_tab").setAttribute("checked", pageData["是否在新标签页打开"]);
    document.querySelector("#blogmanager_pages_editmeta_enable_comments").setAttribute("checked", pageData["启用评论"]);

    document.querySelector("#edit_page_meta_save").addEventListener("click", async () => {
        bbg.blogData["页面列表"][pageId]["页面标题"] = document.querySelector("#edit_page_meta_title").value;
        bbg.blogData["页面列表"][pageId]["是否显示在菜单中"] = document.querySelector("#blogmanager_pages_editmeta_display_in_menu").checked;
        bbg.blogData["页面列表"][pageId]["若显示在菜单中，则在菜单中显示为"] = document.querySelector("#blogmanager_pages_editmeta_menu_name").value;
        bbg.blogData["页面列表"][pageId]["是否在新标签页打开"] = document.querySelector("#blogmanager_pages_editmeta_open_in_new_tab").checked;
        bbg.blogData["页面列表"][pageId]["启用评论"] = document.querySelector("#blogmanager_pages_editmeta_enable_comments").checked;
        await bbg.saveBlogDataFile();

        dialog.open = false;
        await bbg.routePage("/manage/pages");
    });

    document.querySelector("#edit_page_meta_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

function openModifyPageFilenameDialog(pageId) {
    const pageData = bbg.blogData["页面列表"][pageId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_pages_more_modify_filename"),
        body: /* html */ `
                <mdui-text-field label="${i18n("blogmanager_pages_modify_filename_newname")}" value="${xss(pageData["文件名"])}" id="modify_page_filename_newname"></mdui-text-field>
                <br /><br />
                <mdui-button id="modify_page_filename_save" icon="check">${i18n("universal_save")}</mdui-button>
                <mdui-button id="modify_page_filename_close" icon="close" variant="outlined">${i18n("universal_close")}</mdui-button>`,
    });

    document.querySelector("#modify_page_filename_save").addEventListener("click", async () => {
        const newFilename = document.querySelector("#modify_page_filename_newname").value;
        if (newFilename.trim() === "") {
            window.alert(i18n("blogmanager_pages_modify_filename_empty"));
            return;
        }
        if (newFilename === pageData["文件名"]) {
            window.alert(i18n("blogmanager_pages_modify_filename_same"));
            return;
        }
        if (bbg.blogData["页面列表"].find((item) => item["文件名"] === newFilename) !== undefined) {
            window.alert(i18n("blogmanager_pages_modify_filename_exists"));
            return;
        }

        console.log(pageData["文件名"], newFilename);

        await bbg.fs.renameFile(bbg.blogPagesDirHandle, pageData["文件名"], newFilename);

        bbg.blogData["页面列表"][pageId]["文件名"] = newFilename;

        await bbg.saveBlogDataFile();

        dialog.open = false;
        await bbg.routePage("/manage/pages");
    });

    document.querySelector("#modify_page_filename_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

function openDeletePageDialog(pageId) {
    const pageData = bbg.blogData["页面列表"][pageId];
    const dialog = mdui.dialog({
        headline: i18n("blogmanager_pages_delete_title"),
        body: /* html */ `
                    <p>${i18n("blogmanager_pages_delete_confirm")} <b>${xss(pageData["页面标题"])}</b>?</p>
                    <br />
                    <mdui-button id="delete_page_confirm" icon="delete" variant="outlined">${i18n("universal_delete")}</mdui-button>
                    <mdui-button id="delete_page_cancel" icon="close" variant="outlined">${i18n("universal_cancel")}</mdui-button>`,
    });

    document.querySelector("#delete_page_confirm").addEventListener("click", async () => {
        bbg.blogData["页面列表"].splice(pageId, 1);
        await bbg.saveBlogDataFile();

        dialog.open = false;
        await bbg.routePage("/manage/pages");
    });

    document.querySelector("#delete_page_cancel").addEventListener("click", () => {
        dialog.open = false;
    });
}

export default function () {
    document.querySelector("#app").innerHTML = /* html */ `
                                                <div id="blogmanager_page_app_bar">
                                                </div>

                                                <mdui-layout>
                                                    <mdui-layout-item id="blog_manager_nav_rail">
                                                    </mdui-layout-item>
                                                    <mdui-layout-main>
                                                        <mdui-card id="blog_manager_page_card">
                                                            <mdui-card-content>
                                                                <div class="mdui-prose">
                                                                    <h1>${i18n("blogmanager_pages_title")} <mdui-button icon="add" variant="outlined" style="margin-left:20px" id="blog_manager_pages_add_new_page_btn">${i18n("blogmanager_pages_add_new_page")}</mdui-button></h1>
                                                                    <p>${i18n("blogmanager_pages_desc")}</p>
                                                                    <br />
                                                                    <div id="blog_manager_pages_list">

                                                                    </div>
                                                                </div>

                                                            </mdui-card-content>
                                                        </mdui-card>
                                                    </mdui-layout-main>
                                                </mdui-layout>`;

    bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", i18n("blogmanager_title_prefix") + i18n("blogmanager_pages_title"));
    let pagesHtml = "";
    for (let i = 0; i < bbg.blogData["页面列表"].length; i++) {
        pagesHtml += /* html */ `
                        <mdui-card id="blog_manager_page_card_${i}" class="blog_manager_pages_page_card" variant="elevated">
                            <mdui-card-content>
                                <h1><a href="javascript:void(0)">${xss(bbg.blogData["页面列表"][i]["页面标题"])}</a> <mdui-chip icon="${bbg.blogData["页面列表"][i]["是否显示在菜单中"] ? "check" : "close"}">${bbg.blogData["页面列表"][i]["是否显示在菜单中"] ? i18n("blogmanager_pages_display_in_menu") : i18n("blogmanager_pages_not_display_in_menu")}</mdui-chip></h1>
                                <mdui-button icon="edit" id="page_${i}_card_edit">${i18n("blogmanager_pages_preview_edit")}</mdui-button>
                                <mdui-button icon="edit_note" id="page_${i}_card_edit_meta" variant="outlined">${i18n("blogmanager_pages_edit_meta")}</mdui-button>
                                <mdui-dropdown>
                                    <mdui-button slot="trigger" icon="more_horiz" variant="outlined">${i18n("blogmanager_pages_more")}</mdui-button>
                                    <mdui-menu>
                                        <mdui-menu-item icon="insert_drive_file" id="page_${i}_card_modify_filename">${i18n("blogmanager_pages_more_modify_filename")}</mdui-menu-item>
                                        <mdui-menu-item icon="delete" id="page_${i}_card_delete">${i18n("blogmanager_pages_more_delete")}</mdui-menu-item>
                                </mdui-dropdown>
                            </mdui-card-content>
                        </mdui-card>`;

    }
    document.querySelector("#blog_manager_pages_list").innerHTML = pagesHtml;

    document.querySelector("#blog_manager_pages_add_new_page_btn").addEventListener("click", async () => {
        openCreateNewPageDialog();
    });

    for (let i = 0; i < bbg.blogData["页面列表"].length; i++) {
        document.querySelector(`#page_${i}_card_edit`).addEventListener("click", async () => {
            await bbg.routePage(`/manage/pages/${bbg.blogData["页面列表"][i]["文件名"]}`);
        }
        );

        document.querySelector(`#page_${i}_card_edit_meta`).addEventListener("click", async () => {
            bbg.openEditPageMetaDialog(i);
        });

        document.querySelector(`#page_${i}_card_modify_filename`).addEventListener("click", async () => {
            bbg.openModifyPageFilenameDialog(i);
        });

        document.querySelector(`#page_${i}_card_delete`).addEventListener("click", async () => {
            bbg.openDeletePageDialog(i);
        });
    }
}