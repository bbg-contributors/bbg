const { app, BrowserWindow, Menu } = require("electron");

require("@electron/remote/main").initialize();

Menu.setApplicationMenu(null);

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
};

app.whenReady().then(() => createWindow());
