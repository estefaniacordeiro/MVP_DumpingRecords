'use strict';

require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const mysqlPool = require("./database/mysql-pool");

const app = express();

app.use(bodyParser.json());

async function init() {
    try {
        await mysqlPool.connect();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

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