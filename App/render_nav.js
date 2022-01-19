module.exports = function () {
    let nav_base = `
    <div class="fixed-top">
                   <a class="fluentbtn" href="#" onclick="window.history.back()">← 后退到上一个页面</a>
                   <a class="fluentbtn" href="./article_manager.html?rootdir=${rootDir}">${langdata["ARTICLE_MANAGEMENT"][lang_name]}</a>
                   <a class="fluentbtn" href="./page_manager.html?rootdir=${rootDir}">${langdata["PAGE_MANAGEMENT"][lang_name]}</a>
                   <a class="fluentbtn" href="./blog_settings.html?rootdir=${rootDir}">${langdata["BLOG_SETTINGS"][lang_name]}</a>

                <a class="fluentbtn dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  站点相关
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" onclick="preview_site()">预览和发布</a></li>
                  <li><a class="dropdown-item" href="#" onclick="open_blog_dir()">打开站点根目录</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" onclick="exitThisSite()">退出当前站点</a></li>
                </ul>
    </div>
    `

    document.getElementById("root").innerHTML += nav_base;
}