const { BrowserWindow, screen, ipcMain } = require('electron')
const path = require('path')
const env  = require('../../.env')

module.exports = {
    create: function () {
        const { width, height } = screen.getPrimaryDisplay().workAreaSize
        const win = new BrowserWindow({
            x: width-400,
            y: height-600,
            width: 400,
            height: 600,
            minWidth: 400,
            minHeight: 600,
            show: false,
            frame: false,
            resizable: false,
            skipTaskbar: true,
            icon: path.join(__dirname, '..', 'images', 'tray.png'),
            darkTheme: true,
            webPreferences: {
                worldSafeExecuteJavaScript: true,
                nodeIntegration: true,
                enableRemoteModule: false,
                contextIsolation: false
            }
        })

        // Load program html
        win.loadURL(env.isDev ? env.urlDev : env.url)

        // Event to show program
        win.on('show', () => process.platform==='darwin' && tray.setHighlightMode('always'))

        // Event to hide program
        win.on('hide', () => process.platform==='darwin' && tray.setHighlightMode('never'))

        win.setAlwaysOnTop(true)
        win.on('blur', () => { win.webContents.postMessage('infos', false); setTimeout(() => win.hide(), 20) })

        // Open the DevTools.
        // win.webContents.openDevTools()

        return win;
    }
}