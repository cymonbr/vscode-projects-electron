// Import Routes
const ReactRoutes = require('./reactRoutes');

class Routes {
    app;

    constructor(app) {
        this.app = app;

        this._getOpenRoutes();
        this._getLockRoutes();
    }

    _getOpenRoutes() {
        ReactRoutes(this.app);
    }

    _getLockRoutes() {
    }
}

module.exports = Routes;