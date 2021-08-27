const { app, BrowserWindow, Menu } = require('electron');

Menu.setApplicationMenu(null)

let win

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })

    win.loadFile('./App/start.html');
    win.webContents.openDevTools();
}


app.whenReady().then(() => {
    createWindow();
})
