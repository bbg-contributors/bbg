const preview_server_ipc = require("./preview_server_ipc.js");

module.exports = function(){
  const deployGuide = {
    "简体中文": {
      gitTab: "使用Git发布站点",
      scpTab: "使用SCP发布站点",
      manualTab: "手动发布站点",
      gitTitle: "使用 Git 发布站点",
      gitIntro: [
        "如果你准备把站点托管在 GitHub Pages、GitLab Pages 或其他支持 Git 的静态托管服务上，通常需要先注册对应平台账号，并创建一个用于存放站点文件的仓库。",
        "BBG 生成的站点本身就是静态文件集合，所以常见做法是把站点根目录直接作为仓库内容推送到远程平台，再由平台完成公开访问。"
      ],
      gitSteps: [
        "打开站点根目录，并确认其中包含 `index.html`、`data/`、主题文件以及你需要发布的其他静态资源。",
        "如果这个目录还不是 Git 仓库，在终端中执行初始化命令，然后按托管平台要求添加远程仓库地址。",
        "将站点根目录中的全部文件提交并推送到远程仓库。",
        "如果平台要求特定分支或特定发布目录，请在平台后台把发布配置指向这个仓库的正确分支。"
      ],
      gitCodeTitle: "常见命令示例",
      gitCode: `git init
git remote add origin <你的仓库地址>
git add .
git commit -m "site update"
git push -u origin main`,
      scpTitle: "使用 SCP 发布站点",
      scpIntro: [
        "如果你已经有自己的服务器，并且服务器上的 Web 服务可以直接托管静态文件，那么最直接的方式就是把 BBG 站点根目录中的文件上传到服务器的网站目录。",
        "这种方式通常适合你已经具备 SSH 登录权限，并且知道线上站点目录位置的情况。"
      ],
      scpSteps: [
        "先在服务器上准备好站点目录，例如 Nginx 或 Apache 的静态文件目录，并确认 SSH 可以正常登录。",
        "在本机终端中进入站点根目录的上一级，使用 `scp -r` 或 `rsync` 把整个站点目录中的文件上传到服务器目标目录。",
        "上传完成后，检查服务器上的 `index.html`、`data/` 和其他静态资源是否都已同步到位。",
        "如果服务器启用了缓存或 CDN，请按你的部署环境执行刷新或重新加载服务。"
      ],
      scpCodeTitle: "常见命令示例",
      scpCode: `scp -r ./你的站点目录/* user@server:/var/www/html/

# 或者使用 rsync
rsync -avz ./你的站点目录/ user@server:/var/www/html/`,
      manualTitle: "手动发布站点",
      manualIntro: [
        "如果你使用的静态托管平台提供网页控制台、对象存储后台、FTP 面板或主机文件管理器，也可以完全手动完成部署。",
        "这种方式不依赖 Git 或命令行，重点是把站点根目录中的文件完整上传到平台要求的网站目录中。"
      ],
      manualSteps: [
        "直接打开站点根目录，确认需要上线的文件都在这个目录里。",
        "如果你使用带 Web 控制台的静态托管平台，先注册账号并创建站点或存储空间，然后按照平台要求上传文件。",
        "如果你使用传统主机面板、FTP 工具或文件管理器，也可以把站点根目录中的全部文件手动复制到网站根目录。",
        "发布后访问线上地址，确认首页、文章页、页面页以及静态资源都能正常加载。"
      ],
      openRootDir: "打开站点根目录"
    },
    "日本語": {
      gitTab: "Gitで公開",
      scpTab: "SCPで公開",
      manualTab: "手動で公開",
      gitTitle: "Git でサイトを公開する",
      gitIntro: [
        "GitHub Pages や GitLab Pages などの Git ベースの静的ホスティングを使う場合は、まず対象サービスのアカウントを作成し、サイト用のリポジトリを準備します。",
        "BBG が生成するサイトはそのまま静的ファイルとして公開できるため、サイトのルートディレクトリをリポジトリ内容として管理する形になります。"
      ],
      gitSteps: [
        "サイトのルートディレクトリを開き、`index.html`、`data/`、テーマファイル、その他必要な静的ファイルがそろっていることを確認します。",
        "まだ Git リポジトリでない場合は、ターミナルで `git init` を実行し、利用するホスティング先に合わせてリモートを追加します。",
        "サイトルート全体をコミットして、ホスティング先へ push します。",
        "ホスティング先で公開ブランチや公開ディレクトリの指定が必要な場合は、その設定を調整してください。"
      ],
      gitCodeTitle: "コマンド例",
      gitCode: `git init
git remote add origin <repository-url>
git add .
git commit -m "site update"
git push -u origin main`,
      scpTitle: "SCP でサイトを公開する",
      scpIntro: [
        "自分のサーバーで静的ファイルを配信している場合は、BBG のサイトファイルをそのままサーバーへ転送する方法がもっとも直接的です。",
        "この方法では、SSH 接続情報と配置先ディレクトリを事前に把握していることが前提になります。"
      ],
      scpSteps: [
        "まずサーバー側で静的ファイルの配置先を用意し、SSH で正常に接続できることを確認します。",
        "ローカル端末でサイトルートの親ディレクトリに移動し、`scp -r` または `rsync` を使ってサイト内のファイルをサーバーへアップロードします。",
        "アップロード後、サーバー上に `index.html`、`data/`、その他の静的ファイルがすべてそろっているか確認します。",
        "キャッシュや CDN を使っている場合は、必要に応じて更新処理を行ってください。"
      ],
      scpCodeTitle: "コマンド例",
      scpCode: `scp -r ./site-root/* user@server:/var/www/html/

rsync -avz ./site-root/ user@server:/var/www/html/`,
      manualTitle: "手動でサイトを公開する",
      manualIntro: [
        "Web 管理画面、FTP、ホスティングのファイルマネージャーなどを使って手動で公開することもできます。",
        "この場合も必要なのは、BBG が生成したサイトルート内のファイル一式を正しい公開先へ配置することです。"
      ],
      manualSteps: [
        "サイトのルートディレクトリを開き、公開対象のファイルを確認します。",
        "Web 管理画面のある静的ホスティングを使う場合は、まずアカウントやサイト設定を準備し、その後にファイルをアップロードするかリポジトリを接続します。",
        "従来型のホスティングや FTP ツールを使う場合は、サイトルート内のすべてのファイルを Web 公開ディレクトリへコピーします。",
        "公開後に本番 URL へアクセスし、トップページ、記事ページ、固定ページ、静的ファイルが正しく表示されるか確認します。"
      ],
      openRootDir: "サイトのルートを開く"
    },
    "default": {
      gitTab: "Publish with Git",
      scpTab: "Publish with SCP",
      manualTab: "Publish Manually",
      gitTitle: "Publish the Site with Git",
      gitIntro: [
        "If you want to host the site on GitHub Pages, GitLab Pages, or another Git-based static hosting service, start by creating an account on that platform and creating a repository for the site.",
        "Because BBG outputs a static site directly, the usual approach is to treat the site root directory itself as the repository content and push it to the remote host."
      ],
      gitSteps: [
        "Open the site root directory and confirm it contains `index.html`, `data/`, theme files, and any other static assets you want to publish.",
        "If this directory is not yet a Git repository, run `git init` and add the remote required by your hosting provider.",
        "Commit the full site root and push it to the remote repository.",
        "If your provider requires a specific branch or publish directory, configure that in the hosting dashboard."
      ],
      gitCodeTitle: "Example Commands",
      gitCode: `git init
git remote add origin <repository-url>
git add .
git commit -m "site update"
git push -u origin main`,
      scpTitle: "Publish the Site with SCP",
      scpIntro: [
        "If you already have your own server and it can serve static files directly, uploading the BBG site root to that server is the most direct deployment path.",
        "This usually assumes you already know the server address, SSH credentials, and the target web directory."
      ],
      scpSteps: [
        "Prepare the target web directory on your server and confirm you can log in over SSH.",
        "From a terminal, move to the parent directory of the site root and use `scp -r` or `rsync` to upload the site files to the server.",
        "After the upload, verify that `index.html`, `data/`, and the other static assets are present on the server.",
        "If your deployment uses caching or a CDN, refresh it as required by your environment."
      ],
      scpCodeTitle: "Example Commands",
      scpCode: `scp -r ./site-root/* user@server:/var/www/html/

rsync -avz ./site-root/ user@server:/var/www/html/`,
      manualTitle: "Publish the Site Manually",
      manualIntro: [
        "If your hosting provider offers a web dashboard, object storage console, FTP panel, or file manager, you can also deploy the site fully by hand.",
        "In that case, the core requirement is simply to upload the full contents of the site root directory to the correct web-facing location."
      ],
      manualSteps: [
        "Open the site root directory and confirm all files you want to publish are present there.",
        "If you use a provider with a web dashboard, create the site or project there first, then upload the files or connect the repository that contains this directory.",
        "If you use a traditional hosting panel, FTP client, or file manager, copy all files from the site root into the web root.",
        "After publishing, visit the production URL and verify the home page, article pages, static pages, and assets all load correctly."
      ],
      openRootDir: "Open Site Root Directory"
    }
  };
  const guide = deployGuide[lang_name] || deployGuide.default;
  const renderInlineCode = (text) => text.replace(/`([^`]+)`/g, "<code>$1</code>");
  const renderStepList = (steps) => `<ol>${steps.map((step) => `<li>${renderInlineCode(step.replace(/^\d+\.\s*/, ""))}</li>`).join("")}</ol>`;
  const renderIntro = (paragraphs) => paragraphs.map((paragraph) => `<p>${renderInlineCode(paragraph)}</p>`).join("");
  const renderCodeBlock = (title, content) => `
    <p><strong>${renderInlineCode(title)}</strong></p>
    <pre><code>${content}</code></pre>
  `;

  document.getElementById("container").insertAdjacentHTML("beforeend", `
    <nav class="navbar navbar-toggler bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#"
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        ${langdata["PREVIEW_AND_PUBLISH"][lang_name]}</a
        >
    </div>
    </nav>
    <br /><br /><br />
    <div class="container">

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" href="#" id="preview_navitem" onclick="enterPreviewAndPublishInterfaceOf('preview')">${langdata["PREVIEW_YOUR_SITE"][lang_name]}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="git_publish_navitem" onclick="enterPreviewAndPublishInterfaceOf('git_publish')">${guide.gitTab}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="scp_publish_navitem" onclick="enterPreviewAndPublishInterfaceOf('scp_publish')">${guide.scpTab}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="manual_publish_navitem" onclick="enterPreviewAndPublishInterfaceOf('manual_publish')">${guide.manualTab}</a>
      </li>
    </ul>

    <br />
    <div id="preview_navhash" style="display:none">
      <p>${langdata.PREVIEW_SITE_CONTENT[0][lang_name]}</p>
      <p>${langdata.PREVIEW_SITE_CONTENT[1][lang_name]}<a class="btn btn-sm btn-link" id="preview_site_link" href="#" target="_blank" rel="noreferrer">Loading...</a>${langdata.PREVIEW_SITE_CONTENT[2][lang_name]}</p>
      
      <button class="btn btn-outline-success" onclick="preview_and_publish.openInBrowser()">${langdata.PREVIEW_SITE_IN_BROWSER[lang_name]}</button>

      <br /><br />
    </div>
    <div id="git_publish_navhash" style="display:none;">
    <h4>${guide.gitTitle}</h4>
    ${renderIntro(guide.gitIntro)}
    ${renderStepList(guide.gitSteps)}
    ${renderCodeBlock(guide.gitCodeTitle, guide.gitCode)}
    <button class="btn btn-outline-primary" onclick="open_blog_dir()">${guide.openRootDir}</button>
    <br /><br />
    </div>
    <div id="scp_publish_navhash" style="display:none;">
    <h4>${guide.scpTitle}</h4>
    ${renderIntro(guide.scpIntro)}
    ${renderStepList(guide.scpSteps)}
    ${renderCodeBlock(guide.scpCodeTitle, guide.scpCode)}
    <button class="btn btn-outline-primary" onclick="open_blog_dir()">${guide.openRootDir}</button>
    <br /><br />
    </div>
    <div id="manual_publish_navhash" style="display:none;">
    <h4>${guide.manualTitle}</h4>
    ${renderIntro(guide.manualIntro)}
    ${renderStepList(guide.manualSteps)}
    <button class="btn btn-outline-primary" onclick="open_blog_dir()">${guide.openRootDir}</button>
    <br /><br />
    </div>
    </div>
  `);

  preview_server_ipc.getPreviewUrl(rootDir).then((previewUrl) => {
    const previewLink = document.getElementById("preview_site_link");
    previewLink.href = previewUrl;
    previewLink.textContent = previewUrl;
  }).catch((error) => {
    console.error(error);
  });

  document.getElementById("nav_to_preview_and_publish_page").classList.add("active");

  enterPreviewAndPublishInterfaceOf("preview");
};
