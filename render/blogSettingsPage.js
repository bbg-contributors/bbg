
import i18n from "../i18n.js";

export default async function () {
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
                                                                <mdui-tab value="basic">${i18n("blogmanager_settings_basic")}</mdui-tab>
                                                                <mdui-tab value="domain">${i18n("blogmanager_settings_domain_related_functions")}</mdui-tab>
                                                                <mdui-tab value="announcements">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                                <mdui-tab value="tab-3">${i18n("blogmanager_settings_announcement_board")}</mdui-tab>
                                                            
                                                                <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
                                                                <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
                                                                <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
                                                            </mdui-tabs>
                                                                
                                                            </mdui-card-content>
                                                        </mdui-card>
                                                    </mdui-layout-main>
                                                </mdui-layout>`;
    await bbg.renderNavRail("blog_manager_nav_rail");
    bbg.renderTitleBar("blogmanager_page_app_bar", i18n("blogmanager_title_prefix") + i18n("blogmanager_settings_title"));

    document.querySelector("#settings_backbtn").addEventListener("click", async () => {
        await bbg.routePage("/manage");
    });

    const blogSettingsContent = /* html */ ``;
    document.querySelector("#blog_settings_content").innerHTML = blogSettingsContent;
}