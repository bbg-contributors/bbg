
const navigatorLanguageStr = navigator.language || navigator.userLanguage;


let userLanguage = "English";

if(window.localStorage.getItem("userLanguage") === null){

    // identify what browser language is
    if (navigatorLanguageStr.indexOf("zh") !== -1) {
        userLanguage = "简体中文";
    }
    if (navigatorLanguageStr.indexOf("en") !== -1) {
        userLanguage = "English";
    }
    window.localStorage.setItem("userLanguage", userLanguage)
}else {
    userLanguage = window.localStorage.getItem("userLanguage");
}

function setLanguage(languageName){
    window.localStorage.setItem("userLanguage", languageName);
    userLanguage = languageName;
    window.location.reload();
}

function getCurrentOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;

    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'macOS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/Linux/.test(platform)) {
        os = 'Linux';
    } else {
        os = "Unknown";
    }

    return os;
}

function enterDocPage(path) {
    fetch(`./${path}`).then(response => response.text()).then(
        (markdownData) => {
            document.getElementById("docpage_main_content").innerHTML = marked.parse(markdownData);

            for(let i = document.getElementById("docpage_contents").childNodes.length - 1; i >= 0; i--){
                if (`enterDocPage('${path}')` === document.getElementById("docpage_contents").childNodes[i].getAttribute("onclick")){
                    document.getElementById("docpage_contents").childNodes[i].style.color = "black";
                }else {
                    document.getElementById("docpage_contents").childNodes[i].style.color = "#990000";
                }
            };

            history.pushState({}, null, window.location.href.replace("?"+window.location.href.split("?")[1], ""));
        }
    )
}

function getUrlArgs(paramName) {
    const url = new URL(window.location.href.replaceAll("#", ""));
    const params = new URLSearchParams(url.search);

    const paramValue = params.get(paramName);

    return paramValue;

}

function downloadFileFromUrl(url, fileName) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

fetch("./i18n.json")
    .then((response) => response.json())
    .then((langData) => {

       

        function render_nav() {
            const navbarHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #fbdcdc!important">
        
            <div class="container-fluid">
              <a class="navbar-brand" href="#"><img src="https://assets-cdn.nekovanilla.top/bbg.png" style="height:30px" /> BBG</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link ${websiteCurrentPage==="indexPage"?"active":""}" aria-current="page" href="./index.html"><i class="bi bi-house"></i> ${langData["indexPage"][userLanguage]}</a>
                  </li>
                  <li class="nav-item"><a class="nav-link ${websiteCurrentPage==="downloadPage"?"active":""}" href="./download.html"><i class="bi bi-cloud-arrow-down"></i> ${langData["downloadPage"][userLanguage]}</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ${websiteCurrentPage==="docPage"?"active":""}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-book"></i> ${langData["docAndGuidePage"][userLanguage]}
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="./doc.html?nav=${langData["pathOfUserGuide"][userLanguage]}">${langData["userGuide"][userLanguage]}</a></li>
                      <li><a class="dropdown-item" href="./doc.html?nav=${langData["pathOfDeveloperGuide"][userLanguage]}">${langData["developerGuide"][userLanguage]}</a></li>
                      <li><a class="dropdown-item" href="./doc.html?nav=${langData["pathOfChangeLog"][userLanguage]}">${langData["changeLog"][userLanguage]}</a></li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-translate"></i> ${langData["languageChoose"][userLanguage]}
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#" onclick="setLanguage('English')">English</a></li>
                      <li><a class="dropdown-item" href="#" onclick="setLanguage('简体中文')">简体中文</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            </nav>`;

            document.getElementById("navbar").innerHTML = navbarHTML;
        }

        function render_indexPage() {
            const indexPageBodyContent = `<br /><div class="container-sm">
            <div class="row">
              <div class="col-1"></div>
              <div class="col-6">
                <h1>${langData["indexPageTitle"][userLanguage]}</h1>
                <p>${langData["indexPageDescription"][userLanguage]}</p>
    
                <button type="button" class="btn btn-outline-danger" style="border-radius:40px" onclick="window.location='download.html'"><i class="bi bi-cloud-arrow-down"></i> ${langData["indexPageDownloadBtn"][userLanguage]}</button>
                <button type="button" class="btn btn-outline-dark" style="border-radius:40px" onclick="window.open('https://github.com/bbg-contributors/bbg')"><i class="bi bi-github"></i> ${langData["indexPageEnterGitHubBtn"][userLanguage]}</button>
                <br /><br />
    
              </div>
              <div class="col-4">
              <img src="https://assets-cdn.nekovanilla.top/bbg.png" style="height:300px" />
              </div>
              <div class="col-1"></div>
            </div>
          </div>
          <br />
          
          `;

            document.getElementById("main_content").innerHTML = indexPageBodyContent;


        }

        function render_bottom_information() {
            const bottom_information_html = `<div class="container-sm">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10"><hr /><p style="color:grey;">${langData["bottomInformation"][userLanguage]}</p></div>
                <div class="col-1"></div>
            </div>
            </div>`;

            document.getElementById("bottom_information").innerHTML = bottom_information_html;
        }

        function render_download_page() {
            const downloadPageHtml = `<div class="container-sm">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                <div style="text-align: center">
                    <p style="font-size:80px;color: #990000"><i class="bi bi-cloud-download"></i></p>
                    <h2 id="download_page_title"></h2>
                    <br />
                    <button class="btn btn-danger btn-lg" id="download_for_windows_btn" style="display:none;" onclick="window.location.href='thankyou.html?platform=win'"><i class="bi bi-windows"></i> ${langData["downloadForWin"][userLanguage]}</button>
                    <button class="btn btn-outline-danger btn-lg" id="download_for_ubuntu_btn" style="display:none;" onclick="window.location.href='thankyou.html?platform=deb'"><i class="bi bi-ubuntu"></i> ${langData["downloadDebPackage"][userLanguage]}</button>
                    <button class="btn btn-outline-danger btn-lg" id="download_appimage_btn" style="display:none;" onclick="window.location.href='thankyou.html?platform=appimage'"><i class="bi bi-window"></i> ${langData["downloadAppImagePackage"][userLanguage]}</button>
                    <button class="btn btn-outline-primary btn-lg" id="download_for_archlinux_btn" style="display:none;" onclick="window.open('https://aur.archlinux.org/packages/bbg')"><i class="bi bi-box-arrow-up-left"></i> ${langData["getFromAUR"][userLanguage]}</button>
                    <button class="btn btn-danger btn-lg" id="download_for_macos_btn" style="display:none;" onclick="window.location.href='thankyou.html?platform=macos'"><i class="bi bi-apple"></i> ${langData["downloadForMacOS"][userLanguage]}</button>
                    <button class="btn btn-danger btn-lg" id="download_for_linux_btn" style="display:none;" onclick="window.location.href='thankyou.html?platform=appimage'"><i class="bi bi-window"></i> ${langData["downloadForLinux"][userLanguage]}</button>
                    <br /><br />
                    <button class="btn btn-link" id="download_alternative_btn" onclick="window.open('https://github.com/bbg-contributors/bbg/releases/latest')">${langData["displayAllDownloads"][userLanguage]}</button>
                    <br /><br />
                    <p id="download_page_additional_note_for_linux_users" style="display:none">
                    ${langData["thanksForContributorsOfLinuxPackages"][userLanguage]}
                    </p>
                </div>
                </div>
                <div class="col-1"></div>
            </div>
            </div>`;

            document.getElementById("main_content").innerHTML = downloadPageHtml;

            switch (getCurrentOS()) {
                case "Windows":
                    document.getElementById("download_page_title").innerHTML = langData["downloadPageTitleWin"][userLanguage];
                    document.getElementById("download_for_windows_btn").setAttribute("style", "");
                    break;
                case "Linux":
                    document.getElementById("download_page_title").innerHTML = langData["downloadPageTitleLinux"][userLanguage];
                    document.getElementById("download_for_ubuntu_btn").setAttribute("style", "");
                    document.getElementById("download_for_archlinux_btn").setAttribute("style", "");
                    document.getElementById("download_appimage_btn").setAttribute("style", "");
                    document.getElementById("download_page_additional_note_for_linux_users").setAttribute("style", "");
                    break;
                case "macOS":
                    document.getElementById("download_page_title").innerHTML = langData["downloadPageTitleMacOS"][userLanguage];
                    document.getElementById("download_for_macos_btn").setAttribute("style", "");
                    break;
                default:
                    document.getElementById("download_page_title").innerHTML = langData["downloadPageTitleUniversal"][userLanguage];
                    document.getElementById("download_for_windows_btn").setAttribute("style", "");
                    document.getElementById("download_for_linux_btn").setAttribute("style", "");
                    document.getElementById("download_for_macos_btn").setAttribute("style", "");
            }

        }

        function render_thankyou_page() {
            const thankyou_html = `<div style="text-align: center"><h1>${langData["thankyouTitle"][userLanguage]}</h1><p>${langData["thankyouDescription"][userLanguage]}</p></div>`;

            if (getUrlArgs("platform") !== undefined && getUrlArgs("platform") !== null && getUrlArgs("platform") !== ""){
                fetch("https://api.github.com/repos/bbg-contributors/bbg/releases").then(response=>response.json()).then(
                    (responseData)=>{

                        let downloadUrlObj = {
                            "win": null,
                            "macos": null,
                            "deb": null,
                            "appimage": null
                        };

                        for (asset of responseData[0]["assets"]) {
                            if (asset["browser_download_url"].includes("blockmap") === false){
                                if(asset["browser_download_url"].includes("-setup-x64.exe")){
                                    downloadUrlObj.win = asset["browser_download_url"];
                                } else if (asset["browser_download_url"].includes("-amd64.deb")){
                                    downloadUrlObj.deb = asset["browser_download_url"];
                                } else if (asset["browser_download_url"].includes("-x64.dmg")) {
                                    downloadUrlObj.macos = asset["browser_download_url"];
                                } else if (asset["browser_download_url"].includes("-x86_64.AppImage")){
                                    downloadUrlObj.appimage = asset["browser_download_url"];
                                }
                            }
                        }

                        switch(getUrlArgs("platform")){
                            case "win":
                                downloadFileFromUrl(downloadUrlObj.win);
                                break;
                            case "macos":
                                downloadFileFromUrl(downloadUrlObj.macos);
                                break;
                            case "deb":
                                downloadFileFromUrl(downloadUrlObj.deb);
                                break;
                            case "appimage":
                                downloadFileFromUrl(downloadUrlObj.appimage);
                                break;
                        }
                    }
                );
            }

            document.getElementById("main_content").innerHTML = thankyou_html;
        }



        function render_docPage() {
            const docPageHtml = `<div class="container-sm">
            <div class="row">
                <div class="col-3" id="docpage_contents" style="background-color:#f7f4f4;border-radius:30px;margin-right:12px;padding-top:12px;">
                
                </div>
                <div class="col-8" id="docpage_main_content">
                
                </div>
                <div class="col-1"></div>
            </div>
            </div>`;

            document.getElementById("main_content").innerHTML = docPageHtml;

            fetch("./contents.json").then(response => response.json()).then(
                (contentsData) => {
                    let contentsHtml = ``;
                    contentsData = contentsData["contents"][userLanguage];
                    for (let i = 0; i < contentsData.length; i++) {
                        if (contentsData[i].length === 3) {
                            contentsHtml += `<a href="#" style="text-decoration:none;display:block;padding: 10px 20px;" onclick="enterDocPage('${contentsData[i][1]}')">${contentsData[i][0]}</a>`;
                            for (let j = 0; j < contentsData[i][2].length; j++) {
                                contentsHtml += `<a href="#" style="text-decoration:none;display:block;padding: 5px 50px;" onclick="enterDocPage('${contentsData[i][2][j][1]}')">${contentsData[i][2][j][0]}</a>`;
                            }
                        } else {
                            contentsHtml += `<a href="#" style="text-decoration:none;display:block;padding: 10px 20px;" onclick="enterDocPage('${contentsData[i][1]}')">${contentsData[i][0]}</a>`;
                        }
                    }
                    document.getElementById("docpage_contents").innerHTML = contentsHtml;

                    if(getUrlArgs("nav") === null || getUrlArgs("nav") === undefined || getUrlArgs("nav") === ""){
                        enterDocPage(`./${contentsData[0][1]}`);
                    } else {
                        enterDocPage(`${getUrlArgs("nav")}`);
                    }


                }
            );
        }

        render_nav();
        if (websiteCurrentPage === "indexPage") {
            render_indexPage();
        } else if (websiteCurrentPage === "downloadPage") {
            render_download_page();
        } else if (websiteCurrentPage === "thankyouPage") {
            render_thankyou_page();
        } else if (websiteCurrentPage === "docPage") {
            render_docPage();
        }
        render_bottom_information();


    });

