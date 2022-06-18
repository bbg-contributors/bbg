// 引用multilang数据

const lang_name = "简体中文"

const langdata = {
    "EDIT_ARTICLE_META": {
        "简体中文": "修改文章元信息",
        "English": "Edit meta information of this article"
    },
    "EDIT_ARTICLE_CONTENT": {
        "简体中文": "编辑文章内容",
        "English": "Edit the content of this article with the default editor of your system"
    },
    "DELETE_ARTICLE": {
        "简体中文": "删除文章",
        "English": "Delete this article"
    },
    "HINT_USING_MD_IN_ARTICLES": {
        "简体中文": "小提示：你可以使用 Markdown 格式来书写文章",
        "English": "Tips: You can write your article with Markdown Format."
    },
    "ARTICLE_MANAGEMENT": {
        "简体中文": "文章管理",
        "English": "Article management"
    },
    "ADD_AN_ARTICLE": {
        "简体中文": "添加一篇文章",
        "English": "Add an article"
    },
    "ARTICLE_CREATEDAT": {
        "简体中文": "此文章编写于",
        "English": "This article is written at "
    },
    "LASTMODIFIEDAT": {
        "简体中文": "最近修改于",
        "English": "Last modified at"
    },
    "TAGS": {
        "简体中文": "标签：",
        "English": "Tags: "
    },
    "PAGE_MANAGEMENT": {
        "简体中文": "页面管理",
        "English": "Page management"
    },
    "ADD_A_PAGE": {
        "简体中文": "新建一个页面",
        "English": "Add a page"
    },
    "HINT_USING_MD_IN_PAGES": {
        "简体中文": "小提示：你可以使用 Markdown 格式来编写页面内容",
        "English": "Tips: You can write your page with Markdown Format."
    },
    "PAGE_VIEWNAME": {
        "简体中文": "此页面在菜单中显示为：",
        "English": "In the navigation bar, the page is viewed as: "
    },
    "EDIT_PAGE_META": {
        "简体中文": "页面设置",
        "English": "Settings for this page"
    },
    "EDIT_PAGE_CONTENT": {
        "简体中文": "编辑页面内容",
        "English": "Edit the content of this page with the default editor of your system"
    },
    "DELETE_PAGE": {
        "简体中文": "删除此页面",
        "English": "Delete this page"
    },
    "BLOG_SETTINGS": {
        "简体中文": "博客设置",
        "English": "Settings of the blog"
    },
    "BASIC_INFO_THEME_CONFIG": {
        "简体中文": "基本信息与主题配置",
        "English": "Basic Information and theme configuration"
    },
    "BLOG_TITLE": {
        "简体中文": "博客标题",
        "English": "The title of this blog"
    },
    "BLOG_DESCRIPTION": {
        "简体中文": "博客描述（副标题）",
        "English": "The description or the sub-title of this blog"
    },
    "BOTTOM_INFORMATION": {
        "简体中文": "底部信息",
        "English": "The bottom information"
    },
    "HINT_BTMINFO_MD": {
        "简体中文": "注意底部信息的格式为 Markdown，请不要尝试在其中添加 html 元素。",
        "English": "Notice that the format of the bottom information is Markdown. Don't try adding HTML elements into it."
    },
    "BLOG_NAVBAR_BGCOLOR": {
        "简体中文": "博客标题栏背景颜色",
        "English": "The background color of the blog title bar"
    },
    "BLOG_NAVBAR_TEXTCOLOR": {
        "简体中文": "博客标题栏文字颜色",
        "English": "The text color of the blog title bar"
    },
    "HINT_NAVBAR_COLOR": {
        "简体中文": "上述两项颜色设置可以填写 HTML 颜色名或十六进制颜色，如#66CCFF、cyan都是可选的颜色",
        "English": "You can fill the blank with HTML Colour Name or HEX color code, e.g, #66ccff or cyan."
    },
    "FAVICON": {
        "简体中文": "网页图标（Favicon）",
        "English": "The icon of the website (a.k.a Favicon)"
    },
    "FAVICON_DESCRIPTION": [
        {
            "简体中文": "网页图标不是必须的，它指的是在浏览器标签页上所显示的图标，默认来说是站点根目录下的favicon.ico。",
            "English": "It may not be necessary to add a favicon, which refers to the icon which is displayed at the browser tab and defaults to the favicon.ico which located at the root directory of the site."
        },
        {
            "简体中文": "图标的横纵比建议为1:1，以确保正确的显示效果。",
            "English": "The Horizontal and vertical ratio the icon is recommended to be 1:1, in order to make a comfortable display effect."
        },
        {
            "简体中文": "添加网页图标后，预览站点可能还是不能立刻看到效果。这是由于浏览器缓存导致的。如果遇到这种情况请尝试在浏览器中使用 Ctrl+F5 或 Fn+Ctrl+F5 强制刷新站点。",
            "English": "After adding the icon, you may not see the effect immediately while previewing the site due to the browser cache. If you meet such issues, try using Ctrl+F5 or Fn+Ctrl+F5 to refresh the site by force."
        }
    ],
    "SELECT_FAVICON": {
        "简体中文": "从文件中选择一个图标文件以使用",
        "English": "Select an image file as favicon"
    },
    "VIEW_FAVICON": {
        "简体中文": "查看当前图标",
        "English": "View the current icon"
    },
    "DELETE_FAVICON": {
        "简体中文": "删除当前图标",
        "English": "Delete the current favicon"
    },
    "STARTPAGE_TITLE": {
        "简体中文": "开始使用 BBG",
        "English": "Welcome to BBG"
    },
    "STARTPAGE_DESCRIPTION": [
        {
            "简体中文": "BBG 是 Baiyang-lzy's Blog Generator 的简写，也是一个基于 Electron 技术开发的静态博客生成器。",
            "English": "BBG, also known as Baiyang-lzy's Blog Generator, which is a static blog generator based on Electron Technology."
        },
        {
            "简体中文": "点击下方的按钮即可开始管理/创建博客了。",
            "English": "Want to manage or create a blog? Just click the button below."
        }
    ],
    "OPEN_EXISTING_SITE": {
        "简体中文": "打开已有站点",
        "English": "Open an existing site"
    },
    "CREATE_NEW_SITE": {
        "简体中文": "创建一个新站点",
        "English": "Create a new site"
    },
    "BBG_SETTINGS": {
        "简体中文": "BBG 版本设置与反馈",
        "English": "Application Settings and Feedback"
    },
    "LAST_MANAGED_SITE": {
        "简体中文": "你最近管理过：",
        "English": "Last managed site: "
    },
    "SOFTWARE_VERSION": {
        "简体中文": "软件版本号：",
        "English": "Version: "
    },
    "CHECK_UPDATE": {
        "简体中文": "检查更新",
        "English": "Check for updates"
    },
    "UNLICENSED": {
        "简体中文": "此软件的源代码属于公有领域。本软件不含任何担保。应用图标使用 Crypko AI 生成且仅可用作非商业用途。",
        "English": "The source code of this software is released into the public domain. The software doesn't have warranty of any kind. The icon of this app is generated by Crypko AI, and can only be used for non-commercial use."
    },
    "DISPLAY_CONTRIBUTERS": {
        "简体中文": "查看贡献者名单",
        "English": "Display contributers"
    },
    "JOIN_OUR_GROUP": {
        "简体中文": "加入我们的群组",
        "English": "Join our group"
    },
    "QQ_GROUP_NUMBER": {
        "简体中文": "QQ 群：983538695",
        "English": "QQ Group Number: 983538695"
    },
    "QQ_GROUP_DESCRIPTION": {
        "简体中文": "本群组的讨论范围包括计算机、生活、ACGN文化和体验等等，欢迎感兴趣者加入。有 BBG 使用相关建议和问题亦可在此群组中提出。",
        "English": "The Group mainly talks about Computer, Life, ACGN Culture and experiences, and we welcome people who uses Chinese and takes interest of the group. If you have suggestions about BBG, can also join the group and talk about them."
    },
    "ICON_DESIGN": {
        "简体中文": "图标设计",
        "English": "Icon designers"
    },
    "DEVELOPER": {
        "简体中文": "开发人员",
        "English": "Developers"
    },
    "PACKAGER": {
        "简体中文": "打包者",
        "English": "Packagers"
    },
    "TESTER": {
        "简体中文": "测试人员",
        "English": "Testers"
    },
    "OK": {
        "简体中文": "确定",
        "English": "OK"
    },
    "CREATE_NEW_SITE_DESCRIPTION": [
        {
            "简体中文": "请选择博客站点的根目录。当你选择好之后，会在你选定的根目录下构建博客的相关文件。",
            "English": "Select the root directory of the blog site, and then BBG will initize basic files at the directory where you selected."
        },
        {
            "简体中文": "请确保博客根目录为空，否则有可能导致文件冲突。",
            "English": "Notice that you must ensure that the root directory you selected is empty, or file confliction can occur."
        }
    ],
    "SELECT_SITE_ROOT_DIRECTORY": {
        "简体中文": "选择博客站点的根目录，并开始构建。",
        "English": "Click here to select the root directory of the site and then start initization."
    },
    "CANCEL": {
        "简体中文": "取消",
        "English": "cancel"
    },
    "SITE_LANG": {
        "简体中文": "网站语言",
        "English": "The language of the website"
    },
    "SITE_BGIMAGE": {
        "简体中文": "网站背景图像",
        "English": "The background image of the website"
    },
    "USE_RANDOM_ACG_PIC_AS_BGIMG": {
        "简体中文": "使用随机二次元图片作为网页背景（若不勾选此项则为空白背景）",
        "English": "Use random ACGN Pictures as the background image of the website (if not selecting this, the website background will be blank)"
    },
    "USE_3RD_THEME": {
        "简体中文": "为此站点使用第三方主题",
        "English": "Use third-party theme for the website"
    },
    "STATUS_USING_OFFICIAL_THEME": {
        "简体中文": "目前此站点正在使用 <b>官方主题。</b>",
        "English": "The site is using the officical theme now."
    },
    "RESET_TO_OFFICIAL_THEME": {
        "简体中文": "将此站点的主题重置为官方主题",
        "English": "Reset to the official theme"
    },
    "OPEN_THEME_STORE": {
        "简体中文": "打开主题商店",
        "English": "Open online theme store"
    },
    "USE_3RD_THEME_FROM_FILE": {
        "简体中文": "为此站点使用来自文件的第三方主题（不建议）",
        "English": "Use third-party theme from file (NOT Recommended)"
    },
    "COMMENT_SETTINGS": {
        "简体中文": "评论设置",
        "English": "Comment System Settings"
    },
    "COMMENT_SETTINGS_SIMPLE_DESCRIPTION": {
        "简体中文": "目前有两种方式来在博客站点中启用评论功能。",
        "English": "Now there're two ways to enable comment function in your blog site."
    },
    "COMMENT_SETTINGS_WAY1_PART1": {
        "简体中文": "方法一：最简单，你可以",
        "English": "Way 1 : Simplist, you can directly "
    },
    "COMMENT_SETTINGS_WAY1_PART2": {
        "简体中文": "点击这里直接使用BBG提供的公共评论服务。",
        "English": "click here to use the public comment service operated by BBG."
    },
    "COMMENT_SETTINGS_WAY1_PART3": {
        "简体中文": "<b>此方式不需要你拥有 LeanCloud 账户</b>，但是注意在你站点上的评论数据将由我们统一控制和管理，并且我们不提供任何数据完整性和可靠性的担保。        ",
        "English": "<b>This way does't require a LeanCloud Account</b>, but all the comment data of your site will be controlled by us. Furthermore, we don't offer any promise on Data Completion or Data Reliablity."
    },
    "COMMENT_SETTINGS_WAY2": {
        "简体中文": "方法二：操作复杂，但是你将拥有对评论数据的完整控制权。使用自己的 LeanCloud 账号创建一个新应用，然后将该应用的 AppID、AppKey填入下面的表单中并保存。<b>注意此方式要求你必须拥有已经实名认证过的 LeanCloud 账户。</b>",
        "English": "Way 2 : may be more complex, but you will get the complete control of your comment data. Firstly, use your own LeanCloud Account to create a new application, and fill the form below with the AppID and AppKey of the application you created. Notice that this way require a LeanCloud Account with real-name authentication."
    },
    "COMMENT_SETTINGS_FORM_HINT": {
        "简体中文": "如果你选择方法二，请勾选下方的“启用valine评论”，并在下方的表单填入应用的相关信息，然后点击保存。选择方法一的用户无需操作下方的内容。",
        "English": "If you choose way 2, please tick on the 'Enable Valine Comment' checkbox, and then fill the form below with the information of the application you created. Users who choose Way 1 doesn't need to operate the content below."
    },
    "ENABLE_VALINE": {
        "简体中文": "启用valine评论",
        "English": "Enable Valine Comment"
    },
    "VALINE_APPID": {
        "简体中文": "AppID（不启用valine评论则可不填）",
        "English": "AppID (You may not fill the blank if you don't enable valine comment)"
    },
    "VALINE_APPKEY": {
        "简体中文": "AppKey（不启用valine评论则可不填）",
        "English": "AppKey (You may not fill the blank if you don't enable valine comment)"
    },
    "GO_BACK": {
        "简体中文": "后退到上一个页面",
        "English": "Go Back"
    },
    "SITE_RELATED": {
        "简体中文": "站点相关",
        "English": "Site Related"
    },
    "PREVIEW_AND_PUBLISH": {
        "简体中文": "预览与发布",
        "English": "Preview and publish"
    },
    "OPEN_SITE_ROOTDIR": {
        "简体中文": "打开站点根目录",
        "English": "Open the root directory of the site"
    },
    "EXIT_CURRENT_SITE": {
        "简体中文": "退出当前站点",
        "English": "Exit the current site"
    },
    "PREVIEW_YOUR_SITE": {
        "简体中文": "预览你的站点",
        "English": "Preview your site"
    },
    "PREVIEW_SITE_CONTENT": [
        {
            "简体中文": "目前你已进入预览模式。在预览站点时，你不能进行站点管理等操作。",
            "English": "Now you have entered the preview mode. While previewing, you cannot manage your site."
        },
        {
            "简体中文": "你可以在",
            "English": "You can preview your site at"
        },
        {
            "简体中文": "预览你的站点。",
            "English": "."
        }
    ],
    "PUBLISH_YOUR_SITE": {
        "简体中文": "发布你的站点",
        "English": "Publish your site"
    },
    "MANUALLY_UPLOAD_AND_PUBLISH": {
        "简体中文": "手动上传和发布",
        "English": "Manually Upload and Publish"
    },
    "PUBLISH_SITE_CONTENT": [
        {
            "简体中文": "由 BBG 创建的站点，全站都为静态站点，你可以直接把它上传到你的服务器/静态站点托管平台上。",
            "English": "The site that created by BBG is 100% static site and so you can upload it directly to your server or static site host platform."
        },
        {
            "简体中文": "目前，各种代码平台提供的 Pages 服务是最常见的（而且免费的）静态站点托管平台。而这些 Pages 服务通常都使用 Git。所以一种可行的方案是，把站点根目录初始化为 Git 仓库，然后添加 Pages 仓库作为远程存储库，并在需要发布站点的时候执行相关 Git 命令（Add、Commit、Push...）。",
            "English": "Now, the Pages service that provided by code platform is the most common and also free static site hosting platform. These services usually come with Git. So, a feasible solution is to initize the root directory of the site as a Git Repository, and then set the Pages Repository as the remote Repository, then you can publish your site with the Git commands such as Add, push, commit, etc. "
        },
        {
            "简体中文": "有些 Pages 服务的提供者（如 GitHub Pages）也支持在 Web 端直接上传网站文件的功能，所以不会使用 Git 也没有关系。",
            "English": "Some provider of Pages service (e.g, GitHub Pages) also support the function of upload the website file directly through the Web Client. So it may not a big problem that you havn't lerarnt to use Git."
        },
        {
            "简体中文": "或者，如果你拥有自己的网站服务器，则直接将站点内的所有文件上传到服务器上的站点根目录即可。",
            "English": "Or, if you own a web server, just upload all the files of this site to the root website directory of your server, and it will work."
        }
    ],
    "PREVIEW_SITE_IN_BROWSER": {
        "简体中文": "在浏览器中预览该站点",
        "English": "Preview the site in your browser"
    },
    "EXIT_PREVIEW": {
        "简体中文": "退出预览模式",
        "English": "Exit the preview mode"
    },
    "PAGE_TITLE": {
        "简体中文": "页面标题",
        "English": "The title of the page"
    },
    "VIEW_IN_MENU": {
        "简体中文": "在菜单中显示",
        "English": "View in the navigation bar"
    },
    "MENU_VIEWNAME_EDIT_META": {
        "简体中文": "在菜单中显示名称为（不勾选“在菜单中显示”则可不填）",
        "English": "In the navigation bar, it is viewed as the name: (You may not need to fill this blank if you don't tick on 'View in the navigation bar')"
    },
    "OPEN_IN_NEW_TAB": {
        "简体中文": "在新标签中打开",
        "English": "Open In new tab"
    },
    "ENABLE_COMMENT": {
        "简体中文": "启用评论",
        "English": "Enable comment"
    },
    "ARTICLE_TITLE": {
        "简体中文": "文章标题",
        "English": "The title of the article"
    },
    "ARTICLE_ABSTRACT": {
        "简体中文": "文章摘要",
        "English": "the abstract of the article"
    },
    "CREATEDAT_EDIT_META": {
        "简体中文": "创建日期（无格式要求）",
        "English": "Create Date"
    },
    "MODIFIEDAT_EDIT_META": {
        "简体中文": "修改日期（无格式要求）",
        "English": "Modify date"
    },
    "TAGS_EDIT_META": {
        "简体中文": "标签（多个标签之间用空格隔开）",
        "English": "Tags: (If multiple, divide them with space)"
    },
    "ARTICLE_IS_TOP": {
        "简体中文": "置顶文章",
        "English": "In the top of the article list"
    },
    "HIDE_ARTICLE_IN_LIST": {
        "简体中文": "在文章列表中隐藏该文章",
        "English": "Hide in the article list"
    },
    "SAVE_CONFIGURATION": {
        "简体中文": "保存更改",
        "English": "Save the configuration"
    },
    "CDN_SETTINGS": {
        "简体中文": "Unpkg 源设置",
        "English": "Unpkg Source Settings"
    },
    "CDN_SETTINGS_SIMPLE_DESCRIPTION": {
        "简体中文": "Unpkg 源设置决定了你站点使用的前端库的 CSS 资源文件从哪里调用。此设置不会影响 JavaScript 资源的调用来源。<b>如果你不知道这是什么，请仅从列表中选择一个选项来使用或者保持默认。</b>",
        "English": "Unpkg source settings decide where to load the CSS resource file of the frontend libraries used by your site. The setting won't affect the JavaScript resource files. If you don't know what it is, please keep default or just select a selection from the list."
    },
    "CDN_SETTINGS_METHOD": {
        "简体中文": "在这里选择一个 Unpkg 源",
        "English": "Choose an Unpkg source here."
    },
    "CDN_SETTINGS_LIST": {
        "简体中文": "在给出的列表中选择 Unpkg 源",
        "English": "Choose Unpkg source from the list given below."
    },
    "CDN_SETTINGS_MANUAL": {
        "简体中文": "我要自己填写Unpkg 源地址",
        "English": "I want to choose CDN manually"
    },
    "CDN_SETTINGS_OFFICAL": {
        "简体中文": "UNPKG (https://unpkg.com)",
        "English": "UNPKG (https://unpkg.com)"
    },
    "CDN_SETTINGS_JSD": {
        "简体中文": "JSDelivr Unpkg CDN (https://cdn.jsdelivr.net/npm)",
        "English": "JSDelivr Unpkg CDN (https://cdn.jsdelivr.net/npm)"
    },
    "CDN_SETTINGS_ZHIMG": {
        "简体中文": "知乎 Unpkg 源(https://unpkg.zhimg.com)",
        "English": "Zhihu Unpkg Source (https://unpkg.zhimg.com)"
    },
    "CDN_SETTINGS_CHICDN": {
        "简体中文": "chicdn (https://unpkg.chicdn.cn) (由某人友情提供)",
        "English": "chicdn (https://unpkg.chicdn.cn) (Operated by someone)"
    },
    "CDN_SETTINGS_MANUAL_SET": {
        "简体中文": "您的Unpkg 源地址(需要带'https://'，结尾不含斜杠'/')",
        "English": "Your own unpkg source address(should with 'https://')"
    },
    "ABOUT_IMAGE_COPYRIGHT": {
        "简体中文": "关于应用图标的版权归属说明",
        "English": "About the copyright of the App Icon"
    },
    "ABOUT_IMAGE_COPYRIGHT_DESCRIPTION": {
        "简体中文": "应用图标使用 Crypko AI 生成，仅可用作非商业用途。",
        "English": "The icon of this app is generated by Crypko AI, and can only be used for non-commercial use."
    }
};



function loadUniStyle(){
    document.getElementById("uniform").innerHTML += `
    
    .article-item-sub,
.article-content-sub,
.page-item-sub {
  color: lightslategray;
}

.page-item,
.article-item,
.fluentinterface {
  background-color: rgb(253, 253, 253);
  padding: 24px;
  margin-bottom: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(227, 229, 234);
  border-radius: 16px;
}

.fluenthint {
  background-color: #cff4fc !important;
}

.nav-item .nav-link {
  color: grey !important;
}

body:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .4;
  z-index: -1;
  content: "";
  position: fixed;
}

.modal-header,
.modal-footer {
  border: none;
}

.fluentbtn {
  border-radius: 24px;
  background-color: rgb(254, 254, 254);
  border-style: solid;
  border-width: 2px;
  border-color: rgb(235, 237, 238);
  padding-top: 8px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 8px;
  text-decoration: none;
  color: black;
  font-size: 110%;
}

.fluentbtn-blue {
  background-color: #0199fa !important;
  color: white !important
}

.fluentbtn-blue:hover {
  background-color: #168dd6 !important;
  color: white !important
}

.fluentbtn-blue:active {
  background-color: rgb(39, 78, 175) !important;
  color: rbg(218, 228, 255) !important
}

.fluentbtn:hover {
  background-color: rgb(250, 251, 251);
  text-decoration: none;
  color: black;

}

.fluentbtn:active {
  background-color: rgb(250, 251, 251);
  text-decoration: none;
  color: grey;

}


@keyframes fade-in {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@-webkit-keyframes fade-in {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes fade-off {
  from {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@-webkit-keyframes fade-off {
  from {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@keyframes fade-in-top {
  from {
    opacity: 0;
    transform: translateY(20px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

@-webkit-keyframes fade-in-top {
  from {
    opacity: 0;
    transform: translateY(20px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

@keyframes fade-in-bottom {
  from {
    opacity: 0;
    transform: translateY(-20px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

@-webkit-keyframes fade-in-bottom {
  from {
    opacity: 0;
    transform: translateY(-20px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(20px)
  }

  to {
    opacity: 1;
    transform: translateX(0)
  }
}

@-webkit-keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(20px)
  }

  to {
    opacity: 1;
    transform: translateX(0)
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-20px)
  }

  to {
    opacity: 1;
    transform: translateX(0)
  }
}

@-webkit-keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-20px)
  }

  to {
    opacity: 1;
    transform: translateX(0)
  }
}

@keyframes fade-small-large {
  from {
    opacity: 0;
    transform: scale(.5, .5)
  }

  to {
    opacity: 1;
    transform: scale(1, 1)
  }
}

@-webkit-keyframes fade-small-large {
  from {
    opacity: 0;
    transform: scale(.5, .5)
  }

  to {
    opacity: 1;
    transform: scale(1, 1)
  }
}

@keyframes fade-large-small {
  from {
    opacity: 1;
    transform: scale(1, 1)
  }

  to {
    opacity: 0;
    transform: scale(.5, .5)
  }
}

@-webkit-keyframes fade-large-small {
  from {
    opacity: 1;
    transform: scale(1, 1)
  }

  to {
    opacity: 0;
    transform: scale(.5, .5)
  }
}

@keyframes fade-larger-small {
  from {
    opacity: 0;
    transform: scale(1.5, 1.5)
  }

  to {
    opacity: 1;
    transform: scale(1, 1)
  }
}

@-webkit-keyframes fade-larger-small {
  from {
    opacity: 0;
    transform: scale(1.5, 1.5)
  }

  to {
    opacity: 1;
    transform: scale(1, 1)
  }
}

@keyframes fade-small-larger {
  from {
    opacity: 1;
    transform: scale(1, 1)
  }

  to {
    opacity: 0;
    transform: scale(1.5, 1.5)
  }
}

@-webkit-keyframes fade-small-larger {
  from {
    opacity: 1;
    transform: scale(1, 1)
  }

  to {
    opacity: 0;
    transform: scale(1.5, 1.5)
  }
}

@keyframes scale-small-large {
  from {
    transform: scale(0, 0)
  }

  to {
    transform: scale(1, 1)
  }
}

@-webkit-keyframes scale-small-large {
  from {
    transform: scale(0, 0)
  }

  to {
    transform: scale(1, 1)
  }
}

@keyframes scale-large-small {
  from {
    transform: scale(1, 1)
  }

  to {
    transform: scale(0, 0)
  }
}

@-webkit-keyframes scale-large-small {
  from {
    transform: scale(1, 1)
  }

  to {
    transform: scale(0, 0)
  }
}

@keyframes up-and-down {
  from {
    transform: translateY(-20px)
  }

  to {
    transform: translateY(20px)
  }
}

@-webkit-keyframes up-and-down {
  from {
    transform: translateY(-20px)
  }

  to {
    transform: translateY(20px)
  }
}

@keyframes left-and-right {
  from {
    transform: translateX(-20px)
  }

  to {
    transform: translateX(20px)
  }
}

@-webkit-keyframes left-and-right {
  from {
    transform: translateX(-20px)
  }

  to {
    transform: translateX(20px)
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
}

@-webkit-keyframes rotate {
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
}

@keyframes jump {
  0% {
    transform: translateY(0) scale(1.15, .8)
  }

  20% {
    transform: translateY(-35px) scaleY(1.1)
  }

  50% {
    transform: translateY(-50px) scale(1)
  }

  80% {
    transform: translateY(-35px) scale(1)
  }

  to {
    transform: translateY(0) scale(1.15, .8)
  }
}

#root {
  padding-bottom: 80px;
}

a {
  text-decoration: none;
}

#nav_list button {
  font-size: 120%;
  border: none;
}

#nav_list button.active {
  border-radius: 24px;
  background-color: #009cfa;
}

#nav_list {
  position: fixed;
}

#blog_settings_list {
  position: fixed;
}

.nav_title {
  position: fixed;
}
    
    
    `;
}

function render_nav(){
    let nav_base = `
    <div class="list-group text-center" id="nav_list">
    <button type="button" class="list-group-item list-group-item-action">
    <i class="fa fa-bars"></i>
    </button>
  
    <button id="nav_to_article_manager" type="button" onclick="window.location.href='./article_manager.html'" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["ARTICLE_MANAGEMENT"][lang_name]}">
    <i class="fa fa-file-text"></i>
    </button>
  
    <button id="nav_to_page_manager" type="button" onclick="window.location.href='./page_manager.html'" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["PAGE_MANAGEMENT"][lang_name]}">
    <i class="fa fa-files-o"></i>
    </button>
  
    <button id="nav_to_blog_settings" type="button" onclick="window.location.href='./blog_settings.html'" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["BLOG_SETTINGS"][lang_name]}">
    <i class="fa fa-cogs"></i>
    </button>
  
    <button type="button" onclick="preview_site()" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["PREVIEW_AND_PUBLISH"][lang_name]}">
    <i class="fa fa-globe"></i>
    </button>
  
    <button type="button" onclick="exitThisSite()" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["EXIT_CURRENT_SITE"][lang_name]}">
    <i class="fa fa-sign-out"></i>
    </button>
   
  </div>
                
      `
  
    document.getElementById("nav_container").innerHTML += nav_base;
  
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
}

function render_container(){
    document.getElementById("root").innerHTML += `<div class="container-fluid"><div class="row"><div class="col-1" id="nav_container"><br /></div><div class="col-11" style="animation: fade-in-right alternate 0.5s;" id="container"></div></div></div>`;
}

function render_article_manager(){
    document.getElementById("container").innerHTML += `
  
    <nav class="navbar navbar-toggler bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><i class="fa fa-file-text"></i> ${langdata["ARTICLE_MANAGEMENT"][lang_name]}</a>
    </div>
  </nav>
  <br />
       <button onclick="add_a_article();" class="fluentbtn"><i class="fa fa-plus"></i> ${langdata["ADD_AN_ARTICLE"][lang_name]}</button>
       <hr />
    <div class="alert alert-info" role="alert">
    <i class="fa fa-smile-o"></i> ${langdata["HINT_USING_MD_IN_ARTICLES"][lang_name]}
  </div>
    
    `;
  
    document.getElementById("edit_article_meta_dialog_footer").innerHTML = `
    <button type="button" class="fluentbtn" data-bs-dismiss="modal">${langdata["CANCEL"][lang_name]}</button>
    <button type="button" class="fluentbtn fluentbtn-blue" id="save_article_meta_btn">${langdata["SAVE_CONFIGURATION"][lang_name]}</button>
    
    
    `
  
    for (let i = 0; i < blog["文章列表"].length; i++) {
      if (blog["文章列表"][i]["是否置顶"]) {
        document.querySelector("#container").innerHTML += `
          <div class="article-item" id="article-item-${i}">
              <div class="article-item-sub"><i class="fa fa-thumb-tack"></i> ${langdata["ARTICLE_IS_TOP"][lang_name]}</div>
              <h2>${blog["文章列表"][i]["文章标题"]}</h2>
             
              
          </div>
              `
  
      }
  
  
    }
  
  
    for (let i = 0; i < blog["文章列表"].length; i++) {
      if (blog["文章列表"][i]["是否置顶"]) {
  
      } else {
  
  
  
        document.querySelector("#container").innerHTML += `
          <div class="article-item" id="article-item-${i}">
              <h2>${blog["文章列表"][i]["文章标题"]}</h2>
             
              
          </div>
              `
  
        document.querySelector("#article-item-" + i).innerHTML += `
                  <div class="article-item-sub" id="article-item-sub-${i}"></div>
                  `;
  
  
        document.querySelector("#article-item-sub-" + i).innerHTML += `
        <i class="fa fa-calendar"></i> ${langdata["ARTICLE_CREATEDAT"][lang_name]}${blog["文章列表"][i]["创建日期"]}，${langdata["LASTMODIFIEDAT"][lang_name]} ${blog["文章列表"][i]["修改日期"]}<br />
              `;
  
        if (blog["文章列表"][i]["标签"].length === 0) {
  
        } else {
          document.querySelector("#article-item-sub-" + i).innerHTML += `
          <i class="fa fa-tags"></i> ${langdata["TAGS"][lang_name]}
                  `;
  
          for (let k = 0; k < blog["文章列表"][i]["标签"].length; k++) {
            document.querySelector("#article-item-sub-" + i).innerHTML += `
                      <button class="btn btn-light btn-sm">${blog["文章列表"][i]["标签"][k]}</button>
                      `
          }
        }
  
  
  
        document.querySelector("#article-item-" + i).innerHTML += `
              <br /><p>${blog["文章列表"][i]["摘要"]}</p>
                  `;
      }
  
      document.querySelector("#article-item-" + i).innerHTML += `
      
      <button class="fluentbtn fluentbtn-blue" onclick="edit_article('${blog["文章列表"][i]["文件名"]}')"><i class="fa fa-edit"></i> ${langdata["EDIT_ARTICLE_CONTENT"][lang_name]}</button>
      <button class="fluentbtn fluentbtn-blue" onclick="edit_article_meta(${i})"><i class="fa fa-info-circle"></i> ${langdata["EDIT_ARTICLE_META"][lang_name]}</button>
      <button class="fluentbtn" onclick="delete_article(${i})"><i class="fa fa-trash-o"></i> ${langdata["DELETE_ARTICLE"][lang_name]}</button>
      <br /><br />
      <button class="fluentbtn" onclick="let_article_up(${i})">上移一格</button>
      <button class="fluentbtn" onclick="let_article_down(${i})">下移一格</button>
      `;
  
    }
  
    document.getElementById("nav_to_article_manager").classList.add("active");
}

const edit_article_meta = function (i) {
    let metaModal = new bootstrap.Modal(document.getElementById('edit_article_meta_dialog'));
    metaModal.toggle();
  
    document.getElementById("edit_article_meta_dialog_title").innerHTML = langdata["EDIT_ARTICLE_META"][lang_name];
  
  
    document.getElementById("save_article_meta_btn").setAttribute("onclick", `save_article_meta(${i})`)
  
    document.getElementById("article_meta_content").innerHTML = "";
  
    document.getElementById("article_meta_content").innerHTML += `
      <div class="mb-3">
      <label class="form-label">${langdata["ARTICLE_TITLE"][lang_name]}</label>
      <input class="form-control" placeholder="请输入文章标题" value="${blog["文章列表"][i]["文章标题"]}" id="meta_article_title">
    </div>
    <div class="mb-3">
      <label class="form-label">${langdata["ARTICLE_ABSTRACT"][lang_name]}</label>
      <textarea class="form-control" placeholder="请输入文章摘要" id="meta_article_description">${blog["文章列表"][i]["摘要"]}</textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">${langdata["CREATEDAT_EDIT_META"][lang_name]}</label>
      <input class="form-control" placeholder="请输入创建日期" value="${blog["文章列表"][i]["创建日期"]}" id="meta_article_createdat">
    </div>
    <div class="mb-3">
      <label class="form-label">${langdata["MODIFIEDAT_EDIT_META"][lang_name]}</label>
      <input class="form-control" placeholder="请输入修改日期" value="${blog["文章列表"][i]["修改日期"]}" id="meta_article_updatedat">
    </div>
    <div class="mb-3">
      <label class="form-label">${langdata["TAGS_EDIT_META"][lang_name]}</label>
      <input class="form-control"  placeholder="在这里填入标签（如果有的话）" id="meta_article_tags">
    </div>
    
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="meta_article_istop">
      <label class="form-check-label" for="meta_article_istop">
      ${langdata["ARTICLE_IS_TOP"][lang_name]}
      </label>
    </div>
    
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="meta_article_is_comment_enabled">
      <label class="form-check-label" for="meta_article_is_comment_enabled">
      ${langdata["ENABLE_COMMENT"][lang_name]}
      </label>
    </div>
    
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="meta_article_ishidden">
      <label class="form-check-label" for="meta_article_ishidden">
      ${langdata["HIDE_ARTICLE_IN_LIST"][lang_name]}
      </label>
    </div>
    
    
      
      `
    if (blog["文章列表"][i]["标签"].length !== 0) {
  
      let tempTagString = "";
      for (let k = 0; k < blog["文章列表"][i]["标签"].length; k++) {
        tempTagString += blog["文章列表"][i]["标签"][k] + " ";
      }
  
      tempTagString = tempTagString.slice(0, tempTagString.length - 1);
  
      document.getElementById("meta_article_tags").value = tempTagString;
  
    }
  
    if (blog["文章列表"][i]["是否置顶"] === true) {
      document.getElementById("meta_article_istop").checked = true;
    }
  
    if (blog["文章列表"][i]["是否隐藏"] === true) {
      document.getElementById("meta_article_ishidden").checked = true;
    }
    if (blog["文章列表"][i]["启用评论"] === true) {
      document.getElementById("meta_article_is_comment_enabled").checked = true;
    }
  
  }

  const randomString = function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  var BlogInstance = new Object();

  BlogInstance.writeBlogData = ()=>{



    let params = new URLSearchParams();
    params.append('data', JSON.stringify(blog));

    axios.post('./writeblogdata.php', params)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

  var appendNewFile = (fileloc)=>{


    let params = new URLSearchParams();
    params.append('fileloc', fileloc);

    axios.post('./appendnewfile.php', params)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

const add_a_article = function () {

    let tempString = randomString(12);
  
    //todo: 添加 exist的条件判断来防止文件已存在
  
      let dateobject = new Date;
      let datenow = dateobject.toLocaleDateString();
  
      blog["文章列表"].unshift({
        "文章标题": "",
        "文件名": tempString + ".md",
        "标签": [],
        "摘要": "",
        "创建日期": datenow,
        "修改日期": datenow,
        "是否置顶": false,
        "是否隐藏": false,
        "启用评论": true
      });
  
      BlogInstance.writeBlogData();
      appendNewFile(`articles/${tempString}.md`);
  
      document.getElementById("root").innerHTML = "";
  
      render_container();
      render_nav();
      render_article_manager();
  
      edit_article_meta(0);
  
    
  }
  
  const save_article_meta = function (i) {
    let meta_article_title = document.getElementById("meta_article_title").value;
    let meta_article_description = document.getElementById("meta_article_description").value;
    let meta_article_createdat = document.getElementById("meta_article_createdat").value;
    let meta_article_updatedat = document.getElementById("meta_article_updatedat").value;
    let meta_article_tags = document.getElementById("meta_article_tags").value;
    let meta_article_istop = document.getElementById("meta_article_istop").checked;
    let meta_article_is_comment_enabled = document.getElementById("meta_article_is_comment_enabled").checked;
    let meta_article_ishidden = document.getElementById("meta_article_ishidden").checked;
  
  
    blog["文章列表"][i]["文章标题"] = meta_article_title;
    blog["文章列表"][i]["摘要"] = meta_article_description;
    blog["文章列表"][i]["创建日期"] = meta_article_createdat;
    blog["文章列表"][i]["修改日期"] = meta_article_updatedat;
  
    let tempTagArray = meta_article_tags.split(" ").filter((x) => x !== '');
  
    blog["文章列表"][i]["标签"] = tempTagArray;
  
    if (meta_article_istop === true) {
      blog["文章列表"][i]["是否置顶"] = true;
    } else {
      blog["文章列表"][i]["是否置顶"] = false;
    }
  
    if (meta_article_ishidden === true) {
      blog["文章列表"][i]["是否隐藏"] = true;
    } else {
      blog["文章列表"][i]["是否隐藏"] = false;
  
    }
  
    if (meta_article_is_comment_enabled === true) {
      blog["文章列表"][i]["启用评论"] = true;
    } else {
      blog["文章列表"][i]["启用评论"] = false;
  
    }
  
  
    BlogInstance.writeBlogData();
  
    window.location.reload();
  }


  function remove_a_file(fileloc){
    let params = new URLSearchParams();
    params.append('fileloc', fileloc);

    axios.post('./removefile.php', params)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const delete_article = function (i) {
  
    if (window.confirm("是否确认删除此文章？*此操作不可逆")) {
      //用户选择删除
      remove_a_file(`articles/${blog["文章列表"][i]["文件名"]}`);
      blog["文章列表"].splice(i, 1);
      BlogInstance.writeBlogData();
      window.location.reload();
  
    } else {
  
    }
  
  }
  
  function let_article_up(article_id) {
    if (article_id !== 0) {
      let articleObj = blog["文章列表"][article_id];
      blog["文章列表"].splice(article_id - 1, 0, articleObj);
      blog["文章列表"].splice(article_id + 1, 1);
      BlogInstance.writeBlogData();
      document.getElementById("container").innerHTML = "<br /><br /><br />";
      render_article_manager();
    }
  }
  
  function let_article_down(article_id) {
    if (article_id !== blog["文章列表"].length - 1) {
      let articleObj = blog["文章列表"][article_id];
      blog["文章列表"].splice(article_id + 2, 0, articleObj);
      blog["文章列表"].splice(article_id, 1);
      BlogInstance.writeBlogData();
      document.getElementById("container").innerHTML = "<br /><br /><br />";
      render_article_manager();
    }
  }

  const render_page_manager = function () {

    document.getElementById("container").innerHTML += `
    
    <nav class="navbar navbar-toggler bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><i class="fa fa-files-o"></i> ${langdata["PAGE_MANAGEMENT"][lang_name]}</a>
    </div>
  </nav>
  <br />
      <button class="fluentbtn" onclick="add_a_page()"><i class="fa fa-plus"></i>  ${langdata["ADD_A_PAGE"][lang_name]} </button>
      <button class="fluentbtn" onclick="edit_friend_book();" ><i class="fa fa-cogs"></i>  管理网站友人帐页面 </button>
      <hr />
      <div class="alert alert-info" role="alert">
      <i class="fa fa-smile-o"></i> ${langdata["HINT_USING_MD_IN_PAGES"][lang_name]}
      </div>
      `
  
    document.getElementById("edit_page_meta_dialog_footer").innerHTML = `
  
      <button type="button" class="fluentbtn" data-bs-dismiss="modal">${langdata["CANCEL"][lang_name]}</button>
      <button type="button" class="fluentbtn fluentbtn-blue" id="save_page_meta_btn">${langdata["SAVE_CONFIGURATION"][lang_name]}</button>
  
      `;
  
    for (let i = 0; i < blog["页面列表"].length; i++) {
  
      document.getElementById("container").innerHTML += `
        <div class="page-item">
        <h2>${blog["页面列表"][i]["页面标题"]}</h2>
        <p id="if_view_in_menu_${i}"  class="page-item-sub"></p>
        <p>
        <button class="fluentbtn fluentbtn-blue" onclick="edit_page('${blog["页面列表"][i]["文件名"]}')"><i class="fa fa-edit"></i> ${langdata["EDIT_PAGE_CONTENT"][lang_name]}</button>
        <button class="fluentbtn fluentbtn-blue" onclick="edit_page_meta(${i})"><i class="fa fa-cogs"></i> ${langdata["EDIT_PAGE_META"][lang_name]}</button>
        <button class="fluentbtn" onclick="delete_page(${i})"><i class="fa fa-trash-o"></i> ${langdata["DELETE_PAGE"][lang_name]}</button>
        </p>
    
        </div>
        
        `
  
      if (blog["页面列表"][i]["是否显示在菜单中"] === true) {
        document.getElementById("if_view_in_menu_" + i).innerHTML = `<i class="fa fa-cogs"></i> ${langdata["PAGE_VIEWNAME"][lang_name]}<b>${blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"]}</b>`;
      } else {
        document.getElementById("if_view_in_menu_" + i).innerHTML = `<i class="fa fa-cogs"></i> 此页面不显示在菜单中`;
  
      }
    }
  
    document.getElementById("nav_to_page_manager").classList.add("active");
  }
  
const edit_page_meta = function (i) {
  let metaModal = new bootstrap.Modal(document.getElementById('edit_page_meta_dialog'));
  metaModal.toggle();

  document.getElementById("edit_page_meta_dialog_title").innerHTML = langdata["EDIT_PAGE_META"][lang_name];
  document.getElementById("save_page_meta_btn").setAttribute("onclick", `save_page_meta(${i})`)

  document.getElementById("page_meta_content").innerHTML = "";

  document.getElementById("page_meta_content").innerHTML += `
    <div class="mb-3">
    <label class="form-label">${langdata["PAGE_TITLE"][lang_name]}</label>
    <input class="form-control" placeholder="请输入页面标题" value="${blog["页面列表"][i]["页面标题"]}" id="meta_page_title">
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_page_isviewinmenu">
    <label class="form-check-label" for="meta_page_isviewinmenu">
    ${langdata["VIEW_IN_MENU"][lang_name]}
    </label>
  </div>
  
  <hr />
  
  <div class="mb-3">
    <label class="form-label">${langdata["MENU_VIEWNAME_EDIT_META"][lang_name]}</label>
    <input class="form-control" value="${blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"]}" id="meta_page_title_menu">
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_page_openinnewtab">
    <label class="form-check-label" for="meta_page_openinnewtab">
    ${langdata["OPEN_IN_NEW_TAB"][lang_name]}
    </label>
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_page_iscommentenabled">
    <label class="form-check-label" for="meta_page_iscommentenabled">
    ${langdata["ENABLE_COMMENT"][lang_name]}
    </label>
  </div>
  
  `
  if (blog["页面列表"][i]["是否显示在菜单中"] === true) {
    document.getElementById("meta_page_isviewinmenu").checked = true;
  }
  if (blog["页面列表"][i]["是否在新标签页打开"] === true) {
    document.getElementById("meta_page_openinnewtab").checked = true;
  }

  if (blog["页面列表"][i]["启用评论"] === true) {
    document.getElementById("meta_page_iscommentenabled").checked = true;
  }

}

const save_page_meta = function (i) {
  let meta_page_title = document.getElementById("meta_page_title").value;
  let meta_page_title_menu = document.getElementById("meta_page_title_menu").value;
  let meta_page_isviewinmenu = document.getElementById("meta_page_isviewinmenu").checked;
  let meta_page_iscommentenabled = document.getElementById("meta_page_iscommentenabled").checked;
  let meta_page_openinnewtab = document.getElementById("meta_page_openinnewtab").checked;

  blog["页面列表"][i]["页面标题"] = meta_page_title;
  blog["页面列表"][i]["是否显示在菜单中"] = meta_page_isviewinmenu;
  blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"] = meta_page_title_menu;
  blog["页面列表"][i]["启用评论"] = meta_page_iscommentenabled;
  blog["页面列表"][i]["是否在新标签页打开"] = meta_page_openinnewtab;

  BlogInstance.writeBlogData();


  window.location.reload();
}

const add_a_page = function () {

  let tempString = randomString(12);

  
  //todo: check existence of page file

    blog["页面列表"].unshift({
      "页面标题": "",
      "是否显示在菜单中": true,
      "若显示在菜单中，则在菜单中显示为": "",
      "是否在新标签页打开": false,
      "文件名": tempString + ".md",
      "这是一个完整的html": false,
      "启用评论": false
    });

    BlogInstance.writeBlogData();
    appendNewFile(`/pages/${tempString}.md`);

    document.getElementById("root").innerHTML = "";

    render_container();
    render_nav();
    render_page_manager();

    edit_page_meta(0);

  
}

const edit_friend_book = function () {
  let friendModal = new bootstrap.Modal(document.getElementById('edit_friend_book_dialog'));
  friendModal.toggle();

  document.getElementById("friend_book_content").innerHTML = `
    
    <p>友人帐是一个独立页面，组织和显示了友人帐中的友人信息。</p>
    <div class="form-check">
<input class="form-check-input" type="checkbox" id="enableFriendBookFunction">
<label class="form-check-label" for="enableFriendBookFunction">
启用内建的网站友人帐页面
</label>
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="enableFriendBookComment">
<label class="form-check-label" for="enableFriendBookComment">
允许在友人帐页面下评论
</label>
</div>

<br />
<p>显示在友人帐页面的附加信息（以html格式编写）</p>
<textarea class="form-control" id="friend_book_additional_info">
${blog["友人帐页面附加信息"]}
</textarea>
    
    <hr />
    <p>以下是目前友人帐中的友人列表。</p>
    
    
    
    <table class="table">
  <thead>
    <tr>
      <th scope="col">站点名称</th>
      <th scope="col">链接</th>
      <th scope="col">简介</th>
      <th scope="col">站点图标URL</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="friend_book_list">
    
    
   
  </tbody>
</table>

<button class="fluentbtn fluentbtn-blue" onclick="add_new_friend();">添加新友人信息</button>

    
    `;

  render_friend_book_list();

  if (blog["启用内建友人帐页面"] === true) {
    document.getElementById("enableFriendBookFunction").checked = true;
  }
  if (blog["友人帐页面允许评论"] === true) {
    document.getElementById("enableFriendBookComment").checked = true;

  }
}

const render_friend_book_list = function () {

  document.getElementById("friend_book_list").innerHTML = "";
  for (let i = 0; i < blog["友人帐"].length; i++) {
    document.getElementById("friend_book_list").innerHTML += `
        
        <tr>
      <td><input class="form-control" placeholder="名称" id="friend_book_list_${i}_name" value="${blog['友人帐'][i]['名称']}"></input></td>
      <td><input class="form-control" placeholder="链接" id="friend_book_list_${i}_link" value="${blog['友人帐'][i]['链接']}"></input></td>
      <td><input class="form-control" placeholder="简介" id="friend_book_list_${i}_description" value="${blog['友人帐'][i]['简介']}"></input></td>
      <td><input class="form-control" placeholder="图标url" id="friend_book_list_${i}_icon" value="${blog['友人帐'][i]['图标']}"></input></td>
      <td><button class="fluentbtn" onclick="delete_friend(${i})"><i class="fa fa-close" ></i></button></td>
    </tr>
        `;
  }
}

const save_friend_book = function () {
  for (let i = 0; i < blog["友人帐"].length; i++) {
    blog["友人帐"][i]["名称"] = document.getElementById(`friend_book_list_${i}_name`).value;
    blog["友人帐"][i]["链接"] = document.getElementById(`friend_book_list_${i}_link`).value;
    blog["友人帐"][i]["简介"] = document.getElementById(`friend_book_list_${i}_description`).value;
    blog["友人帐"][i]["图标"] = document.getElementById(`friend_book_list_${i}_icon`).value;
  }

  blog["友人帐页面附加信息"] = document.getElementById("friend_book_additional_info").value;

  blog["启用内建友人帐页面"] = document.getElementById("enableFriendBookFunction").checked;

  blog["友人帐页面允许评论"] = document.getElementById("enableFriendBookComment").checked;

  BlogInstance.writeBlogData();
}

const add_new_friend = function () {


  save_friend_book();

  render_friend_book_list();

  blog["友人帐"][blog["友人帐"].length] = {
    "名称": "",
    "链接": "",
    "简介": "",
    "图标": ""
  };

  render_friend_book_list();

  save_friend_book();
}

const render_blog_settings = function () {

  document.getElementById("container").innerHTML += `
  <nav class="navbar navbar-toggler bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><i class="fa fa-cogs"></i> ${langdata["BLOG_SETTINGS"][lang_name]}</a>
    </div>
  </nav>
<br />
<div class="row">

<div class="col-3">

<ul class="list-group" id="blog_settings_list">
<h5>目录</h5>
<li class="list-group-item">
<a href="#basic_info_theme_config_navhash">${langdata["BASIC_INFO_THEME_CONFIG"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#announcement_board_navhash">网站公告板</a>
</li>
<li class="list-group-item" style="display:none">
<a href="#favicon_navhash">${langdata["FAVICON"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#bgimage_navhash">${langdata["SITE_BGIMAGE"][lang_name]}</a>
</li>
<li class="list-group-item" style="display:none">
<a href="#thirdpartytheme_navhash">${langdata["USE_3RD_THEME"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#comment_settings_navhash">${langdata["COMMENT_SETTINGS"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#cdn_settings_navhash">${langdata["CDN_SETTINGS"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#advanced_navhash">高级自定义</a>
</li>
</ul>


</div>
<div class="col-9">

<div class="fluentinterface" id="basic_info_theme_config_navhash">
<h2><i class="fa fa-paint-brush"></i> ${langdata["BASIC_INFO_THEME_CONFIG"][lang_name]}</h2><br />
<div class="mb-3">
<label class="form-label">${langdata["BLOG_TITLE"][lang_name]}</label>
<input class="form-control" value="${blog["博客标题"]}" id="blog_settings_title">
</div>

<div class="mb-3">
<label class="form-label">${langdata["BLOG_DESCRIPTION"][lang_name]}</label>
<input class="form-control" value="${blog["博客描述（副标题）"]}"  id="blog_settings_description">
</div>

<div class="mb-3">
<label class="form-label">${langdata["BOTTOM_INFORMATION"][lang_name]}</label>
<textarea class="form-control" id="blog_settings_bottom_information">
${blog["底部信息（格式为markdown）"]}
</textarea>
</div>



<div class="mb-3">
<label class="form-label">全站内容授权协议</label>
<input class="form-control" value="${blog["全站内容授权协议"]}"  id="blog_settings_content_license">
</div>

<div class="alert alert-primary" role="alert">
全站内容授权协议的可填项为 reserved，unlicensed，cc-by-nc-sa-4.0 这三项中的任意一项，默认为reserved。reserved 表示博主保留所有权利；cc-by-nc-sa-4.0 表示博客内容使用 CC BY-NC-SA 4.0 作为授权协议；unlicensed 表示博客内容属于公有领域。如果填写其它内容，会将你所填写的内容作为博客的版权声明。
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_content_license_enabled">
<label class="form-check-label" for="blog_content_license_enabled">
关闭“全站内容授权协议”功能
</label>
</div>

<br />

<div class="mb-3">
<label class="form-label">${langdata["SITE_LANG"][lang_name]}</label>
<br />
<select class="form-select">
<option value="simplified_chinese" id="sitelang_simplified_chinese">简体中文</option>
<option value="english" id="sitelang_english">English</option>
</select>

</div>

<div class="mb-3">
<label class="form-label">文章列表每页文章数（此项必须是一个大于等于5的整数）</label>
<input class="form-control" value="${blog["文章列表中每页的文章数为"]}" type="number" min="5" id="blog_settings_howmany_article_in_a_page">
<br />
<div class="alert alert-primary" role="alert">
置顶文章的显示不受“文章列表每页文章数”约束。实际的每页文章数不会少于你设置的这个数字，也不会超过“置顶文章数”和“你设置的每页文章数”数量的总和。无论如何，最终的文章列表中不会有文章被遗漏。
</div>
</div>

<div class="mb-3">
<label class="form-label">${langdata["BLOG_NAVBAR_BGCOLOR"][lang_name]}</label>
<input class="form-control" value="${blog["全局主题设置"]["标题栏背景颜色"]}"  id="blog_settings_titlebar_bgcolor">
</div>

<div class="mb-3">
<label class="form-label">${langdata["BLOG_NAVBAR_TEXTCOLOR"][lang_name]}</label>
<input class="form-control"  value="${blog["全局主题设置"]["标题栏文字颜色"]}" id="blog_settings_titlebar_textcolor">
</div>

<div class="alert alert-primary" role="alert">
<i class="fa fa-smile-o"></i> ${langdata["HINT_NAVBAR_COLOR"][lang_name]}
</div>
</div>

<div class="fluentinterface" id="announcement_board_navhash">

<h3>网站公告板</h3>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="website_announcement_enabled">
<label class="form-check-label" for="website_announcement_enabled">
启用网站公告板功能
</label>
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="website_announcement_indexonly">
<label class="form-check-label" for="website_announcement_indexonly">
若启用网站公告板，公告板内容仅在网站首页显示
</label>
</div>


<div class="mb-3">
<label class="form-label">如果启用了网站公告板，其内容是：（内容将按照html格式解析）</label>
<br />
<textarea class="form-control" id="website_announcement_content">
${blog["网站公告"]}

</textarea>
<br />


</div>

</div>

<div class="fluentinterface" id="favicon_navhash" style="display:none">
<h2><i class="fa fa-smile-o"></i> ${langdata["FAVICON"][lang_name]}</h2>
<br />
<p>${langdata["FAVICON_DESCRIPTION"][0][lang_name]}</p>
<p>${langdata["FAVICON_DESCRIPTION"][1][lang_name]}</p>
<p>${langdata["FAVICON_DESCRIPTION"][2][lang_name]}</p>
<button class="fluentbtn fluentbtn-blue" onclick="select_a_favicon()">${langdata["SELECT_FAVICON"][lang_name]}</button>
<button class="fluentbtn fluentbtn-blue" onclick="view_current_icon()">${langdata["VIEW_FAVICON"][lang_name]}</button>
<button class="fluentbtn" onclick="delete_current_icon()">${langdata["DELETE_FAVICON"][lang_name]}</button>
</div>
<div class="fluentinterface" id="bgimage_navhash">
<h2><i class="fa fa-file-image-o"></i> ${langdata["SITE_BGIMAGE"][lang_name]}</h2><br />

<select class="form-select" style="display:none">
<option value="bgimg_use_random_acgnpic">使用随机的 ACGN 插画作为网页背景</option>
<option value="bgimg_use_blank">空白背景</option>
<option value="bgimg_use_url">将某个URL作为网页背景图像</option>
<option value="bgimg_use_file">选择一个图片文件作为网页背景图像</option>
</select>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_is_using_acg_bg">
<label class="form-check-label" for="blog_settings_is_using_acg_bg">
${langdata["USE_RANDOM_ACG_PIC_AS_BGIMG"][lang_name]}
</label>
</div>
</div>
<div class="fluentinterface" id="thirdpartytheme_navhash" style="display:none">
<h2><i class="fa fa-paint-brush"></i> ${langdata["USE_3RD_THEME"][lang_name]}</h2>
<br />
<p id="isUsingThirdPartyTheme"></p>


<button class="fluentbtn" onclick="reset_official_theme();">${langdata["RESET_TO_OFFICIAL_THEME"][lang_name]}</button>
<button class="fluentbtn" onclick="open_online_theme_dialog()">${langdata["OPEN_THEME_STORE"][lang_name]}</button>
<br /><br />
<button class="btn btn-link" onclick="apply_thirdparty_theme();">${langdata["USE_3RD_THEME_FROM_FILE"][lang_name]}</button>
</div>

<div class="fluentinterface" id="comment_settings_navhash">
<h2><i class="fa fa-comments-o"></i>  ${langdata["COMMENT_SETTINGS"][lang_name]}</h2>
<br />

<div id="hint_of_use_public_comment_service">
${langdata["COMMENT_SETTINGS_SIMPLE_DESCRIPTION"][lang_name]}
<br /><br />
<li> ${langdata["COMMENT_SETTINGS_WAY1_PART1"][lang_name]}<a href="#" onclick="use_public_comment_service_offered_by_bbg();"> ${langdata["COMMENT_SETTINGS_WAY1_PART2"][lang_name]}</a>${langdata["COMMENT_SETTINGS_WAY1_PART3"][lang_name]}</li>
<br />
<li>${langdata["COMMENT_SETTINGS_WAY2"][lang_name]}</li>
<br />
</div>

<div id="leancloud_settings_detail">

<p>${langdata["COMMENT_SETTINGS_FORM_HINT"][lang_name]}</p>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_is_valine_enabled">
<label class="form-check-label" for="blog_settings_is_valine_enabled">
${langdata["ENABLE_VALINE"][lang_name]}
</label>
</div>
<br />
<div class="mb-3">
<label class="form-label">${langdata["VALINE_APPID"][lang_name]}</label>
<input class="form-control"  value="${blog["全局评论设置"]["valine设置"]["leancloud_appid"]}"  id="blog_settings_valine_appid">
</div>

<div class="mb-3">
<label class="form-label">${langdata["VALINE_APPKEY"][lang_name]}</label>
<input class="form-control" value="${blog["全局评论设置"]["valine设置"]["leancloud_appkey"]}" id="blog_settings_valine_appkey">
</div>
</div>
</div>

<div class="fluentinterface" id="cdn_settings_navhash">
<h2><i class="fa fa-bolt"></i>  ${langdata["CDN_SETTINGS"][lang_name]}</h2>
<br/>
<div id="cdn_settings_desc"> ${langdata["CDN_SETTINGS_SIMPLE_DESCRIPTION"][lang_name]}</div>
<div class="mb-3">
<br />
  <label class="form-label"> ${langdata["CDN_SETTINGS_METHOD"][lang_name]} </label>
  <br/>
  <input type="radio" id="cdn_cho_1" name="cdn_choose">&nbsp;&nbsp;${langdata["CDN_SETTINGS_LIST"][lang_name]}<br/>
  <input type="radio" id="cdn_cho_2" name="cdn_choose">&nbsp;&nbsp;${langdata["CDN_SETTINGS_MANUAL"][lang_name]}
  <div id="cdn_cho" style="display:none">
    <select name="cdn_path" class="form-control" id="blog_setting_cdn_frm_1">
      <option value="https://unpkg.com">${langdata["CDN_SETTINGS_OFFICAL"][lang_name]} </option>
      <option value="https://cdn.jsdelivr.net/npm" selected>${langdata["CDN_SETTINGS_JSD"][lang_name]}</option>
      <option value="https://unpkg.zhimg.com">${langdata["CDN_SETTINGS_ZHIMG"][lang_name]} </option>
      <option value="https://unpkg.chicdn.cn">${langdata["CDN_SETTINGS_CHICDN"][lang_name]} </option>
    </select>      
  </div>
  <div id="cdn_manual" style="display:none">
  <br>
  <label class="form-label" for="cdn_path"> ${langdata["CDN_SETTINGS_MANUAL_SET"][lang_name]} </label><br>
  <input name="cdn_path" class="form-control" type="text" id="blog_setting_cdn_frm_2">
  </div>
</div>
</div>

<div class="fluentinterface" id="advanced_navhash">
<h3>高级自定义</h3>
<p>以下选项仅供有能力的用户使用。</p>
<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_enable_custom_css">
<label class="form-check-label" for="blog_settings_enable_custom_css">
启用网站的自定义CSS支持
</label>
</div>

<p>你可以为网站编写自定义 CSS 来改变其样式。如果这一项不打勾，自定义 CSS 样式将不会被解析。</p>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_enable_custom_js">
<label class="form-check-label" for="blog_settings_enable_custom_js">
启用网站的自定义JavaScript支持
</label>
</div>

<p>你可以为网站编写自定义 JavaScript 代码。这些 JavaScript 代码将在整个博客被渲染完成之后执行，所以你有很大的自主权。如果这一项不打勾，自定义 JavaScript 代码将不会被解析。</p>

<div class="mb-3">
<label class="form-label">自定义 CSS 代码</label>
<br />
<textarea class="form-control" id="blog_settings_custom_css">
${blog["自定义CSS"]}

</textarea>
<br />


</div>

<div class="mb-3">
<label class="form-label">自定义 JavaScript 代码</label>
<br />
<textarea class="form-control" id="blog_settings_custom_js">
${blog["自定义JS"]}

</textarea>
<br />


</div>



</div>
<div class="fluentinterface" style="position:fixed;bottom:4px;width:80%;box-shadow: 4px 3px 1px -2px rgb(0 0 0 / 20%),0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);">
<button class="fluentbtn fluentbtn-blue" onclick="save_blog_settings();">保存本次配置</button>
<button class="fluentbtn" onclick="window.location.reload()">放弃本次对网站设置所作的更改</button>
<button class="fluentbtn fluentbtn-blue" onclick="document.documentElement.scrollTop = 0;">返回顶部</button>
</div>

</div>

</div>

<br />
 

<hr />

  `


  if (blog["全局评论设置"]["启用valine评论"] === true) {
    document.getElementById("blog_settings_is_valine_enabled").checked = true;
  }

  if (blog["不使用全站内容授权协议"] === true) {
    document.getElementById("blog_content_license_enabled").checked = true;

  }

  if (blog["全局主题设置"]["是否使用第三方主题"] === true) {

    if (blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === true) {
      document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  目前此站点正在使用<b>从文件安装的第三方主题</b>，如果可能的话建议你从主题商店安装，因为主题商店的主题通常都有更好的支持。
  
  `;
    }

    if (blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === false) {
      document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  目前此站点正在使用 <b>来自主题商店的第三方主题。</b>该主题的相关信息如下：<br /><br />主题名称：<b>${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"]}</b><br />
  主题版本：<b>${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"]}</b>
  
  `;
    }


  } else {
    document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  ${langdata["STATUS_USING_OFFICIAL_THEME"][lang_name]}
  
  `;
  }

  if (blog["全局主题设置"]["是否使用背景图像"] && blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"]) {
    document.getElementById("blog_settings_is_using_acg_bg").checked = true;
  }

  if (blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"]) {
    document.getElementById("leancloud_settings_detail").innerHTML = `你正在使用公共评论服务，所以不能手动设置此项。<a href="#" onclick="disable_puclic_comment_service()">如果你不想继续使用公共评论服务了，请点击这里</a>`;
    document.getElementById("hint_of_use_public_comment_service").innerHTML = "";

  }

  if (blog["网站语言"] === "简体中文") {
    document.getElementById("sitelang_simplified_chinese").selected = true;
  }

  if (blog["网站语言"] === "English") {
    document.getElementById("sitelang_english").selected = true;
  }

  if (blog["启用网站公告"] === true) {
    document.getElementById("website_announcement_enabled").checked = true;
  }

  if (blog["网站公告仅在首页显示"] === true) {
    document.getElementById("website_announcement_indexonly").checked = true;

  }

  if (blog["启用自定义CSS"] === true) {
    document.getElementById("blog_settings_enable_custom_css").checked = true;
  }

  if (blog["启用自定义JS"] === true) {
    document.getElementById("blog_settings_enable_custom_js").checked = true;
  }

  if (blog["CDN选择"] === 1) {
    // 从列表中选择cdn地址
    document.getElementById("cdn_cho_1").checked = true;
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
      document.getElementById("blog_setting_cdn_frm_1").value = blog["CDN路径"];
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  } else {
    // 手动输入cdn路径
    document.getElementById("cdn_cho_2").checked = true;
    document.getElementById("blog_setting_cdn_frm_2").value = blog["CDN路径"];
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  }

  document.getElementById("cdn_cho_1").onchange = function () {
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  }

  document.getElementById("cdn_cho_2").onchange = function () {
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  }

  document.getElementById("nav_to_blog_settings").classList.add("active");
}

const save_blog_settings = function () {
  let blog_settings_description = document.getElementById("blog_settings_description").value;
  let blog_settings_title = document.getElementById("blog_settings_title").value;
  let blog_settings_titlebar_bgcolor = document.getElementById("blog_settings_titlebar_bgcolor").value;
  let blog_settings_titlebar_textcolor = document.getElementById("blog_settings_titlebar_textcolor").value;
  let blog_settings_howmany_article_in_a_page = document.getElementById("blog_settings_howmany_article_in_a_page").value;
  let blog_settings_cdn_path;
  let blog_settings_cdn_mode;
  try {
    blog_settings_is_valine_enabled = document.getElementById("blog_settings_is_valine_enabled").checked;
    blog_settings_valine_appid = document.getElementById("blog_settings_valine_appid").value;
    blog_settings_valine_appkey = document.getElementById("blog_settings_valine_appkey").value;
  } catch (e) {
    console.log(e)
  }

  let blog_settings_bottom_information = document.getElementById("blog_settings_bottom_information").value;
  let blog_settings_is_using_acg_bg = document.getElementById("blog_settings_is_using_acg_bg").checked;
  let website_announcement_enabled = document.getElementById("website_announcement_enabled").checked;
  let website_announcement_indexonly = document.getElementById("website_announcement_indexonly").checked;
  let website_announcement_content = document.getElementById("website_announcement_content").value;
  let blog_settings_enable_custom_css = document.getElementById("blog_settings_enable_custom_css").checked;
  let blog_settings_enable_custom_js = document.getElementById("blog_settings_enable_custom_js").checked;
  let blog_settings_custom_css = document.getElementById("blog_settings_custom_css").value;
  let blog_settings_custom_js = document.getElementById("blog_settings_custom_js").value;
  let blog_settings_content_license = document.getElementById("blog_settings_content_license").value;
  let blog_content_license_enabled = document.getElementById("blog_content_license_enabled").checked;

  if (document.getElementById("cdn_cho_1").checked === true) {
    blog_settings_cdn_path = document.getElementById("blog_setting_cdn_frm_1").value;
    blog_settings_cdn_mode = 1;
  } else {
    blog_settings_cdn_path = document.getElementById("blog_setting_cdn_frm_2").value;
    blog_settings_cdn_mode = 2;
  }

  blog["博客标题"] = blog_settings_title;
  blog["博客描述（副标题）"] = blog_settings_description;
  blog["全局主题设置"]["标题栏背景颜色"] = blog_settings_titlebar_bgcolor;
  blog["全局主题设置"]["标题栏文字颜色"] = blog_settings_titlebar_textcolor;
  blog["文章列表中每页的文章数为"] = blog_settings_howmany_article_in_a_page;
  blog["全站内容授权协议"] = blog_settings_content_license;
  blog["不使用全站内容授权协议"] = blog_content_license_enabled;

  blog["底部信息（格式为markdown）"] = blog_settings_bottom_information;

  if (blog_settings_is_using_acg_bg === true) {
    blog["全局主题设置"]["是否使用背景图像"] = true;
    blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"] = true;
  } else {
    blog["全局主题设置"]["是否使用背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"] = false;

  }
  try {
    if (blog_settings_is_valine_enabled === true) {
      blog["全局评论设置"]["启用valine评论"] = true;
    } else {
      blog["全局评论设置"]["启用valine评论"] = false;
    }
  } catch (error) {

  }

  try {
    blog["全局评论设置"]["valine设置"]["leancloud_appid"] = blog_settings_valine_appid;
    blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = blog_settings_valine_appkey;
  } catch (error) {

  }

  if (document.getElementById("sitelang_simplified_chinese").selected === true) {
    blog["网站语言"] = "简体中文";
  }
  if (document.getElementById("sitelang_english").selected === true) {
    blog["网站语言"] = "English";
  }

  blog["启用网站公告"] = website_announcement_enabled;
  blog["网站公告仅在首页显示"] = website_announcement_indexonly;
  blog["网站公告"] = website_announcement_content;

  blog["CDN选择"] = blog_settings_cdn_mode;
  blog["CDN路径"] = blog_settings_cdn_path;


  blog["启用自定义CSS"] = blog_settings_enable_custom_css;
  blog["启用自定义JS"] = blog_settings_enable_custom_js;
  blog["自定义CSS"] = blog_settings_custom_css;
  blog["自定义JS"] = blog_settings_custom_js;

  BlogInstance.writeBlogData();
}

function preview_site(){
  window.open("../index.html")
} 

const delete_friend = function (i) {

  save_friend_book();

  render_friend_book_list();

  blog["友人帐"].splice(i, 1);

  render_friend_book_list();

  save_friend_book();
}

const delete_page = function (i) {

  if (window.confirm("是否确认删除此页面？*此操作不可逆")) {
    //用户选择删除
    remove_a_file(`/pages/${blog["页面列表"][i]["文件名"]}`);
    blog["页面列表"].splice(i, 1);
    BlogInstance.writeBlogData();
    window.location.reload();

  } else {

  }

}

const edit_article = function(filename){
  window.location.href = `./edit_file.html?type=article&filename=${filename}`;
}

const edit_page = function(filename){
  window.location.href = `./edit_file.html?type=page&filename=${filename}`;
}

const getUrlArgs = function (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

const save_article = function(){
  let params = new URLSearchParams();
  params.append('fileloc', `articles/${getUrlArgs("filename")}`);

  params.append('filecontent', document.getElementById("article_edit_content").value);
  
  axios.post('./save_file.php', params)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    window.location.href="./article_manager.html";
}

const save_page = function(){
  let params = new URLSearchParams();
  params.append('fileloc', `pages/${getUrlArgs("filename")}`);

  params.append('filecontent', document.getElementById("page_edit_content").value);
  
  axios.post('./save_file.php', params)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    window.location.href="./page_manager.html";
}

const render_edit_file = function(){

  document.getElementById("container").innerHTML += `<br /><br />`;
  if(getUrlArgs("type") === "article"){
    for(let i=0;i<blog["文章列表"].length;i++){
      if(getUrlArgs("filename") === blog["文章列表"][i]["文件名"]){
        document.getElementById("container").innerHTML +=`
        
        <h3>正在编辑文章 《${blog["文章列表"][i]["文章标题"]}》</h3>
        
        `;

        axios.get(`../data/articles/${getUrlArgs("filename")}?timestamp=${Date.parse(new Date())}`).then((data)=>{
          console.log(data);
          document.getElementById("container").innerHTML+=`
          
          
          
          <textarea class="form-control" id="article_edit_content" rows="10" placeholder="在这里输入文章内容，使用markdown格式">${data.data}</textarea>
          <br />
          <button class="fluentbtn fluentbtn-blue" onclick="save_article()">完成编辑</button>
          
          
          
          `;
        })
      }
    }
  }

  if(getUrlArgs("type") === "page"){
    for(let i=0;i<blog["页面列表"].length;i++){
      if(getUrlArgs("filename") === blog["页面列表"][i]["文件名"]){
        document.getElementById("container").innerHTML +=`
        
        <h3>正在编辑页面 《${blog["页面列表"][i]["页面标题"]}》</h3>
        
        `;

        axios.get(`../data/pages/${getUrlArgs("filename")}?timestamp=${Date.parse(new Date())}`).then((data)=>{
          console.log(data);
          document.getElementById("container").innerHTML+=`
          
          
          
          <textarea class="form-control" id="page_edit_content" rows="10" placeholder="在这里输入页面内容，使用markdown格式">${data.data}</textarea>
          <br />
          <button class="fluentbtn fluentbtn-blue" onclick="save_page()">完成编辑</button>
          
          
          
          `;
        })
      }
    }
  }



}

const use_public_comment_service_offered_by_bbg = function () {
  if (
    window.confirm(
      `
      公共评论服务由 BBG 免费向您提供，确认注册使用之后，您无需再注册 Leancloud 账号即可为你的站点开启评论功能；但是，请注意我们会拥有你的站点的评论数据的完整的访问和控制权限。我们不对评论数据的可用性、可靠性、完整性、安全性作任何形式的保证，并且我们随时可以在不另行通知的情况下终止相关服务。请注意，此评论服务启用了站点隔离，因此不同的域名会被视作不同的站点，从而展示不同的评论。\n
      你是否接受以上内容？如果选择“是”，目前对站点设置所作的更改将会保存生效，然后我们将为您注册 BBG 公共评论服务；如果选择“否”，你的站点将保持原样。
      `
    )
  ) {

    save_blog_settings();

    blog["全局评论设置"]["启用valine评论"] = true;
    blog["全局评论设置"]["valine设置"]["leancloud_appid"] = "SykuVs4qcWMkl4RUtKEUlmog-gzGzoHsz";
    blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = "0jowkR4ct0lJbWcvocymEkKw";
    blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = true;

    BlogInstance.writeBlogData();
    window.alert("注册成功。");
    window.location.reload();


  }
};

const disable_puclic_comment_service = function () {
  save_blog_settings();
  blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = false;
  blog["全局评论设置"]["启用valine评论"] = false;
  blog["全局评论设置"]["valine设置"]["leancloud_appid"] = "";
  blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = "";
  BlogInstance.writeBlogData();
  window.location.reload();
}


axios
.get("../data/index.json?timestamp=" + Date.parse(new Date()))
.then(function (response) {
  blog = response.data;
  console.log(blog);

  render_container();
  render_nav();
  loadUniStyle();


  if(window.location.href.indexOf("article_manager.html") !== -1){
    render_article_manager();
  }

  if(window.location.href.indexOf("page_manager.html") !== -1){
    render_page_manager();
  }

  if(window.location.href.indexOf("blog_settings.html") !== -1){
    render_blog_settings();
  }

  if(window.location.href.indexOf("edit_file.html") !== -1){
    render_edit_file();
  }

  
}
  
  );


