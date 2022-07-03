const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const express = require("express");
const eapp = express();
eapp.use("/", express.static(path.join(__dirname, "/docs/")));
eapp.listen("23941");
// console.log("App listening on http://localhost:23941");

require("@electron/remote/main").initialize();

function createWindow () {
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  require("@electron/remote/main").enable(win.webContents);
  win.loadFile("./DeveloperPanel/index.html");
}

app.whenReady().then(() => {
  createWindow();
});
