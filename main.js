const { app, ipcMain } = require('electron')
const autoLaunch       = require('./src/utils/autoLaunch')
const store            = require('./src/utils/store')

// Init server
require('./server')

// Load
const winMain  = require('./src/modules/window')
const trayMain = require('./src/modules/tray')

let win, tray;
app.on('ready', () => autoLaunch.init())

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
        case 'close':
            win.webContents.postMessage('infos', false)
            setTimeout(() => win.hide(), 20)
            return
    }
})

ipcMain.on('configs', (event, arg) => {
    switch (arg.action) {
        case 'winInit':
            event.reply('configs', store.get('configs'))
            break
        case 'win':
            let winState = autoLaunch.change(arg.state)
            event.reply('configs', winState)
            break
    }
})