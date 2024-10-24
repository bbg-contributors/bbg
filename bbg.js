import * as mdui from "https://unpkg.com/mdui@2/mdui.esm.js";
import xss from "https://esm.sh/xss@1.0.15";
import localforage from "https://esm.sh/localforage@1.10.0";
import { marked } from "https://unpkg.com/marked@7.0.5/lib/marked.esm.js";
import flatpickr from "https://unpkg.com/flatpickr@4.6.13/dist/esm/index.js";
import sjcl from "https://esm.sh/sjcl@1.0.8";

const bbg = new Object();

// global settings

bbg.app = {
    version_arr: ["0.1", "alpha"]
}

bbg.app.version_str = bbg.app.version_arr.join("");

// theme support

bbg.setDefaultTheme = () => {
    window.localStorage.setItem("themeType", "auto");
    window.localStorage.setItem("themeColor", "#6699cc");
}

if (window.localStorage.getItem("themeType") === null) {
    bbg.setDefaultTheme();
}

mdui.setTheme(window.localStorage.getItem("themeType"));
mdui.setColorScheme(window.localStorage.getItem("themeColor"));
document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(" + window.getComputedStyle(document.documentElement).getPropertyValue('--mdui-color-primary-container') + ")");

// translation / i18n support

bbg.availableLanguages = ["zh_CN", "en_US", "ja_JP"];

bbg.setDefaultLanguage = () => {
    const currentBrowserLanguage = navigator.language;

    // logic of judge default language
    let defaultLanguage;
    if (currentBrowserLanguage.includes("zh")) {
        defaultLanguage = "zh_CN";
    } else if (currentBrowserLanguage.includes("ja")) {
        defaultLanguage = "ja_JP";
    } else {
        defaultLanguage = "en_US";
    }

    window.localStorage.setItem("language", defaultLanguage);
}

if (window.localStorage.getItem("language") === null) {
    bbg.setDefaultLanguage();
}

// fetch language files

bbg.currentLanguage = window.localStorage.getItem("language");
if (!bbg.availableLanguages.includes(bbg.currentLanguage)) {
    bbg.setDefaultLanguage();
    bbg.currentLanguage = window.localStorage.getItem("language");
}
try {
    bbg.currentLanguageData = await (await fetch(`./translations/${bbg.currentLanguage}.json`)).json();
} catch (err) {
    console.error(`Error when fetching translation for current language (${bbg.currentLanguage}). Details: ${err}`);
};

// logic of fetch fallback language

bbg.englishLanguageData = null;
bbg.chineseLanguageData = null;

if (bbg.currentLanguage === "zh_CN") {
    bbg.chineseLanguageData = bbg.currentLanguageData;
}
else if (bbg.currentLanguage === "en_US") {
    bbg.englishLanguageData = bbg.currentLanguageData;
}

if (bbg.englishLanguageData === null) {
    try {
        bbg.englishLanguageData = await (await fetch(`./translations/en_US.json`)).json();
    } catch (err) {
        throw new Error(`Error when fetching language pack of en_US. Details: ${err}`);
    }
}

if (bbg.chineseLanguageData === null) {
    try {
        bbg.chineseLanguageData = await (await fetch(`./translations/zh_CN.json`)).json();
    } catch (err) {
        throw new Error(`Error when fetching language pack of zh_CN. Details: ${err}`);
    }

}

bbg.i18n = (k) => {
    if (Object.keys(bbg.currentLanguageData).includes(k)) {
        return bbg.currentLanguageData[k];
    } else {
        if (Object.keys(bbg.englishLanguageData).includes(k)) {
            return bbg.englishLanguageData[k];
        } else if (Object.keys(bbg.chineseLanguageData).includes(k)) {
            return bbg.chineseLanguageData[k];
        } else {
            console.error(`Error in bbg.i18n func: Unable to find translation for key '${k}' in current language (${bbg.currentLanguage}) nor in English or Chinese language pack.`);
            return "(null)";
        }
    }
}

// render functions

bbg.renderStartPage = () => {
    const startPageTemplate = /* html */ `
                                <div id="start_page_app_bar">
                                </div>
                                <div id="start_page_center_container">
                                    <mdui-card id="start_page_center_container_content">
                                        <mdui-list>
                                            <mdui-list-subheader>${bbg.i18n("startpage_list_subheader")}</mdui-list-subheader>
                                            <mdui-list-item icon="folder_open" end-icon="arrow_right" id="startpage_openblog_btn">${bbg.i18n("startpage_openblog")}</mdui-list-item>
                                            <mdui-list-item icon="add" end-icon="arrow_right">${bbg.i18n("startpage_createblog")}</mdui-list-item>
                                            <mdui-list-item icon="history" end-icon="arrow_right">${bbg.i18n("startpage_recentopen")}</mdui-list-item>
                                            <mdui-dropdown>
                                                <mdui-list-item icon="settings" end-icon="arrow_right" slot="trigger">${bbg.i18n("startpage_appsetting")}</mdui-list-item>
                                                <mdui-menu>
                                                    <mdui-menu-item icon="language" id="startpage_setting_switch_lang_btn">${bbg.i18n("appsetting_switchlang")}</mdui-menu-item>
                                                    <mdui-menu-item icon="assistant">${bbg.i18n("appsetting_aiapi")}</mdui-menu-item>
                                                    <mdui-menu-item icon="style" id="startpage_setting_customize_theme_btn">${bbg.i18n("appsetting_customize")}</mdui-menu-item>
                                                </mdui-menu>
                                            </mdui-dropdown>
                                            <mdui-list-subheader>${bbg.i18n("startpage_cntversion")}${bbg.app.version_str}</mdui-list-subheader>
                                        </mdui-list>
                                    </mdui-card>
                                </div>`;
    document.querySelector("#app").innerHTML = startPageTemplate;
    document.querySelector("#startpage_openblog_btn").addEventListener("click", () => {
        bbg.openBlogDirectory();
    });
    document.querySelector("#startpage_setting_switch_lang_btn").addEventListener("click", () => {
        bbg.openSwitchLanguageDialog();
    });
    document.querySelector("#startpage_setting_customize_theme_btn").addEventListener("click", () => {
        bbg.openCustomizeThemeDialog();
    });

    bbg.renderTitleBar("start_page_app_bar", bbg.i18n("startpage_title"));
}

bbg.renderFailureToRoutePage = () => {
    document.querySelector("#app").innerHTML = /* html */ `
                                                <div id="failure_to_route_page_container">
                                                    <mdui-card id="failure_to_route_page_card">
                                                        <mdui-card-content>
                                                            <h1><mdui-icon name="error" style="font-size:30px"></mdui-icon> ${bbg.i18n("failureroute_title")}${xss(bbg.cntPath)}</h1>
                                                            <p>${bbg.i18n("failureroute_desc")}</p>
                                                        </mdui-card-content>
                                                    </mdui-card>
                                                </div>`;
}

bbg.renderNavRail = async (targetElemId) => {
    const navRailTemplate = /* html */ `
                            <mdui-navigation-rail value="index" id="navrail">
                                <mdui-navigation-rail-item icon="home" value="index" id="navrail_index">${bbg.i18n("blogmanager_index")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="article" value="articles" id="navrail_articles">${bbg.i18n("blogmanager_articles")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="pages" value="pages" id="navrail_pages">${bbg.i18n("blogmanager_pages")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="settings" value="settings" id="navrail_settings">${bbg.i18n("blogmanager_settings")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="preview" value="preview" id="navrail_preview">${bbg.i18n("blogmanager_preview")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="publish" value="publish" id="navrail_publish">${bbg.i18n("blogmanager_publish")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="exit_to_app" value="exit" id="navrail_exit">${bbg.i18n("blogmanager_exit")}</mdui-navigation-rail-item>
                            </mdui-navigation-rail>`;
    document.querySelector("#" + targetElemId).innerHTML = navRailTemplate;
    document.querySelector("#navrail_index").addEventListener("click", async () => {
        await bbg.routePage("/manage/index");
        document.querySelector("#navrail").value = "index";
    });
    document.querySelector("#navrail_articles").addEventListener("click", async () => {
        await bbg.routePage("/manage/articles");
        document.querySelector("#navrail").value = "articles";
    });
    document.querySelector("#navrail_pages").addEventListener("click", async () => {
        await bbg.routePage("/manage/pages");
        document.querySelector("#navrail").value = "pages";
    });
    document.querySelector("#navrail_settings").addEventListener("click", async () => {
        await bbg.routePage("/manage/settings");
        document.querySelector("#navrail").value = "settings";
    });
    document.querySelector("#navrail_preview").addEventListener("click", async () => {
        await bbg.routePage("/manage/preview");
        document.querySelector("#navrail").value = "preview";
    });
    document.querySelector("#navrail_publish").addEventListener("click", async () => {
        await bbg.routePage("/manage/publish");
        document.querySelector("#navrail").value = "publish";
    });
    document.querySelector("#navrail_exit").addEventListener("click", async () => {
        await bbg.routePage("/start");
        document.querySelector("#navrail").value = "exit";
    });

    switch (bbg.cntPath) {
        case "/manage/index":
            document.querySelector("#navrail").value = "index";
            break;
        case "/manage/articles":
            document.querySelector("#navrail").value = "articles";
            break;
        case "/manage/pages":
            document.querySelector("#navrail").value = "pages";
            break;
        case "/manage/settings":
            document.querySelector("#navrail").value = "settings";
            break;
        case "/manage/preview":
            document.querySelector("#navrail").value = "preview";
            break;
        case "/manage/publish":
            document.querySelector("#navrail").value = "publish";
            break;
        case "/start":
            document.querySelector("#navrail").value = "exit";
            break;
        default:
            document.querySelector("#navrail").value = "index";
            break;
    }
}

bbg.renderTitleBar = (targetElemId, expectedContent) => {
    const titleBarTemplate = /* html */ `       <mdui-top-app-bar class="titlebar_browser">
                                                    <mdui-button-icon icon="menu"></mdui-button-icon>
                                                    <mdui-top-app-bar-title>${expectedContent}</mdui-top-app-bar-title>
                                                    <div style="flex-grow: 1"></div>
                                                    <mdui-button-icon icon="more_vert"></mdui-button-icon>
                                                </mdui-top-app-bar>
                                <div class="titlebar_pwa">
                                    <img src="favicon.png" width="20" height="20" style="padding-left:5px;margin-right:10px" />
                                    <div class="mdui-prose">
                                        <span style="font-size:14px">${expectedContent}</span>
                                    </div>
                                    </label>
                                </div>
                            `;
    document.querySelector("#" + targetElemId).innerHTML = titleBarTemplate;

}

bbg.renderBlogManagerIndexPage = async () => {
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
                                                                    <h2>${bbg.i18n("blogmanager_index_good" + bbg.getCurrentTimeType())}</h2>
                                                                    <p>${bbg.i18n("blogmanager_index_intro_seg1")} <a href="javascript:void(0)"><b>${xss(bbg.blogData["博客标题"])}</b></a>${bbg.i18n("blogmanager_index_intro_seg2")} <a href="javascript:void(0)"><b>${xss(bbg.blogData["博客描述（副标题）"])}</b></a>${bbg.i18n("blogmanager_index_intro_seg3")}</p>
                                                                    <br />
                                                                    <mdui-button icon="edit_note" variant="outlined">${bbg.i18n("blogmanager_index_editname_or_desc")}</mdui-button>
                                                                    <mdui-button icon="preview" variant="outlined">${bbg.i18n("blogmanager_index_preview_site")}</mdui-button>
                                                                    <hr />
                                                                    <h1>${bbg.i18n("blogmanager_index_recent_articles")} &nbsp;&nbsp;<mdui-button icon="edit" variant="text">${bbg.i18n("blogmanager_index_add_new_article")}</mdui-button></h1>
                                                                    <ul id="blog_manager_index_recent_articles">

                                                                    </ul>
                                                                </div>
                                                                
                                                            </mdui-card-content>
                                                        </mdui-card>
                                                    </mdui-layout-main>
                                                </mdui-layout>`;
    await bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", bbg.i18n("blogmanager_title_prefix") + bbg.i18n("blogmanager_index"));
    let recentArticlesHtml = "";
    for (let i = 0; i < 3 && i < bbg.blogData["文章列表"].length; i++) {
        recentArticlesHtml += `<li><a href="javascript:void(0)">${xss(bbg.blogData["文章列表"][i]["文章标题"])}</a></li>`;
    }
    document.querySelector("#blog_manager_index_recent_articles").innerHTML = recentArticlesHtml;
}

bbg.renderBlogManagerArticlesPage = async () => {
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
                                                                    <h1>${bbg.i18n("blogmanager_articles_title")} <mdui-button icon="add" variant="outlined" style="margin-left:20px" id="blog_manager_articles_add_new_article_btn">${bbg.i18n("blogmanager_articles_add_new_article")}</mdui-button></h1>
                                                                    <p>${bbg.i18n("blogmanager_articles_desc")}</p>
                                                                    <br />
                                                                    <div id="blog_manager_articles_list">

                                                                    </div>
                                                                </div>
                                                                
                                                            </mdui-card-content>
                                                        </mdui-card>
                                                    </mdui-layout-main>
                                                </mdui-layout>`;
    await bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", bbg.i18n("blogmanager_title_prefix") + bbg.i18n("blogmanager_articles_title"));
    let articlesHtml = "";
    for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
        console.log(bbg.blogData["文章列表"][i]);
        articlesHtml += /* html */ `
                        <mdui-card id="blog_manager_article_card_${i}" class="blog_manager_articles_article_card" variant="elevated">
                            <mdui-card-content>
                                <h1><a href="javascript:void(0)">${xss(bbg.blogData["文章列表"][i]["文章标题"])}</a> <mdui-chip icon="calendar_month">${new Date(bbg.blogData["文章列表"][i]["创建时间（时间戳）"]).toLocaleString()}</mdui-chip> <mdui-chip icon="history">${new Date(bbg.blogData["文章列表"][i]["修改时间（时间戳）"]).toLocaleString()}</mdui-chip></h1>
                                <p>${bbg.blogData["文章列表"][i]["摘要"].trim() === "" ? bbg.i18n("blogmanager_articles_emptydesc") : xss(bbg.blogData["文章列表"][i]["摘要"])}</p>
                                <mdui-button icon="edit" id="article_${i}_card_edit">${bbg.i18n("blogmanager_articles_preview_edit")}</mdui-button>
                                <mdui-button icon="edit_note" id="article_${i}_card_edit_meta" variant="outlined">${bbg.i18n("blogmanager_articles_edit_meta")}</mdui-button>
                                <mdui-dropdown>
                                    <mdui-button slot="trigger" icon="more_horiz" variant="outlined">${bbg.i18n("blogmanager_articles_more")}</mdui-button>
                                    <mdui-menu>
                                        <mdui-menu-item icon="insert_drive_file" id="article_${i}_card_modify_filename">${bbg.i18n("blogmanager_articles_more_modify_filename")}</mdui-menu-item>
                                        <mdui-menu-item icon="delete" id="article_${i}_card_delete">${bbg.i18n("blogmanager_articles_more_delete")}</mdui-menu-item>
                                        <mdui-menu-item icon="lock" id="article_${i}_card_encrypt_article">${typeof (bbg.blogData["文章列表"][i]["是否加密"]) === "undefined" || bbg.blogData["文章列表"][i]["是否加密"] === false ? bbg.i18n("blogmanager_articles_more_encrypt") : bbg.i18n("blogmanager_articles_modify_envryption")}</mdui-menu-item>
                                        <mdui-menu-item icon="reorder" id="article_${i}_card_modify_reorder">${bbg.i18n("blogmanager_articles_more_modify_order")}</mdui-menu-item>
                                </mdui-dropdown>
                            </mdui-card-content>
                        </mdui-card>`;

    }
    document.querySelector("#blog_manager_articles_list").innerHTML = articlesHtml;

    document.querySelector("#blog_manager_articles_add_new_article_btn").addEventListener("click", async () => {
        await bbg.openCreateNewArticleDialog();
    });



    for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
        document.querySelector(`#article_${i}_card_edit`).addEventListener("click", async () => {
            await bbg.routePage(`/manage/articles/${bbg.blogData["文章列表"][i]["文件名"]}`);
        });

        document.querySelector(`#article_${i}_card_edit_meta`).addEventListener("click", async () => {
            bbg.openEditArticleMetaDialog(i);
        });

        document.querySelector(`#article_${i}_card_modify_filename`).addEventListener("click", async () => {
            bbg.openModifyArticleFilenameDialog(i);
        });

        document.querySelector(`#article_${i}_card_delete`).addEventListener("click", async () => {
            bbg.openDeleteArticleDialog(i);
        });

        document.querySelector(`#article_${i}_card_encrypt_article`).addEventListener("click", async () => {
            if (typeof (bbg.blogData["文章列表"][i]["是否加密"]) === "undefined" || bbg.blogData["文章列表"][i]["是否加密"] === false) {
                bbg.openEncryptArticleDialog(i);
            } else {
                bbg.openModifyEncryptionDialog(i);
            }
        });

        document.querySelector(`#article_${i}_card_modify_reorder`).addEventListener("click", async () => {
            bbg.openModifyArticleOrderDialog(i);
        });

    }
}

bbg.renderBlogManagerPagesPage = async () => {
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
                                                                    <h1>${bbg.i18n("blogmanager_pages_title")} <mdui-button icon="add" variant="outlined" style="margin-left:20px" id="blog_manager_pages_add_new_page_btn">${bbg.i18n("blogmanager_pages_add_new_page")}</mdui-button></h1>
                                                                    <p>${bbg.i18n("blogmanager_pages_desc")}</p>
                                                                    <br />
                                                                    <div id="blog_manager_pages_list">

                                                                    </div>
                                                                </div>

                                                            </mdui-card-content>
                                                        </mdui-card>
                                                    </mdui-layout-main>
                                                </mdui-layout>`;

    await bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", bbg.i18n("blogmanager_title_prefix") + bbg.i18n("blogmanager_pages_title"));
    let pagesHtml = "";
    for (let i = 0; i < bbg.blogData["页面列表"].length; i++) {
        pagesHtml += /* html */ `
                        <mdui-card id="blog_manager_page_card_${i}" class="blog_manager_pages_page_card" variant="elevated">
                            <mdui-card-content>
                                <h1><a href="javascript:void(0)">${xss(bbg.blogData["页面列表"][i]["页面标题"])}</a> <mdui-chip icon="${bbg.blogData["页面列表"][i]["是否显示在菜单中"]?"check":"close"}">${bbg.blogData["页面列表"][i]["是否显示在菜单中"]?bbg.i18n("blogmanager_pages_display_in_menu"):bbg.i18n("blogmanager_pages_not_display_in_menu")}</mdui-chip></h1>
                                <mdui-button icon="edit" id="page_${i}_card_edit">${bbg.i18n("blogmanager_pages_preview_edit")}</mdui-button>
                                <mdui-button icon="edit_note" id="page_${i}_card_edit_meta" variant="outlined">${bbg.i18n("blogmanager_pages_edit_meta")}</mdui-button>
                                <mdui-dropdown>
                                    <mdui-button slot="trigger" icon="more_horiz" variant="outlined">${bbg.i18n("blogmanager_pages_more")}</mdui-button>
                                    <mdui-menu>
                                        <mdui-menu-item icon="insert_drive_file" id="page_${i}_card_modify_filename">${bbg.i18n("blogmanager_pages_more_modify_filename")}</mdui-menu-item>
                                        <mdui-menu-item icon="delete" id="page_${i}_card_delete">${bbg.i18n("blogmanager_pages_more_delete")}</mdui-menu-item>
                                </mdui-dropdown>
                            </mdui-card-content>
                        </mdui-card>`;

    }
    document.querySelector("#blog_manager_pages_list").innerHTML = pagesHtml;

    document.querySelector("#blog_manager_pages_add_new_page_btn").addEventListener("click", async () => {
        await bbg.openCreateNewPageDialog();
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

bbg.openCreateNewPageDialog = async () => {
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_pages_add_new_page"),
        body: /* html */ `
                <mdui-text-field label="${bbg.i18n("blogmanager_pages_create_new_page_filename")}" id="create_new_page_filename" value="${bbg.generateRandomString(12)}.md"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${bbg.i18n("blogmanager_pages_create_new_page_title")}" id="create_new_page_title"></mdui-text-field>
                <br /><br />
                <mdui-checkbox id="create_new_page_display_in_menu">${bbg.i18n("blogmanager_pages_create_new_page_display_in_menu")}</mdui-checkbox>
                <br /><br />
                <mdui-text-field label="${bbg.i18n("blogmanager_pages_create_new_page_menu_name")}" id="create_new_page_menu_name"></mdui-text-field>
                <br /><br />
                <mdui-checkbox id="create_new_page_open_in_new_tab">${bbg.i18n("blogmanager_pages_create_new_page_open_in_new_tab")}</mdui-checkbox>
                <br /><br />
                <mdui-checkbox id="create_new_page_enable_comments">${bbg.i18n("blogmanager_pages_create_new_page_enable_comments")}</mdui-checkbox>
                <br /><br />
                <mdui-button id="create_new_page_save" icon="check">${bbg.i18n("universal_save")}</mdui-button>
                <mdui-button id="create_new_page_close" icon="close" variant="outlined">${bbg.i18n("universal_close")}</mdui-button>`,
    });

    document.querySelector("#create_new_page_save").addEventListener("click", async () => {
        const newPageTitle = document.querySelector("#create_new_page_title").value;
        const newPageFilename = document.querySelector("#create_new_page_filename").value;
        const newPageDisplayInMenu = document.querySelector("#create_new_page_display_in_menu").checked;
        const newPageMenuName = document.querySelector("#create_new_page_menu_name").value;
        const newPageOpenInNewTab = document.querySelector("#create_new_page_open_in_new_tab").checked;
        const newPageEnableComments = document.querySelector("#create_new_page_enable_comments").checked;

        if (newPageTitle.trim() === "" || newPageFilename.trim() === "") {
            window.alert(bbg.i18n("blogmanager_pages_create_new_page_empty"));
            return;
        }
        if (bbg.blogData["页面列表"].find((item) => item["文件名"] === newPageFilename) !== undefined) {
            window.alert(bbg.i18n("blogmanager_pages_create_new_page_exists"));
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

bbg.openEditPageMetaDialog = async (pageId) => {
    const pageData = bbg.blogData["页面列表"][pageId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_pages_editmeta_title"),
        body: /* html */ `
                <mdui-text-field label="${bbg.i18n("blogmanager_pages_editmeta_page_title")}" value="${xss(pageData["页面标题"])}" id="edit_page_meta_title"></mdui-text-field>
                <br /><br />
                <mdui-checkbox id="blogmanager_pages_editmeta_display_in_menu">${bbg.i18n("blogmanager_pages_editmeta_display_in_menu")}</mdui-checkbox>
                <br /><br />
                <mdui-text-field label="${bbg.i18n("blogmanager_pages_editmeta_menu_name")}" value="${xss(pageData["若显示在菜单中，则在菜单中显示为"])}" id="blogmanager_pages_editmeta_menu_name"></mdui-text-field>
                <br /><br />
                <mdui-checkbox id="blogmanager_pages_editmeta_open_in_new_tab">${bbg.i18n("blogmanager_pages_editmeta_open_in_new_tab")}</mdui-checkbox>
                <br /><br />
                <mdui-checkbox id="blogmanager_pages_editmeta_enable_comments">${bbg.i18n("blogmanager_pages_editmeta_enable_comments")}</mdui-checkbox>
                <br /><br />
                <mdui-button id="edit_page_meta_save" icon="check">${bbg.i18n("universal_save")}</mdui-button>
                <mdui-button id="edit_page_meta_close" icon="close" variant="outlined">${bbg.i18n("universal_close")}</mdui-button>`,
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

bbg.openModifyPageFilenameDialog = async (pageId) => {
    const pageData = bbg.blogData["页面列表"][pageId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_pages_more_modify_filename"),
        body: /* html */ `
                <mdui-text-field label="${bbg.i18n("blogmanager_pages_modify_filename_newname")}" value="${xss(pageData["文件名"])}" id="modify_page_filename_newname"></mdui-text-field>
                <br /><br />
                <mdui-button id="modify_page_filename_save" icon="check">${bbg.i18n("universal_save")}</mdui-button>
                <mdui-button id="modify_page_filename_close" icon="close" variant="outlined">${bbg.i18n("universal_close")}</mdui-button>`,
    });

    document.querySelector("#modify_page_filename_save").addEventListener("click", async () => {
        const newFilename = document.querySelector("#modify_page_filename_newname").value;
        if (newFilename.trim() === "") {
            window.alert(bbg.i18n("blogmanager_pages_modify_filename_empty"));
            return;
        }
        if (newFilename === pageData["文件名"]) {
            window.alert(bbg.i18n("blogmanager_pages_modify_filename_same"));
            return;
        }
        if (bbg.blogData["页面列表"].find((item) => item["文件名"] === newFilename) !== undefined) {
            window.alert(bbg.i18n("blogmanager_pages_modify_filename_exists"));
            return;
        }

        console.log(pageData["文件名"],newFilename);
        
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

bbg.openDeletePageDialog = async (pageId) => {
    const pageData = bbg.blogData["页面列表"][pageId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_pages_delete_title"),
        body: /* html */ `
                <p>${bbg.i18n("blogmanager_pages_delete_confirm")} <b>${xss(pageData["页面标题"])}</b>?</p>
                <br />
                <mdui-button id="delete_page_confirm" icon="delete" variant="outlined">${bbg.i18n("universal_delete")}</mdui-button>
                <mdui-button id="delete_page_cancel" icon="close" variant="outlined">${bbg.i18n("universal_cancel")}</mdui-button>`,
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



bbg.renderMarkdownEditorPage = async () => {
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
                                                                    <p><mdui-button variant="text" id="mdeditor_backbtn" icon="arrow_back">${bbg.i18n("universal_back")}</mdui-button><span id="mdeditor_toolbar"></span></p>
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
    await bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", bbg.i18n("blogmanager_title_prefix") + bbg.i18n("blogmanager_mdeditor_title"));

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

    let mdeditor_actual_title = (bbg.mdeditorCurrentStatus !== "preview_only" ? bbg.i18n("blogmanager_mdeditor_currentediting") : bbg.i18n("blogmanager_mdeditor_currentpreviewing")) + (fileType === "articles" ? itemData["文章标题"] : itemData["页面标题"]);


    document.querySelector("#mdeditor_actual_title").innerText = mdeditor_actual_title;

    function renderMarkdownPreview() {
        document.querySelector("#mdeditor_preview_area").innerHTML = marked(markdownFileText);

        document.querySelector("#mdeditor_editing_area").style.display = "none";
        document.querySelector("#mdeditor_preview_area").style.display = "block";
        document.querySelector("#mdeditor_preview_area").style.left = "2vw";
        document.querySelector("#mdeditor_preview_area").style.width = "80vw";

        mdeditor_actual_title = bbg.i18n("blogmanager_mdeditor_currentpreviewing") + (fileType === "articles" ? itemData["文章标题"] : itemData["页面标题"]);
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

        mdeditor_actual_title = bbg.i18n("blogmanager_mdeditor_currentediting") + (fileType === "articles" ? itemData["文章标题"] : itemData["页面标题"]);

        document.querySelector("#mdeditor_actual_title").innerText = mdeditor_actual_title;


        document.querySelector("#mdeditor_editing_area").addEventListener("input", previewWhenEditing);
    }

    function renderPreviewToolbar() {
        const template = /* html */ `<mdui-button id="mdeditor_switch_to_editing_mode" variant="outlined" icon="edit">${bbg.i18n("blogmanager_mdeditor_switch_to_editing_mode")}</mdui-button>`;
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
                            <mdui-button id="mdeditor_save" variant="outlined" icon="save">${bbg.i18n("blogmanager_mdeditor_savechanges")}</mdui-button>
                            <mdui-button id="mdeditor_switch_to_preview_mode" variant="outlined" icon="preview">${bbg.i18n("blogmanager_mdeditor_switch_to_preview_mode")}</mdui-button>`;
        document.querySelector("#mdeditor_toolbar").innerHTML = template;
        document.querySelector("#mdeditor_save").addEventListener("click", async () => {
            await bbg.fs.writeFile(markdownFileHandle, document.getElementById("mdeditor_editing_area").value);
            window.alert(bbg.i18n("blogmanager_mdeditor_save_success"));
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

bbg.openEditArticleMetaDialog = async (articleId) => {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_articles_editmeta_title"),
        body: /* html */ `
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_editmeta_article_title")}" value="${xss(articleData["文章标题"])}" id="edit_article_meta_title"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_editmeta_article_desc")}" value="${xss(articleData["摘要"])}" id="edit_article_meta_desc" autosize min-rows="2" max-rows="5"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_editmeta_article_tags")}" value="${xss(articleData["标签"].join(","))}" id="edit_article_meta_tags"></mdui-text-field>
                <br /><br />
                <div class="mdui-prose">
                <div><span class="timedatepicker">${bbg.i18n("blogmanager_articles_editmeta_article_publishdate")}</span><input id="edit_meta_dialog_publish_date_picker" /></div></div>
                <br />
                <div><span class="timedatepicker">${bbg.i18n("blogmanager_articles_editmeta_article_lastmodifydate")}</span><input id="edit_meta_dialog_lastmodified_date_picker" /></div></div>
                </div>
                <br />
                <mdui-checkbox id="blogmanager_articles_editmeta_enable_comment">${bbg.i18n("blogmanager_articles_editmeta_enable_comment")}</mdui-checkbox>
                <br />
                <mdui-checkbox id="blogmanager_articles_editmeta_on_top">${bbg.i18n("blogmanager_articles_editmeta_on_top")}</mdui-checkbox>
                <br />
                <mdui-checkbox id="blogmanager_articles_editmeta_hide_the_article">${bbg.i18n("blogmanager_articles_editmeta_hide_the_article")}</mdui-checkbox>
                <br /><br />
                <mdui-button id="edit_article_meta_save" icon="check">${bbg.i18n("universal_save")}</mdui-button>
                <mdui-button id="edit_article_meta_close" icon="close" variant="outlined">${bbg.i18n("universal_close")}</mdui-button>`,
    });

    flatpickr("#edit_meta_dialog_publish_date_picker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date(articleData["创建时间（时间戳）"]),
    });

    flatpickr("#edit_meta_dialog_lastmodified_date_picker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date(articleData["修改时间（时间戳）"])
    });

    document.querySelector("#blogmanager_articles_editmeta_enable_comment").setAttribute("checked", articleData["启用评论"]);
    document.querySelector("#blogmanager_articles_editmeta_on_top").setAttribute("checked", articleData["是否置顶"]);
    document.querySelector("#blogmanager_articles_editmeta_hide_the_article").setAttribute("checked", articleData["是否隐藏"]);

    document.querySelector("#edit_article_meta_save").addEventListener("click", async () => {
        bbg.blogData["文章列表"][articleId]["文章标题"] = document.querySelector("#edit_article_meta_title").value;
        bbg.blogData["文章列表"][articleId]["摘要"] = document.querySelector("#edit_article_meta_desc").value;
        bbg.blogData["文章列表"][articleId]["标签"] = document.querySelector("#edit_article_meta_tags").value.split(",");
        console.log(new Date(document.querySelector("#edit_meta_dialog_publish_date_picker").value).getTime());
        bbg.blogData["文章列表"][articleId]["创建时间（时间戳）"] = new Date(document.querySelector("#edit_meta_dialog_publish_date_picker").value).getTime();
        bbg.blogData["文章列表"][articleId]["修改时间（时间戳）"] = new Date(document.querySelector("#edit_meta_dialog_lastmodified_date_picker").value).getTime();
        bbg.blogData["文章列表"][articleId]["启用评论"] = document.querySelector("#blogmanager_articles_editmeta_enable_comment").checked;
        bbg.blogData["文章列表"][articleId]["是否置顶"] = document.querySelector("#blogmanager_articles_editmeta_on_top").checked;
        bbg.blogData["文章列表"][articleId]["是否隐藏"] = document.querySelector("#blogmanager_articles_editmeta_hide_the_article").checked;
        await bbg.saveBlogDataFile();
        dialog.open = false;
    });

    document.querySelector("#edit_article_meta_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

bbg.openModifyArticleFilenameDialog = async (articleId) => {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_articles_modifyfilename_title"),
        body: /* html */ `
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_modifyfilename_newfilename")}" value="${articleData["文件名"]}" id="modify_article_filename_newfilename"></mdui-text-field>
                <br /><br />
                <mdui-button id="modify_article_filename_save" icon="check">${bbg.i18n("universal_save")}</mdui-button>
                <mdui-button id="modify_article_filename_close" icon="close" variant="outlined">${bbg.i18n("universal_close")}</mdui-button>`,
    });

    document.querySelector("#modify_article_filename_save").addEventListener("click", async () => {
        const newFileName = document.querySelector("#modify_article_filename_newfilename").value;
        if (newFileName === articleData["文件名"]) {
            window.alert(bbg.i18n("blogmanager_articles_modifyfilename_samefilename"));
            return;
        }
        if (bbg.blogData["文章列表"].find((item) => item["文件名"] === newFileName) !== undefined) {
            window.alert(bbg.i18n("blogmanager_articles_modifyfilename_filenameexist"));
            return;
        }
        const oldFileName = articleData["文件名"];
        articleData["文件名"] = newFileName;
        await bbg.fs.renameFile(bbg.blogArticlesDirHandle, oldFileName, newFileName);
        await bbg.saveBlogDataFile();
        dialog.open = false;
    });

    document.querySelector("#modify_article_filename_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

bbg.openDeleteArticleDialog = async (articleId) => {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_articles_delete_title"),
        body: /* html */ `
                <p>${bbg.i18n("blogmanager_articles_delete_desc")}</p>
                <br />
                <mdui-button id="delete_article_confirm" icon="delete">${bbg.i18n("universal_delete")}</mdui-button>
                <mdui-button id="delete_article_cancel" icon="close" variant="outlined">${bbg.i18n("universal_cancel")}</mdui-button>`,
    });

    document.querySelector("#delete_article_confirm").addEventListener("click", async () => {
        const fileName = articleData["文件名"];
        bbg.blogData["文章列表"].splice(articleId, 1);
        await bbg.fs.removeFile(bbg.blogArticlesDirHandle, fileName);
        await bbg.saveBlogDataFile();
        dialog.open = false;
        bbg.routePage();
    }
    );

    document.querySelector("#delete_article_cancel").addEventListener("click", () => {
        dialog.open = false;
    }
    );
}

bbg.openCreateNewArticleDialog = async () => {
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_articles_newarticle_title"),
        body: /* html */ `
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_editmeta_filename")}" id="new_article_filename" value="${bbg.generateRandomString(12)}.md"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_editmeta_article_title")}" id="new_article_title"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_editmeta_article_desc")}" id="new_article_desc" autosize min-rows="2" max-rows="5"></mdui-text-field>
                <br /><br />
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_editmeta_article_tags")}" id="new_article_tags"></mdui-text-field>
                <br /><br />
                <div class="mdui-prose">
                <div><span class="timedatepicker">${bbg.i18n("blogmanager_articles_editmeta_article_publishdate")}</span><input id="new_article_publish_date_picker" /></div></div>
                <br />
                <mdui-checkbox checked id="blogmanager_articles_newarticle_enable_comment">${bbg.i18n("blogmanager_articles_editmeta_enable_comment")}</mdui-checkbox>
                <br />
                <mdui-checkbox id="blogmanager_articles_newarticle_on_top">${bbg.i18n("blogmanager_articles_editmeta_on_top")}</mdui-checkbox>
                <br />
                <mdui-checkbox id="blogmanager_articles_newarticle_hide_the_article">${bbg.i18n("blogmanager_articles_editmeta_hide_the_article")}</mdui-checkbox>
                <br /><br />
                <mdui-button id="new_article_save" icon="check">${bbg.i18n("universal_save")}</mdui-button>
                <mdui-button id="new_article_close" icon="close" variant="outlined">${bbg.i18n("universal_close")}</mdui-button>`,
    });

    flatpickr("#new_article_publish_date_picker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date(),
    });

    document.querySelector("#new_article_save").addEventListener("click", async () => {
        const newFileName = document.querySelector("#new_article_filename").value;
        if (bbg.blogData["文章列表"].find((item) => item["文件名"] === newFileName) !== undefined) {
            window.alert(bbg.i18n("blogmanager_articles_modifyfilename_filenameexist"));
            return;
        }

        if (!newFileName.endsWith(".md")) {
            window.alert(bbg.i18n("blogmanager_articles_newarticle_invalidfiletype"));
            return;
        }

        if (newFileName.trim() === "") {
            window.alert(bbg.i18n("blogmanager_articles_newarticle_emptyfilename"));
            return;
        }

        if (document.querySelector("#new_article_title").value.trim() === "") {
            window.alert(bbg.i18n("blogmanager_articles_newarticle_emptytitle"));
            return;
        }

        const newArticleData = {
            "文件名": newFileName,
            "文章标题": document.querySelector("#new_article_title").value,
            "摘要": document.querySelector("#new_article_desc").value,
            "标签": document.querySelector("#new_article_tags").value.split(","),
            "创建时间（时间戳）": new Date(document.querySelector("#new_article_publish_date_picker").value).getTime(),
            "修改时间（时间戳）": new Date(document.querySelector("#new_article_publish_date_picker").value).getTime(),
            "启用评论": document.querySelector("#blogmanager_articles_newarticle_enable_comment").checked,
            "是否置顶": document.querySelector("#blogmanager_articles_newarticle_on_top").checked,
            "是否隐藏": document.querySelector("#blogmanager_articles_newarticle_hide_the_article").checked,
        };
        bbg.blogData["文章列表"].unshift(newArticleData);
        await bbg.fs.createFile(bbg.blogArticlesDirHandle, newFileName);
        await bbg.saveBlogDataFile();
        dialog.open = false;
        bbg.routePage();
    });

    document.querySelector("#new_article_close").addEventListener("click", () => {
        dialog.open = false;
    }
    );

}

bbg.openEncryptArticleDialog = async (articleId) => {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_articles_more_encrypt"),
        body: /* html */ `
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_encrypt_pass")}" type="password" id="encrypt_article_password"></mdui-text-field>
                <br /><br />
                <mdui-button id="encrypt_article_confirm" icon="lock">${bbg.i18n("universal_confirm")}</mdui-button>
                <mdui-button id="encrypt_article_cancel" icon="close" variant="outlined">${bbg.i18n("universal_cancel")}</mdui-button>`,
    });

    document.querySelector("#encrypt_article_confirm").addEventListener("click", async () => {
        const password = document.querySelector("#encrypt_article_password").value;
        const original_content = await bbg.fs.readFile(await bbg.fs.getFileHandle(bbg.blogArticlesDirHandle, articleData["文件名"]));
        const encryptedContent = await bbg.content_encrypt(original_content, password);
        await bbg.fs.writeFile(await bbg.fs.getFileHandle(await bbg.blogArticlesDirHandle, articleData["文件名"]), encryptedContent);
        bbg.blogData["文章列表"][articleId]["是否加密"] = true;
        await bbg.saveBlogDataFile();
        await bbg.routePage();
        dialog.open = false;
    }
    );

    document.querySelector("#encrypt_article_cancel").addEventListener("click", () => {
        dialog.open = false;
    }
    );
}

bbg.openModifyEncryptionDialog = async (articleId) => {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_articles_modify_envryption"),
        body: /* html */ `
                <p>${bbg.i18n("blogmanager_articles_modify_encryption_desc")}</p>
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_encrypt_original_pass")}" type="password" id="modify_encrypt_article_original_password"></mdui-text-field>
                <mdui-text-field label="${bbg.i18n("blogmanager_articles_encrypt_new_pass")}" type="password" id="modify_encrypt_article_new_password"></mdui-text-field>
                <br /><br />
                <mdui-button id="modify_encrypt_article_confirm" icon="lock">${bbg.i18n("universal_confirm")}</mdui-button>
                <mdui-button id="modify_encrypt_article_cancel" icon="close" variant="outlined">${bbg.i18n("universal_cancel")}</mdui-button>
                `,
    });

    document.querySelector("#modify_encrypt_article_confirm").addEventListener("click", async () => {
        const original_password = document.querySelector("#modify_encrypt_article_original_password").value;
        const new_password = document.querySelector("#modify_encrypt_article_new_password").value;
        const original_content = await bbg.fs.readFile(await bbg.fs.getFileHandle(bbg.blogArticlesDirHandle, articleData["文件名"]));
        try {
            const decryptedContent = await bbg.content_decrypt(original_content, original_password);
            if (new_password.trim() === "") {
                await bbg.fs.writeFile(await bbg.fs.getFileHandle(bbg.blogArticlesDirHandle, articleData["文件名"]), decryptedContent);
                bbg.blogData["文章列表"][articleId]["是否加密"] = false;
                await bbg.saveBlogDataFile();
                bbg.routePage();
            } else {
                const encryptedContent = await bbg.content_encrypt(decryptedContent, new_password);
                await bbg.fs.writeFile(await bbg.fs.getFileHandle(bbg.blogArticlesDirHandle, articleData["文件名"]), encryptedContent);
            }
            dialog.open = false;
        } catch (error) {
            window.alert(bbg.i18n("blogmanager_articles_modify_envryption_wrongpass"));
        }
    }
    );

    document.querySelector("#modify_encrypt_article_cancel").addEventListener("click", () => {
        dialog.open = false;
    }
    );
}

bbg.openModifyArticleOrderDialog = async (articleId) => {
    const articleData = bbg.blogData["文章列表"][articleId];
    const dialog = mdui.dialog({
        headline: bbg.i18n("blogmanager_articles_more_modify_order"),
        body: /* html */ `
                <div class="mdui-prose">
                    <p>${bbg.i18n("blogmanager_articles_reorder_desc_seg1")}</p>
                    <mdui-list style="height:240px;overflow-y:auto" id="reorder_dialog_article_list">

                    </mdui-list>
                    <p>${bbg.i18n("blogmanager_articles_reorder_desc_seg2")}</p>
                        <mdui-radio-group id="blogmanager_articles_reorder_position" value="after">
                        <mdui-radio value="before">${bbg.i18n("blogmanager_articles_reorder_before")}</mdui-radio>
                        <mdui-radio value="after">${bbg.i18n("blogmanager_articles_reorder_after")}</mdui-radio>
                    </mdui-radio-group>
                </div>
                
                <br /><br />
                <mdui-button id="modify_article_order_save" icon="check">${bbg.i18n("universal_save")}</mdui-button>
                <mdui-button id="modify_article_order_close" icon="close" variant="outlined">${bbg.i18n("universal_close")}</mdui-button>`,
    });

    let articleListHtml = "";
    for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
        articleListHtml += /* html */ `<mdui-list-item id="reorder_dialog_article_list_${i}">${bbg.blogData["文章列表"][i]["文章标题"]}</mdui-list-item>`;
    }

    document.querySelector("#reorder_dialog_article_list").innerHTML = articleListHtml;

    for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
        document.querySelector(`#reorder_dialog_article_list_${i}`).addEventListener("click", () => {
            for (let j = 0; j < bbg.blogData["文章列表"].length; j++) {
                document.querySelector(`#reorder_dialog_article_list_${j}`).removeAttribute("active");
            }
            document.querySelector(`#reorder_dialog_article_list_${i}`).setAttribute("active", "");
        });
        if (i === articleId) {
            document.querySelector(`#reorder_dialog_article_list_${i}`).style.display="none";
        }
    }

    document.querySelector("#modify_article_order_save").addEventListener("click", async () => {
        for (let i = 0; i < bbg.blogData["文章列表"].length; i++) {
            if (document.querySelector(`#reorder_dialog_article_list_${i}`).hasAttribute("active")) {
                if (document.querySelector("#blogmanager_articles_reorder_position").value === "before") {
                    // code segment 1
                    bbg.blogData["文章列表"].splice(articleId, 1);
                    if (articleId < i) {
                        i = i - 1;
                    }
                    bbg.blogData["文章列表"].splice(i, 0, articleData);
                } else {
                    // code segment 2
                    bbg.blogData["文章列表"].splice(articleId, 1);
                    if (articleId < i) {
                        i = i - 1;
                    }
                    bbg.blogData["文章列表"].splice(i + 1, 0, articleData);
                }
                break;
            }
        }
        dialog.open = false;
        await bbg.saveBlogDataFile();
        bbg.routePage();
    }
    );

    document.querySelector("#modify_article_order_close").addEventListener("click", () => {
        dialog.open = false;
    });
}

// render blog setting page

bbg.renderBlogSettingsPage = async () => {
    document.querySelector("#app").innerHTML = /* html */ `
                                                <div id="blogmanager_page_app_bar">
                                                </div>

                                                <mdui-layout>
                                                    <mdui-layout-item id="blog_manager_nav_rail">
                                                    </mdui-layout-item>
                                                    <mdui-layout-main>
                                                        <mdui-card id="blog_manager_settings_page_card">
                                                            <mdui-card-content>
                                                                <mdui-tabs value="basic" variant="primary">
                                                                <mdui-tab value="basic">${bbg.i18n("blogmanager_settings_basic")}</mdui-tab>
                                                                <mdui-tab value="domain">${bbg.i18n("blogmanager_settings_domain_related_functions")}</mdui-tab>
                                                                <mdui-tab value="announcements">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${bbg.i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                            
                                                                <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
                                                                <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
                                                                <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
                                                            </mdui-tabs>
                                                                
                                                            </mdui-card-content>
                                                        </mdui-card>
                                                    </mdui-layout-main>
                                                </mdui-layout>`;
    await bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", bbg.i18n("blogmanager_title_prefix") + bbg.i18n("blogmanager_settings_title"));

    document.querySelector("#settings_backbtn").addEventListener("click", async () => {
        await bbg.routePage("/manage");
    });

    const blogSettingsContent = /* html */ ``;
    document.querySelector("#blog_settings_content").innerHTML = blogSettingsContent;
}

// settings dialog

bbg.openSwitchLanguageDialog = () => {

    mdui.dialog({
        headline: bbg.i18n("appsetting_switchlang"),
        body: /* html */ `
                <p>${bbg.i18n("appsetting_switchlang_desc")}</p>
                <mdui-list>
                    <mdui-list-item id="switch_lang_zh_CN">简体中文</mdui-list-item>
                    <mdui-list-item id="switch_lang_en_US">English (US)</mdui-list-item>
                    <mdui-list-item id="switch_lang_ja_JP">日本語</mdui-list-item>
                </mdui-list>`,
    });
    document.querySelector("#switch_lang_zh_CN").addEventListener("click", () => {
        window.localStorage.setItem("language", "zh_CN");
        window.location.reload();
    }
    );
    document.querySelector("#switch_lang_en_US").addEventListener("click", () => {
        window.localStorage.setItem("language", "en_US");
        window.location.reload();
    }
    );
    document.querySelector("#switch_lang_ja_JP").addEventListener("click", () => {
        window.localStorage.setItem("language", "ja_JP");
        window.location.reload();
    }
    );
}

bbg.openCustomizeThemeDialog = () => {
    const possible_colors = ["#6699cc", "#006666", "#cc0033", "#cc6600", "#cc9900", "#99cccc", "#9999ff", "#cc3366", "#000066"]
    const dialog = mdui.dialog({
        headline: bbg.i18n("appsetting_customize"),
        body: /* html */ `
                <p>${bbg.i18n("appsetting_customize_palette")}</p>
                <div id="customize_theme_color_palette">
                </div>
                <br />
                <mdui-radio-group value="${window.localStorage.getItem("themeType") + "mode"}" id="appsetting_customize_mode_choose">
                    <mdui-radio value="automode">${bbg.i18n("appsetting_customize_automode")}</mdui-radio>
                    <mdui-radio value="lightmode">${bbg.i18n("appsetting_customize_lightmode")}</mdui-radio>
                    <mdui-radio value="darkmode">${bbg.i18n("appsetting_customize_darkmode")}</mdui-radio>
                </mdui-radio-group>
                <br /><br />
                <mdui-button id="appsetting_customize_resettheme">${bbg.i18n("appsetting_customize_reset_theme")}</mdui-button>
                <mdui-button id="appsetting_customize_inputcolor">${bbg.i18n("appsetting_customize_input_color")}</mdui-button>
                <mdui-button id="appsetting_customize_close">${bbg.i18n("universal_close")}</mdui-button>
                `,
    });
    let colorPaletteHtml = "";
    for (let i = 0; i < possible_colors.length; i++) {
        colorPaletteHtml += /* html */ `<div id="appsetting_customize_color_block_${possible_colors[i].replace("#", "")}" class="palatte_color_block" style="background-color:${possible_colors[i]}"></div>`;
    }
    document.querySelector("#customize_theme_color_palette").innerHTML = colorPaletteHtml;
    for (let i = 0; i < possible_colors.length; i++) {
        document.querySelector(`#appsetting_customize_color_block_${possible_colors[i].replace("#", "")}`).addEventListener("click", () => {
            mdui.setColorScheme(possible_colors[i]);
            document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(" + window.getComputedStyle(document.documentElement).getPropertyValue('--mdui-color-primary-container') + ")");
            window.localStorage.setItem("themeColor", possible_colors[i]);
        });
    }

    document.querySelector("#appsetting_customize_mode_choose").addEventListener("change", (e) => {
        if (e.target.value === "automode") {
            mdui.setTheme("auto");
            window.localStorage.setItem("themeType", "auto");
        } else if (e.target.value === "lightmode") {
            mdui.setTheme("light");
            window.localStorage.setItem("themeType", "light");
        } else if (e.target.value === "darkmode") {
            mdui.setTheme("dark");
            window.localStorage.setItem("themeType", "dark");
        }
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(" + window.getComputedStyle(document.documentElement).getPropertyValue('--mdui-color-primary-container') + ")");
    });

    document.querySelector("#appsetting_customize_resettheme").addEventListener("click", () => {
        bbg.setDefaultTheme();
        mdui.setTheme(window.localStorage.getItem("themeType"));
        mdui.setColorScheme(window.localStorage.getItem("themeColor"));

        document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(" + window.getComputedStyle(document.documentElement).getPropertyValue('--mdui-color-primary-container') + ")");
        document.querySelector("#appsetting_customize_mode_choose").value = window.localStorage.getItem("themeType") + "mode";
    });

    document.querySelector("#appsetting_customize_inputcolor").addEventListener("click", () => {
        const colorValue = window.prompt(bbg.i18n("appsetting_customize_input_color_prompt"), window.localStorage.getItem("themeColor"));
        if (colorValue === null) {
            return;
        }
        mdui.setColorScheme(colorValue);
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(" + window.getComputedStyle(document.documentElement).getPropertyValue('--mdui-color-primary-container') + ")");
        window.localStorage.setItem("themeColor", colorValue);
        window.alert(bbg.i18n("appsetting_customize_input_color_success"));

    });

    document.querySelector("#appsetting_customize_close").addEventListener("click", () => {
        dialog.open = false;
    }
    );
}

// fs abstract

bbg.fs = new Object();

bbg.fs.pickDirectory = async () => {
    const dir = await window.showDirectoryPicker({
        "mode": "readwrite"
    });

    return dir;
}

bbg.fs.getDirHandle = async (fromDirHandle, targetDirName) => {
    return await fromDirHandle.getDirectoryHandle(targetDirName);
}

bbg.fs.getFileHandle = async (fromDirHandle, targetFileName) => {
    return await fromDirHandle.getFileHandle(targetFileName);
}

bbg.fs.existsDir = async (fromDirHandle, targetDirName) => {
    try {
        await fromDirHandle.getDirectoryHandle(targetDirName);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return false;
        } else {
            throw error;
        }
    }
    return true;
}

bbg.fs.existsFile = async (fromDirHandle, targetFileName) => {
    try {
        await fromDirHandle.getFileHandle(targetFileName);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return false;
        } else {
            throw error;
        }
    }
    return true;
}

bbg.fs.readFile = async (fileHandle) => {

    function readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    const file = await fileHandle.getFile();
    return await readFileAsText(file);
}

bbg.fs.writeFile = async (fileHandle, content) => {
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
}

bbg.fs.createFile = async (dirHandle, fileName) => {
    return await dirHandle.getFileHandle(fileName, { create: true });
}

bbg.fs.renameFile = async (fromDirHandle, oldFileName, newFileName) => {
    const oldFileHandle = await fromDirHandle.getFileHandle(oldFileName);
    const oldFileContent = await bbg.fs.readFile(oldFileHandle);
    await bbg.fs.writeFile(await bbg.fs.createFile(fromDirHandle, newFileName), oldFileContent);
    await bbg.fs.removeFile(fromDirHandle, oldFileName);
}

bbg.fs.removeFile = async (fromDirHandle, targetFileName) => {
    await fromDirHandle.removeEntry(targetFileName);
}

// functions

bbg.generateRandomString = (length) => {
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return result;
}

bbg.content_encrypt = (content, password) => {
    return sjcl.encrypt(password, content);
}

bbg.content_decrypt = (content, password) => {
    return sjcl.decrypt(password, content);
}

bbg.isValidBlogDirectory = async (dirHandle) => {

    const indexHtmlExists = await bbg.fs.existsFile(dirHandle, "index.html");
    const dataDirExists = await bbg.fs.existsDir(dirHandle, "data");

    if (dataDirExists === false || indexHtmlExists === false) {
        return false;
    }

    const blogDataDirHandle = await bbg.fs.getDirHandle(dirHandle, "data");

    const indexJsonExists = await bbg.fs.existsFile(blogDataDirHandle, "index.json");
    const articleDirExists = await bbg.fs.existsDir(blogDataDirHandle, "articles");
    const pagesDirExists = await bbg.fs.existsDir(blogDataDirHandle, "pages");

    if (indexJsonExists === false || articleDirExists === false || pagesDirExists === false) {
        return false;
    }

    return true;
}

bbg.loadBlogDataFile = async () => {
    const properPermissionAcquired = await bbg.blogRootDirHandle.queryPermission({ mode: "readwrite" });
    if (properPermissionAcquired !== "granted") {
        return;
    }
    bbg.blogDataDirHandle = await bbg.fs.getDirHandle(bbg.blogRootDirHandle, "data");
    bbg.blogDataFileHandle = await bbg.fs.getFileHandle(bbg.blogDataDirHandle, "index.json");
    bbg.blogData = JSON.parse(await bbg.fs.readFile(bbg.blogDataFileHandle));
    bbg.blogArticlesDirHandle = await bbg.fs.getDirHandle(bbg.blogDataDirHandle, "articles");
    bbg.blogPagesDirHandle = await bbg.fs.getDirHandle(bbg.blogDataDirHandle, "pages");
    await localforage.setItem("blogRootDirHandle", bbg.blogRootDirHandle);
};

bbg.openBlogDirectory = async () => {
    const dirHandle = await bbg.fs.pickDirectory();

    const isValidBlogDirectory = await bbg.isValidBlogDirectory(dirHandle);
    if (isValidBlogDirectory) {
        bbg.blogRootDirHandle = dirHandle;
        await bbg.loadBlogDataFile();
        await bbg.routePage("/manage/index");
        console.info(bbg.blogData);
    } else {
        window.alert(bbg.i18n("errmsg_blogdir_incorrect"));
    }

};

bbg.getCurrentTimeType = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return "morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "afternoon";
    } else {
        return "evening";
    }
}

bbg.saveBlogDataFile = async () => {
    await bbg.fs.writeFile(bbg.blogDataFileHandle, JSON.stringify(bbg.blogData));
}

// page routing

bbg.hasBlockedRefresh = false;

bbg.blockRefresh = () => {
    if (bbg.hasBlockedRefresh) {
        return;
    }
    window.addEventListener('beforeunload', function (event) {
        event.preventDefault();
        event.returnValue = "";
    });
    bbg.hasBlockedRefresh = true;
}

bbg.tryReloadDirHandle = async () => {
    if (await localforage.getItem("blogRootDirHandle") === null) {
        return;
    }
    bbg.blogRootDirHandle = await localforage.getItem("blogRootDirHandle");
    await bbg.loadBlogDataFile();
}

bbg.routePage = async (target = null) => {
    // get cntPath
    if (target === null) {
        bbg.cntPath = window.location.hash.replaceAll("#", "");
        if (bbg.cntPath === "") {
            bbg.cntPath = "/start";
            window.history.pushState(null, null, "#/start");
        }
    } else {
        bbg.cntPath = target;
        window.history.pushState(null, null, `#${target}`);
    }

    function removeLastSlashRecursively(str) {
        if (str.endsWith("/")) {
            return removeLastSlashRecursively(str.slice(0, -1));
        } else {
            return str;
        }
    }

    bbg.cntPath = removeLastSlashRecursively(bbg.cntPath);
    if (bbg.cntPath === "/start") {
        bbg.renderStartPage();
    } else if (bbg.cntPath === "/manage/index") {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderBlogManagerIndexPage();
    } else if (bbg.cntPath === "/manage/articles") {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderBlogManagerArticlesPage();
    } else if (bbg.cntPath === "/manage/pages") {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderBlogManagerPagesPage();
    } else if (bbg.cntPath.startsWith("/manage/articles/") || bbg.cntPath.startsWith("/manage/pages/")) {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderMarkdownEditorPage();
    } else if (bbg.cntPath === "/manage/settings") {
        if (typeof (bbg.blogData) === "undefined") {
            await bbg.tryReloadDirHandle();
            if (typeof (bbg.blogData) === "undefined") {
                await bbg.routePage("/start");
                return;
            }
        }
        await bbg.renderBlogSettingsPage();
    } else {
        bbg.renderFailureToRoutePage();
        console.error(`Error in bbg.routePage func: Unable to find page for path '${bbg.cntPath}'.`);
    }
}

await bbg.routePage();

window.addEventListener("hashchange", async () => {
    await bbg.routePage();
});