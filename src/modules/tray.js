const { app, Tray, Menu, dialog, ipcMain } = require('electron')
const { spawn } = require('child_process')
const path      = require('path')
const sort_by   = require('../utils/sort')
const store     = require('../utils/store')

// Init Store
store.create()

// Env
const env = require('../../.env')

module.exports = {
    tray    : null,
    win     : null,
    projects: [],

    trayIcon: function (win) {
        this.win      = win
        this.tray     = new Tray(path.join(__dirname, '..', 'images', 'tray.png'))
        this.projects = store.get('projects')

        this.tray.setToolTip(env.title)
        this._projectsEvents()
        this._setContext()

        this.tray.on('double-click', () => this.win.isVisible() ? this.win.hide() : this.win.show())
        this.tray.on('click', () => this.tray.popUpContextMenu(this._getContext()));

        return this.tray
    },

    _setContext: function () {
        const context = Menu.buildFromTemplate([
            {label: 'Editar Projetos', click: () => { this.win.isVisible() ? this.win.hide() : this.win.show() }},
            {type: 'separator'},
            {label: 'Fechar', click: () => { app.quit() }}
        ])
        this.tray.setContextMenu(context)
    },

    _getContext: function () {
        this.projects = store.get('projects')
        this.win.webContents.send('store', this.projects)

        let items = this.projects.map(el => ({
            label: el.name,
            click: () => { spawn('code', [el.path], { shell: true }) }
        }))

        return Menu.buildFromTemplate([...items])
    },

    _projectsEvents: async function () {
        ipcMain.on('addProject', async (event, arg) => {
            const result   = await dialog.showOpenDialog({ properties: ['openDirectory'] })
            if (result.canceled) return

            const pathFile = result.filePaths[0]
            const name     = await path.basename(pathFile)
            this.projects  = [...this.projects, {path: '"' + pathFile + '"', name}].sort(sort_by({name: 'name'}))

            event.reply('projects', this.projects)
            store.set('projects', this.projects)
            this._setContext()
        })

        ipcMain.on('removeProject', async (event, arg) => {
            if (arg==='all') {
                this.projects = []
                event.reply('projects', this.projects)
                store.set('projects', this.projects)
                this._setContext()
                return
            }

            this.projects = this.projects.filter(x => x.name!==arg).sort(sort_by({name: 'name'}))
            event.reply('projects', this.projects)
            store.set('projects', this.projects)
            this._setContext()
        })
    },
}