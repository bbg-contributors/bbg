module.exports = function () {
  const fluent_ui_path = "../node_modules/@fluentui/web-components/dist/web-components.min.js";

  let fluent_ui_script = document.createElement("script");
  fluent_ui_script.src = fluent_ui_path;
  fluent_ui_script.type = "module";
  document.head.appendChild(fluent_ui_script);
};