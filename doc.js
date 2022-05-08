const path = require('path')
const express = require('express')
let eapp = express()
eapp.use('/', express.static(path.join(__dirname, '/docs/')))
eapp.listen('23941')
console.log('App listening on http://localhost:23941')

const { app, BrowserWindow, BrowserView } = require('electron');

require('@electron/remote/main').initialize();

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    })

    // const view = new BrowserView()
    // win.setBrowserView(view)
    // view.setBounds({ x: 0, y: 0, width: 1200, height: 600})
    // view.webContents.loadURL
    require("@electron/remote/main").enable(win.webContents);
    win.loadURL('http://localhost:23941/');
    // win.webContents.openDevTools();
    // console.log(app.getPath('userData'));
}


app.whenReady().then(() => {
    createWindow();
})