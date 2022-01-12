const { app, BrowserWindow, Menu } = require('electron');

require('@electron/remote/main').initialize();

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
    win.webContents.openDevTools();
    
    
    console.log(app.getPath('userData'));
}


app.whenReady().then(() => {
    createWindow();
})
