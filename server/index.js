const express      = require('express');
const bodyParser   = require('body-parser');
const path         = require('path');
require('express-async-errors');

const Routes       = require('./routes');
const errorHandler = require('./errors/handler');
const env          = require('./configs/env');
const allowCors    = require('./configs/cors');

// Configuration Express
const PORT = env.port;
const app  = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCors);

// Routes System
new Routes(app);

// Routes Static
app.use('/static', express.static(path.join(__dirname, "..", "app", "build", "static")));

// Treat Errors
app.use(errorHandler);

// Define port and show initial message
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta: ${PORT}`)
});