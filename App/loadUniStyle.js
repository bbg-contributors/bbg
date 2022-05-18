const { copyFileSync, constants, readFileSync, existsSync } = require('fs');
const storage = require("electron-json-storage");
const AppPath = require('@electron/remote').app.getPath('userData');

storage.setDataPath(AppPath);

module.exports = function () {

  storage.has("stylesheet", function (error, hasKey) {
    if (hasKey) {
      storage.get("stylesheet", function (error, data) {
        if (existsSync(`${__dirname}/stylesheets/${data["file"]}`)) {
          let cssContent = readFileSync(`${__dirname}/stylesheets/${data["file"]}`);
          document.getElementById("uniform").innerHTML = cssContent;
        } else {
          storage.set("stylesheet", { file: "default.css" }, function (err) {
            window.location.reload();
          });
        }
      })

    } else {
      storage.set("stylesheet", { file: "default.css" }, function (err) {
        window.location.reload();
      });
    }
  });

}
