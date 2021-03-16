const { app, ipcMain } = require('electron')

// Init server
require('./server')

// Load
const winMain  = require('./src/modules/window')
const trayMain = require('./src/modules/tray')

let win, tray;
app.whenReady().then(async () => {
    win = winMain.create()

    // Wait load window to init
    win.once('ready-to-show', () => {
        tray = trayMain.trayIcon(win)
    })
})

// Events of design
ipcMain.on('header', (event, arg) => {
    switch (arg) {
        case 'min':
            win.minimize()
            break;

        case 'max':
            win.isMaximized() ? win.unmaximize() : win.maximize()
            break;

        case 'close':
            win.hide()
            break;
    }
})
