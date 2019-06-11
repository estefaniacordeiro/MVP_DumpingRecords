'use strict';

const mysqlPool = require('../../../database/mysql-pool');

/**
 * Create middleware for routing check
 */
async function createRecord(req, res, next) {
    return res.status(500).send('hola');
}

module.exports = createRecord;


