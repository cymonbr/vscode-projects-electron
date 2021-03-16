const { app }    = require('electron')
const AutoLaunch = require('auto-launch')
const store      = require('../utils/store')
const env        = require('../../.env')

// Init Store
store.create()

module.exports = {
    autoLaunch: null,

    init: function () {
        this.autoLaunch = new AutoLaunch({
            name: env.title,
            path: app.getPath('exe')
        })

        this.autoLaunch.isEnabled().then(isEnabled => {
            if (!isEnabled && store.get('configs')===null) {
                this.autoLaunch.enable()
                store.set('configs', { winStart: true })
                return
            }
        })
    },

    change: function (state) {
        let winState = { winStart: state }
        if (state) {
            this.autoLaunch.isEnabled().then(isEnabled => !isEnabled && this.autoLaunch.enable())
            store.set('configs', winState)
        } else {
            this.autoLaunch.isEnabled().then(isEnabled => isEnabled && this.autoLaunch.disable())
            store.set('configs', winState)
        }

        return winState
    }
}