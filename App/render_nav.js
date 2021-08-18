module.exports = function () {
    let nav_base = `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: #6f42c1;" id="navbar">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                   <a class="nav-link btn btn-sm " href="#" onclick="window.history.back()"><b>← 后退到上一个页面</b></a>
                    </li>
            </ul>
                <form class="d-flex">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="navbar_items">


                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  站点相关
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" onclick="preview_site()">预览和发布</a></li>
                  <li><a class="dropdown-item" href="#" onclick="open_blog_dir()">打开站点根目录</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" onclick="exitThisSite()">退出当前站点</a></li>
                </ul>
              </li>


                <li class="nav-item">
                    <a class="nav-link" href="./article_manager.html?rootdir=${rootDir}">文章管理</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./page_manager.html?rootdir=${rootDir}">页面管理</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./blog_settings.html?rootdir=${rootDir}">博客设置</a>
                </li>
             
            </ul>
      </form>
            </div>
        </div>
    </nav>
    
    `

    document.getElementById("root").innerHTML += nav_base;
}