const { app, BrowserWindow, ipcMain, shell } = require("electron");
const previewServer = require("./preview_server_main.js");

const guess_shell_path = function(){
  if (process.platform == "win32") {
    return process.env["ComSpec"];
  } else {
    return process.env["SHELL"];
  }
};

if (process.argv.includes("--hot-reload")) {
  try {
    require("electron-reloader")(module);
  } catch {}
}

require("@electron/remote/main").initialize();

app.commandLine.appendSwitch("gtk-version", "3");
app.commandLine.appendSwitch("remote-debugging-port", "9541");

/** @type {BrowserWindow | null | undefined} */
let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    minWidth: 800,
    minHeight: 600
  });

  require("@electron/remote/main").enable(win.webContents);
  win.loadFile("./App/start.html");
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    let new_win = new BrowserWindow({
      width: 1200,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      minWidth: 800,
      minHeight: 600
    });
    require("@electron/remote/main").enable(new_win.webContents);
    new_win.loadURL(url);
    new_win.webContents.openDevTools();
    return { action: "deny" };
  });
  win.webContents.openDevTools();
};

ipcMain.handle("preview-server:get-info", async () => {
  await previewServer.initPreviewPort();
  return previewServer.getPreviewServerInfo();
});

ipcMain.handle("preview-server:serve-directory", async (event, rootDir) => {
  return previewServer.serveDirectory(rootDir);
});

app.whenReady().then(async () => {
  await previewServer.initPreviewPort();
  createWindow();
});
