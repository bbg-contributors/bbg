// const { app, BrowserWindow } = require('electron');

// require('@electron/remote/main').initialize();

// function createWindow() {
//     win = new BrowserWindow({
//         width: 1200,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//             webSecurity: false
//         }
//     })

//     require("@electron/remote/main").enable(win.webContents);
//     win.loadFile('./Docs/index.html');
//     win.webContents.openDevTools();
//     console.log(app.getPath('userData'));
// }


// app.whenReady().then(() => {
//     createWindow();
// })

// TODO: fix electron

// Now use express instead.

const path = require('path')
const express = require('express')
let app = express()
app.use('/', express.static(path.join(__dirname, '/Docs/')))
app.listen('23941')
console.log('App listening on http://localhost:23941')