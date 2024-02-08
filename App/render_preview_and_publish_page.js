
const express = require("express");

module.exports = function(){

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
        <a class="nav-link" href="#" id="publish_navitem" onclick="enterPreviewAndPublishInterfaceOf('publish')">${langdata.PUBLISH_YOUR_SITE[lang_name]}</a>
      </li>
    </ul>

    <br />
    <div id="preview_navhash" style="display:none">
      <p>${langdata.PREVIEW_SITE_CONTENT[0][lang_name]}</p>
      <p>${langdata.PREVIEW_SITE_CONTENT[1][lang_name]}<a class="btn btn-sm btn-link" onclick="shell.openExternal('http://localhost:41701')">http://localhost:41701</a>${langdata.PREVIEW_SITE_CONTENT[2][lang_name]}</p>
      
      <button class="btn btn-outline-success" onclick="preview_and_publish.openInBrowser()">${langdata.PREVIEW_SITE_IN_BROWSER[lang_name]}</button>

      <br /><br />
    </div>
    <div id="publish_navhash" style="display:none;">
    <h4>${langdata.PUSH_TO_REMOTE_TITLE[lang_name]} <span class="badge bg-info">Beta</span></h4>
    <p>${langdata.PUSH_TO_REMOTE_DESCRIPTION[lang_name]}</p>
    <button class="btn btn-outline-primary" onclick="preview_and_publish.commit_and_push();">${langdata.PUSH_TO_REMOTE[lang_name]}</button>
    <button class="btn btn-outline-primary" onclick="preview_and_publish.commit_only()">${langdata.PUSH_TO_REMOTE_WITHOUT_PUSH[lang_name]}</button>
    <br /><br />
    <hr />
    <h4>${langdata.COPY_TO_REMOTE_TITLE[lang_name]} <span class="badge bg-info">Beta</span></h4>
    <p>${langdata.COPY_TO_REMOTE_DESCRIPTION[lang_name]}</p>
    <button class="btn btn-outline-primary" onclick="preview_and_publish.secure_copy_pass();">${langdata.COPY_TO_REMOTE_WITH_PASSWD[lang_name]}</button>
    <button class="btn btn-outline-primary" onclick="preview_and_publish.secure_copy_key()">${langdata.COPY_TO_REMOTE_WITH_KEY[lang_name]}</button>
    <hr />
    <h4>${langdata.MANUALLY_UPLOAD_AND_PUBLISH[lang_name]}</h4>
    <p>${langdata.PUBLISH_SITE_CONTENT[0][lang_name]}</p>
    <p>${langdata.PUBLISH_SITE_CONTENT[1][lang_name]}</p>
    <p>${langdata.PUBLISH_SITE_CONTENT[2][lang_name]}</p>
    <p>${langdata.PUBLISH_SITE_CONTENT[3][lang_name]}</p>
    <button class="btn btn-outline-primary" onclick="open_blog_dir()">${langdata.OPEN_SITE_ROOTDIR[lang_name]}</button>

    <br /><br />
    </div>
    </div>
  `);

  const server = express();

  server.use(express.static(rootDir));

  server.listen(41701, () => {
    // console.log("live server listening at http://localhost:41701");
  });

  document.getElementById("nav_to_preview_and_publish_page").classList.add("active");

  enterPreviewAndPublishInterfaceOf("preview");
};