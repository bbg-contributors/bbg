module.exports = function () {
    let nav_base = `
    <div class="fixed-top">
                   <a class="fluentbtn" href="#" onclick="window.history.back()">← ${langdata["GO_BACK"][lang_name]}</a>
                   <a class="fluentbtn" href="./article_manager.html?rootdir=${rootDir}">${langdata["ARTICLE_MANAGEMENT"][lang_name]}</a>
                   <a class="fluentbtn" href="./page_manager.html?rootdir=${rootDir}">${langdata["PAGE_MANAGEMENT"][lang_name]}</a>
                   <a class="fluentbtn" href="./blog_settings.html?rootdir=${rootDir}">${langdata["BLOG_SETTINGS"][lang_name]}</a>

                <a class="fluentbtn dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${langdata["SITE_RELATED"][lang_name]}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" onclick="preview_site()">${langdata["PREVIEW_AND_PUBLISH"][lang_name]}</a></li>
                  <li><a class="dropdown-item" href="#" onclick="open_blog_dir()">${langdata["OPEN_SITE_ROOTDIR"][lang_name]}</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" onclick="exitThisSite()">${langdata["EXIT_CURRENT_SITE"][lang_name]}</a></li>
                </ul>
    </div>
    `

    document.getElementById("root").innerHTML += nav_base;
}