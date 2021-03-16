const express = require('express');
const path    = require('path');

const ReactRoutes = function (app) {
    const router = express.Router();

    router.get('/', (req, resp) => {
        resp.sendFile(path.join(__dirname, "..", "..", "app", "build", "index.html"))
    });

    app.use('/', router);
}

module.exports = ReactRoutes;