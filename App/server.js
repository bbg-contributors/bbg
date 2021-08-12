const server = require('html-pages');
const { ipcRenderer } = require('electron');
const getUrlArgs = require("./getUrlArgs.js");
const rootDir = decodeURIComponent(getUrlArgs("rootdir"));
const shell = require("electron").remote.shell;


const LiveServer = server(rootDir, {
    port: 41701
});

ipcRenderer.send('isLiveServerRunning', true);

function exit_preview() {
    LiveServer.stop();
    ipcRenderer.send('isLiveServerRunning', false);
    window.location.href = `./article_manager.html?rootdir=${rootDir}`;
}

function openInBrowser() {
    shell.openExternal(`http://localhost:41701`);
}

setTimeout(openInBrowser, 800);
ipcRenderer.on('requestRendererProcess', (event, message) => {
    if (message === "closeServer") {
        LiveServer.stop();
        ipcRenderer.send('isLiveServerRunning', false);
        ipcRenderer.send('requestMainProcess', "closeProgram");

    }
})