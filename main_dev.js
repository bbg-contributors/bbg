const { app, BrowserWindow } = require("electron");
const {ipcMain} = require("electron");

if (process.argv.includes("--hot-reload")) {
  try {
    require("electron-reloader")(module);
  } catch {}
}

require("@electron/remote/main").initialize();

app.commandLine.appendSwitch("remote-debugging-port", "9541");

let CurrentStatusOfIME = "en";

const createWindow = () => {
  const win = new BrowserWindow({
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
  win.webContents.openDevTools();

  // console.log(app.getPath("userData"));
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