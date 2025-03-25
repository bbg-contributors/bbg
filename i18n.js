
const availableLanguages = ["zh_CN", "en_US", "ja_JP"];

function setDefaultLanguage() {
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
    setDefaultLanguage();
}

// fetch language files

let currentLanguage = window.localStorage.getItem("language");
let currentLanguageData = null;

if (!availableLanguages.includes(currentLanguage)) {
    setDefaultLanguage();
    currentLanguage = window.localStorage.getItem("language");
}
try {
    currentLanguageData = await (await fetch(`../translations/${currentLanguage}.json`)).json();
} catch (err) {
    console.error(`Error when fetching translation for current language (${currentLanguage}). Details: ${err}`);
};

// logic of fetch fallback language

let englishLanguageData = null;
let chineseLanguageData = null;

if (currentLanguage === "zh_CN") {
    chineseLanguageData = currentLanguageData;
}
else if (currentLanguage === "en_US") {
    englishLanguageData = currentLanguageData;
}

if (englishLanguageData === null) {
    try {
        englishLanguageData = await (await fetch(`../translations/en_US.json`)).json();
    } catch (err) {
        throw new Error(`Error when fetching language pack of en_US. Details: ${err}`);
    }
}

if (chineseLanguageData === null) {
    try {
        chineseLanguageData = await (await fetch(`../translations/zh_CN.json`)).json();
    } catch (err) {
        throw new Error(`Error when fetching language pack of zh_CN. Details: ${err}`);
    }

}

export default function (k) {
    if (Object.keys(currentLanguageData).includes(k)) {
        return currentLanguageData[k];
    } else {
        if (Object.keys(englishLanguageData).includes(k)) {
            return englishLanguageData[k];
        } else if (Object.keys(chineseLanguageData).includes(k)) {
            return chineseLanguageData[k];
        } else {
            console.error(`Error in i18n func: Unable to find translation for key '${k}' in current language (${currentLanguage}) nor in English or Chinese language pack.`);
            return "(null)";
        }
    }
}