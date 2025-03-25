
import i18n from "../i18n.js";

export default function (targetElemId) {
    const navRailTemplate = /* html */ `
                            <mdui-navigation-rail value="index" id="navrail">
                                <mdui-navigation-rail-item icon="home" value="index" id="navrail_index">${i18n("blogmanager_index")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="article" value="articles" id="navrail_articles">${i18n("blogmanager_articles")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="pages" value="pages" id="navrail_pages">${i18n("blogmanager_pages")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="settings" value="settings" id="navrail_settings">${i18n("blogmanager_settings")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="preview" value="preview" id="navrail_preview">${i18n("blogmanager_preview")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="publish" value="publish" id="navrail_publish">${i18n("blogmanager_publish")}</mdui-navigation-rail-item>
                                <mdui-navigation-rail-item icon="exit_to_app" value="exit" id="navrail_exit">${i18n("blogmanager_exit")}</mdui-navigation-rail-item>
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