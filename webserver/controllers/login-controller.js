'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const mysqlPool = require('../../database/mysql-pool');

/**
 * Create controller for routing check
 */
async function login(req, res, next) {
    return res.status(500).send('hola');
}

// async function validateSchema(payload){}

// async function findUserByEmail(email) {}

// async function login(req, res, next) {}

// async function comparePassword(user, password) {}

module.exports = login;
