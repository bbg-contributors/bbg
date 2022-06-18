const { app, BrowserWindow, Menu } = require('electron');

require('@electron/remote/main').initialize();

Menu.setApplicationMenu(null)

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })


  require("@electron/remote/main").enable(win.webContents);
  win.loadFile('./App/start.html');


}


app.whenReady().then(() => {
  createWindow();
})
