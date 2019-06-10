'use strict';

// require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

const port = 3000;
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
});







// PARA DESPLEGALO:
// const port = process.env.PORT;
//   app.listen(port, () => {
//     console.log(`Server running and listening on port ${port}`);
//   });