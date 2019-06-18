'use strict';

/**
 * Installed packages.
 */
const Joi = require('@hapi/joi');

/**
 * Create controller for routing check
 */
async function searchRecords(req, res, next) {
  return res.status(500).send('hola');
}

module.exports = searchRecords;