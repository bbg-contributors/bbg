const path = require("path");
const { readFileSync, existsSync } = require("fs");
const storage = require("electron-json-storage");
const AppPath = require("@electron/remote").app.getPath("userData");

storage.setDataPath(AppPath);

module.exports = function () {
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
};
