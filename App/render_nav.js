module.exports = function () {
  document.getElementById("nav_container").innerHTML += getUiFileContent("nav_ui.html");

  const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};
