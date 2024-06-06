const path = require("path");
const { readFileSync, existsSync } = require("fs");
const storage = require("electron-json-storage");
const AppPath = require("@electron/remote").app.getPath("userData");

storage.setDataPath(AppPath);

module.exports = function () {


  storage.has("custom_ui_v1", (err, hasKey) => {
    if (err) console.error(err);
    if (hasKey) {
      storage.get("custom_ui_v1", (error, data) => {
        if (error) console.error(error);
        if (data.enable_custom_ui) {
          loadBasicStyle(true);
          let cssContent = "";
          let bg_img = data.bg_img;
          let primary_color = data.primary_color;
          if(primary_color === ""){
            primary_color = "#0d6efd";
          }
          cssContent += `
          body {
            background-image: url("data:image/jpeg;base64,${readFileSync(bg_img).toString("base64")}")!important;
            background-postion: center center!important;
            background-size: cover!important;
            background-repeat: no-repeat!important;
            background-attachment: fixed!important;
          }

          .container, .container-fluid, #container, #preview-section-container, #editor_textarea, .model-body, .modal-content {
            background-color: rgba(255, 255, 255, 0.8)!important;
          }

          #nav_list, #nav_container, .article-item, .page-item, .fluentinterface, .modal-header {
            background-color: rgba(255, 255, 255, 0.5)!important;
          }

          #nav_list button, .navbar .container-fluid, .modal-dialog, .modal-body .container-fluid {
            background: transparent!important;
          }
          `;

          document.getElementById("custom_ui").innerHTML = cssContent;
        } else {
          loadBasicStyle();
        }
      });
    } else {
      loadBasicStyle();
    }
  });

  function loadBasicStyle(force_light = false){

    if(force_light){
      const cssContent = readFileSync(path.join(__dirname, "/stylesheets/default.css"));
      document.getElementById("uniform").innerHTML = cssContent;
    }
    else{
      storage.has("stylesheet", (err, hasKey) => {
        if (err) console.error(err);
        if (hasKey) {
          storage.get("stylesheet", (error, data) => {
            if (error) console.error(error);
            if (existsSync(path.join(__dirname, "/stylesheets/" + data.file))) {
              const cssContent = readFileSync(path.join(__dirname, "/stylesheets/" + data.file));
              document.getElementById("uniform").innerHTML = cssContent;
            } else {
              storage.set("stylesheet", { file: "default.css" }, () => {
                window.location.reload();
              });
            }
          });
        } else {
          storage.set("stylesheet", { file: "default.css" }, () => {
            window.location.reload();
          });
        }
      });
    }

    
  }

};
