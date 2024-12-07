module.exports = function () {
  document.getElementById("nav_container").insertAdjacentHTML("beforeend", getUiFileContent("nav_ui.html"));

  tooltip_load();
};
