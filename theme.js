function setDefaultTheme() {
    window.localStorage.setItem("themeType", "auto");
    window.localStorage.setItem("themeColor", "#6699cc");
}

if (window.localStorage.getItem("themeType") === null) {
    setDefaultTheme();
}

mdui.setTheme(window.localStorage.getItem("themeType"));
mdui.setColorScheme(window.localStorage.getItem("themeColor"));

document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(" + window.getComputedStyle(document.documentElement).getPropertyValue('--mdui-color-primary-container') + ")");
