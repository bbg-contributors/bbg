const { app, BrowserWindow, Menu, ipcMain } = require('electron');

Menu.setApplicationMenu(null)

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

    win.on("close", (e) => {
        if (isLiveServerRunning === true) {
            e.preventDefault();
            win.webContents.send('requestRendererProcess', 'closeServer');
        }

    });
}


app.whenReady().then(() => {
    isLiveServerRunning = false;
    createWindow();
})

ipcMain.on('requestMainProcess', (event, msg) => {
    if (msg === "closeProgram") {
        win.close();
    }
})

ipcMain.on('isLiveServerRunning', (event, msg) => {
    isLiveServerRunning = msg;
})