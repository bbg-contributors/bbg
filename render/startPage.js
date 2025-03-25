
import i18n from "../i18n.js";

export default function () {
    const startPageTemplate = /* html */ `
                                    <div id="start_page_app_bar">
                                    </div>
                                    <div id="start_page_center_container">
                                        <mdui-card id="start_page_center_container_content">
                                            <mdui-list>
                                                <mdui-list-subheader>${i18n("startpage_list_subheader")}</mdui-list-subheader>
                                                <mdui-list-item icon="folder_open" end-icon="arrow_right" id="startpage_openblog_btn">${i18n("startpage_openblog")}</mdui-list-item>
                                                <mdui-list-item icon="add" end-icon="arrow_right">${i18n("startpage_createblog")}</mdui-list-item>
                                                <mdui-list-item icon="history" end-icon="arrow_right">${i18n("startpage_recentopen")}</mdui-list-item>
                                                <mdui-dropdown>
                                                    <mdui-list-item icon="settings" end-icon="arrow_right" slot="trigger">${i18n("startpage_appsetting")}</mdui-list-item>
                                                    <mdui-menu>
                                                        <mdui-menu-item icon="language" id="startpage_setting_switch_lang_btn">${i18n("appsetting_switchlang")}</mdui-menu-item>
                                                        <mdui-menu-item icon="assistant">${i18n("appsetting_aiapi")}</mdui-menu-item>
                                                        <mdui-menu-item icon="style" id="startpage_setting_customize_theme_btn">${i18n("appsetting_customize")}</mdui-menu-item>
                                                    </mdui-menu>
                                                </mdui-dropdown>
                                                <mdui-list-subheader>${i18n("startpage_cntversion")}${bbg.app.version_str}</mdui-list-subheader>
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

    bbg.renderTitleBar("start_page_app_bar", i18n("startpage_title"));
}