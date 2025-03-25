import i18n from "../i18n.js";

export default {
    openSwitchLanguageDialog: function () {

        mdui.dialog({
            headline: i18n("appsetting_switchlang"),
            body: /* html */ `
                <p>${i18n("appsetting_switchlang_desc")}</p>
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
    },
    openCustomizeThemeDialog: function () {
        const possible_colors = ["#6699cc", "#006666", "#cc0033", "#cc6600", "#cc9900", "#99cccc", "#9999ff", "#cc3366", "#000066"]
        const dialog = mdui.dialog({
            headline: i18n("appsetting_customize"),
            body: /* html */ `
                    <p>${i18n("appsetting_customize_palette")}</p>
                    <div id="customize_theme_color_palette">
                    </div>
                    <br />
                    <mdui-radio-group value="${window.localStorage.getItem("themeType") + "mode"}" id="appsetting_customize_mode_choose">
                        <mdui-radio value="automode">${i18n("appsetting_customize_automode")}</mdui-radio>
                        <mdui-radio value="lightmode">${i18n("appsetting_customize_lightmode")}</mdui-radio>
                        <mdui-radio value="darkmode">${i18n("appsetting_customize_darkmode")}</mdui-radio>
                    </mdui-radio-group>
                    <br /><br />
                    <mdui-button id="appsetting_customize_resettheme">${i18n("appsetting_customize_reset_theme")}</mdui-button>
                    <mdui-button id="appsetting_customize_inputcolor">${i18n("appsetting_customize_input_color")}</mdui-button>
                    <mdui-button id="appsetting_customize_close">${i18n("universal_close")}</mdui-button>
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
            const colorValue = window.prompt(i18n("appsetting_customize_input_color_prompt"), window.localStorage.getItem("themeColor"));
            if (colorValue === null) {
                return;
            }
            mdui.setColorScheme(colorValue);
            document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(" + window.getComputedStyle(document.documentElement).getPropertyValue('--mdui-color-primary-container') + ")");
            window.localStorage.setItem("themeColor", colorValue);
            window.alert(i18n("appsetting_customize_input_color_success"));
    
        });
    
        document.querySelector("#appsetting_customize_close").addEventListener("click", () => {
            dialog.open = false;
        }
        );
    }
}