module.exports = function(){
  const preview_and_publish_dialog = new bootstrap.Modal(document.getElementById("preview_and_publish_dialog"));
  preview_and_publish_dialog.toggle();
  document.querySelector("#preview_and_publish_content").innerHTML = /* html */`
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" id="preview_site_tab">预览站点</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="publish_site_tab">发布站点</a>
    </li>
  </ul>
  `;
};