const preview_server_ipc = require("./preview_server_ipc.js");

module.exports = function(){
  const deployGuide = {
    "简体中文": {
      gitTab: "使用Git发布站点",
      scpTab: "使用SCP发布站点",
      manualTab: "手动发布站点",
      gitTitle: "使用 Git 发布站点",
      gitIntro: [
        "如果你打算使用 GitHub Pages、GitLab Pages 或其他支持 Git 的静态托管平台，通常应先注册平台账号，并创建一个用于存放站点文件的仓库。",
        "BBG 生成的是可直接上线的静态文件，因此通常做法是把站点根目录作为仓库内容推送到远程平台。"
      ],
      gitSteps: [
        "打开站点根目录，确认 `index.html`、`data/`、主题文件和其他静态资源都已经准备好。",
        "如果目录还不是 Git 仓库，在终端执行 `git init`，并添加你的远程仓库地址。",
        "执行提交和推送，把整个站点目录发布到远程仓库。",
        "如果托管平台要求指定分支或发布目录，请在平台后台完成相应配置。"
      ],
      gitCodeTitle: "常见命令示例",
      gitCode: `git init
git remote add origin <你的仓库地址>
git add .
git commit -m "site update"
git push -u origin main`,
      scpTitle: "使用 SCP 发布站点",
      scpIntro: [
        "如果你有自己的服务器，并且它可以直接托管静态文件，那么把 BBG 生成的站点文件上传到服务器目录是很常见的部署方式。",
        "这种方式通常要求你已经知道服务器地址、SSH 账号以及网站文件的目标目录。"
      ],
      scpSteps: [
        "先准备好服务器上的网站根目录，并确保你可以通过 SSH 登录到服务器。",
        "在本机终端中使用 `scp -r` 或 `rsync`，把站点根目录中的文件递归上传到服务器目标目录。",
        "上传完成后，检查服务器上是否已经存在 `index.html`、`data/` 和其他所需文件。",
        "如果你的线上环境带有缓存、CDN 或反向代理，请按环境要求刷新缓存或重载配置。"
      ],
      scpCodeTitle: "常见命令示例",
      scpCode: `scp -r ./你的站点目录/* user@server:/var/www/html/

rsync -avz ./你的站点目录/ user@server:/var/www/html/`,
      manualTitle: "手动发布站点",
      manualIntro: [
        "如果你的托管平台提供网页上传、面板文件管理器、FTP 后台或对象存储控制台，也可以完全通过界面手动部署。",
        "在这种方式下，重点是把站点根目录中的文件完整上传到平台要求的网站目录。"
      ],
      manualSteps: [
        "直接打开站点根目录，确认其中所有文件都是你要上线的内容。",
        "如果平台支持网页上传，先注册账号并创建站点或项目，然后在平台后台上传这些文件，或者导入对应仓库。",
        "如果你使用 FTP、面板文件管理器或主机控制台，也可以把这些文件直接复制到网站根目录。",
        "发布完成后访问线上地址，检查首页、文章页、页面页与静态资源是否正常。"
      ],
      openRootDir: "打开站点根目录"
    },
    "日本語": {
      gitTab: "Gitで公開",
      scpTab: "SCPで公開",
      manualTab: "手動で公開",
      gitTitle: "Git でサイトを公開する",
      gitIntro: [
        "GitHub Pages や GitLab Pages などを使う場合は、まずアカウントを作成し、サイト用リポジトリを準備するのが一般的です。",
        "BBG の出力はそのまま静的サイトとして公開できるため、サイトルート全体をリポジトリとして管理する形になります。"
      ],
      gitSteps: [
        "サイトのルートを開き、`index.html`、`data/`、テーマファイル、その他の静的ファイルがそろっていることを確認します。",
        "まだ Git リポジトリでない場合は `git init` を実行し、公開先に合わせてリモートを追加します。",
        "コミットして push し、サイト一式を静的ホスティングへ反映します。",
        "公開先でブランチやディレクトリ指定が必要な場合は、その設定を管理画面で行ってください。"
      ],
      gitCodeTitle: "コマンド例",
      gitCode: `git init
git remote add origin <repository-url>
git add .
git commit -m "site update"
git push -u origin main`,
      scpTitle: "SCP でサイトを公開する",
      scpIntro: [
        "自分のサーバーで静的ファイルを配信する場合は、BBG の出力をサーバーへ直接転送する方法が使えます。",
        "この方法では、SSH 接続情報と配置先ディレクトリを事前に把握しておく必要があります。"
      ],
      scpSteps: [
        "サーバー上の公開先ディレクトリを準備し、SSH 接続が正常に行えることを確認します。",
        "`scp -r` または `rsync` を使って、サイトルート内のファイルをサーバーへアップロードします。",
        "アップロード後、`index.html`、`data/`、その他の静的ファイルが正しく配置されているか確認します。",
        "キャッシュや CDN を使っている場合は、必要に応じて更新を反映します。"
      ],
      scpCodeTitle: "コマンド例",
      scpCode: `scp -r ./site-root/* user@server:/var/www/html/

rsync -avz ./site-root/ user@server:/var/www/html/`,
      manualTitle: "手動でサイトを公開する",
      manualIntro: [
        "Web 管理画面、FTP、ファイルマネージャーなどを使って手動で公開することもできます。",
        "重要なのは、サイトルート内のファイル一式を正しい公開先へ配置することです。"
      ],
      manualSteps: [
        "サイトのルートディレクトリを開き、公開対象ファイルを確認します。",
        "Web 管理画面のあるホスティングなら、先にアカウントやサイト設定を作成し、その後でアップロードまたはリポジトリ連携を行います。",
        "FTP やホスティングのファイル管理機能を使う場合は、サイト内の全ファイルを公開先へコピーします。",
        "公開後に本番 URL を開き、ページと静的ファイルが正しく表示されるか確認します。"
      ],
      openRootDir: "サイトのルートを開く"
    },
    "default": {
      gitTab: "Publish with Git",
      scpTab: "Publish with SCP",
      manualTab: "Publish Manually",
      gitTitle: "Publish the Site with Git",
      gitIntro: [
        "If you plan to use GitHub Pages, GitLab Pages, or another Git-based static host, the normal first step is to create an account there and create a repository for your site.",
        "Because BBG outputs a ready-to-serve static site, the usual deployment model is to push the site root directory itself to that remote repository."
      ],
      gitSteps: [
        "Open the site root and confirm `index.html`, `data/`, theme files, and other static assets are ready.",
        "If the directory is not yet a Git repository, run `git init` and add the correct remote.",
        "Commit the site root and push it to the remote repository.",
        "If the provider requires a specific branch or directory, configure that in the hosting dashboard."
      ],
      gitCodeTitle: "Example Commands",
      gitCode: `git init
git remote add origin <repository-url>
git add .
git commit -m "site update"
git push -u origin main`,
      scpTitle: "Publish the Site with SCP",
      scpIntro: [
        "If you already run your own server and it serves static files directly, uploading the BBG site root to that server is a straightforward deployment path.",
        "This assumes you already know the SSH login details and the correct target directory on the server."
      ],
      scpSteps: [
        "Prepare the target web directory on your server and confirm SSH access works.",
        "Use `scp -r` or `rsync` from your terminal to upload the site files to the server.",
        "Verify that `index.html`, `data/`, and the other assets are present on the server.",
        "Refresh caches or CDN layers if your deployment environment requires it."
      ],
      scpCodeTitle: "Example Commands",
      scpCode: `scp -r ./site-root/* user@server:/var/www/html/

rsync -avz ./site-root/ user@server:/var/www/html/`,
      manualTitle: "Publish the Site Manually",
      manualIntro: [
        "If your host offers a web dashboard, object storage UI, FTP panel, or file manager, you can also deploy the site fully by hand.",
        "In that case, the important part is to upload the complete contents of the site root directory to the location that serves your website."
      ],
      manualSteps: [
        "Open the site root and confirm all files you want to publish are present.",
        "If your host provides a web dashboard, create the site or project there first, then upload the files or connect the repository containing this directory.",
        "If you use FTP or a hosting file manager, copy the site root files into the web root.",
        "After publishing, visit the production URL and verify pages and assets load correctly."
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
  const preview_and_publish_dialog = new bootstrap.Modal(document.getElementById("preview_and_publish_dialog"));
  preview_and_publish_dialog.toggle();
  document.querySelector("#preview_and_publish_content").innerHTML = /* html */`
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" id="preview_tab">${langdata.PREVIEW_YOUR_SITE[lang_name]}</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="git_publish_tab">${guide.gitTab}</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="scp_publish_tab">${guide.scpTab}</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="manual_publish_tab">${guide.manualTab}</a>
    </li>
  </ul>
  <br />
  <div id="preview_content" style="display: block;">
    <p>${langdata.PREVIEW_SITE_CONTENT[0][lang_name]}<a class="btn btn-sm btn-link" id="preview_site_dialog_link" href="#" target="_blank" rel="noreferrer">Loading...</a>${langdata.PREVIEW_SITE_CONTENT[1][lang_name]}</p>
    <button class="btn btn-outline-success" onclick="preview_and_publish.openInBrowser()">${langdata.PREVIEW_SITE_IN_BROWSER[lang_name]}</button>
  </div>
  <div id="git_publish_content" style="display: none;">
    <h4>${guide.gitTitle}</h4>
    ${renderIntro(guide.gitIntro)}
    ${renderStepList(guide.gitSteps)}
    ${renderCodeBlock(guide.gitCodeTitle, guide.gitCode)}
    <button class="btn btn-outline-primary" onclick="open_blog_dir()">${guide.openRootDir}</button>
  </div>
  <div id="scp_publish_content" style="display: none;">
    <h4>${guide.scpTitle}</h4>
    ${renderIntro(guide.scpIntro)}
    ${renderStepList(guide.scpSteps)}
    ${renderCodeBlock(guide.scpCodeTitle, guide.scpCode)}
    <button class="btn btn-outline-primary" onclick="open_blog_dir()">${guide.openRootDir}</button>
  </div>
  <div id="manual_publish_content" style="display: none;">
    <h4>${guide.manualTitle}</h4>
    ${renderIntro(guide.manualIntro)}
    ${renderStepList(guide.manualSteps)}
    <button class="btn btn-outline-primary" onclick="open_blog_dir()">${guide.openRootDir}</button>
    <br /><br />
  </div>
  `;
  preview_server_ipc.getPreviewUrl(rootDir).then((previewUrl) => {
    const previewLink = document.querySelector("#preview_site_dialog_link");
    previewLink.href = previewUrl;
    previewLink.textContent = previewUrl;
  }).catch((error) => {
    console.error(error);
  });
  const sections = ["preview", "git_publish", "scp_publish", "manual_publish"];
  const switchSection = function (activeSection) {
    sections.forEach((section) => {
      document.querySelector(`#${section}_tab`).classList.toggle("active", section === activeSection);
      document.querySelector(`#${section}_content`).style.display = section === activeSection ? "block" : "none";
    });
  };

  sections.forEach((section) => {
    document.querySelector(`#${section}_tab`).addEventListener("click", function(){
      switchSection(section);
    });
  });
};
