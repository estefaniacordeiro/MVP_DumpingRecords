'use strict';

/**
 * Installed packages
 */
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mysqlPool = require('./database/mysql-pool');

/**
 * Routes
 */
const routers = require('./webserver/routes')

/**
 * Initializations
 */
const app = express();

/**
 * Middlewares
 */
app.use(bodyParser.json());
app.use('/api', routers.recordRouter);


/**
 * Init connection to mysql
 */
async function init() {
    try {
        await mysqlPool.connect();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    /**
     * Starting the server
     */
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server running and listening on port ${port}`);
    });
}

init();







// PARA DESPLEGALO:
// const port = process.env.PORT;
//   app.listen(port, () => {
//     console.log(`Server running and listening on port ${port}`);
//   });