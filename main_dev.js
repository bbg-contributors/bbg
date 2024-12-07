const { app, BrowserWindow, ipcMain } = require("electron");

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

app.commandLine.appendSwitch("remote-debugging-port", "9541");

/** @type {string} */
let CurrentStatusOfIME = "en";
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
  });
  win.webContents.openDevTools();
};

app.whenReady().then(() => createWindow());

ipcMain.on("ime_setToEnglishMode", () => {
  CurrentStatusOfIME = "en";
});

ipcMain.on("ime_setToInputMode", () => {
  CurrentStatusOfIME = "input";
});

ipcMain.on("ime_getCurrentStatus", (event) => {
  event.returnValue = CurrentStatusOfIME;
});