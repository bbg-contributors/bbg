module.exports = function () {
    let nav_base = `
    <div class="fixed-top">
                   <a class="fluentbtn fluentbtn-blue" href="#" onclick="window.history.back()"><b>← 后退到上一个页面</b></a>

                <a class="fluentbtn fluentbtn-blue dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  管理菜单
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="./article_manager.html?rootdir=${rootDir}">文章管理</a></li>
                <li><a class="dropdown-item" href="./page_manager.html?rootdir=${rootDir}">页面管理</a></li>
                <li><a class="dropdown-item" href="./blog_settings.html?rootdir=${rootDir}">博客设置</a></li>

                  <li><a class="dropdown-item" onclick="preview_site()">预览和发布</a></li>
                  <li><a class="dropdown-item" href="#" onclick="open_blog_dir()">打开站点根目录</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" onclick="exitThisSite()">退出当前站点</a></li>
                </ul>
    </div>
    `

    document.getElementById("root").innerHTML += nav_base;
}