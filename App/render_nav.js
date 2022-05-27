module.exports = function () {
  let nav_base = `
  <div class="list-group text-center" id="nav_list">
  <button type="button" class="list-group-item list-group-item-action">
  <i class="fa fa-bars"></i>
  </button>

  <button id="nav_to_article_manager" type="button" onclick="window.location.href='./article_manager.html?rootdir=${rootDir}'" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["ARTICLE_MANAGEMENT"][lang_name]}">
  <i class="fa fa-file-text"></i>
  </button>

  <button id="nav_to_page_manager" type="button" onclick="window.location.href='./page_manager.html?rootdir=${rootDir}'" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["PAGE_MANAGEMENT"][lang_name]}">
  <i class="fa fa-files-o"></i>
  </button>

  <button id="nav_to_blog_settings" type="button" onclick="window.location.href='./blog_settings.html?rootdir=${rootDir}'" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["BLOG_SETTINGS"][lang_name]}">
  <i class="fa fa-cogs"></i>
  </button>

  <button type="button" onclick="preview_site()" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["PREVIEW_AND_PUBLISH"][lang_name]}">
  <i class="fa fa-globe"></i>
  </button>

  <button type="button" onclick="open_blog_dir()" class="list-group-item list-group-item-action" data-bs-toggle="tooltip"  data-bs-placement="right" title="${langdata["OPEN_SITE_ROOTDIR"][lang_name]}">
  <i class="fa fa-folder"></i>
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
