const { app, BrowserWindow, Menu } = require('electron');

//Menu.setApplicationMenu(null)

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })

    win.loadFile('./App/start.html');
}


app.whenReady().then(() => {
    createWindow();
})