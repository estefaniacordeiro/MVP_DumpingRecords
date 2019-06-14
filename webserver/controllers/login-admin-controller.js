'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const mysqlPool = require('../../database/mysql-pool');

/**
 * Create controller for routing check
 */
async function loginAdmin(req, res, next) {
    return res.status(500).send('hola');
}

// /**
//  * If user is an admin. 
//  */
// async function validateSchemaAdmin(payload) {
//     /**
//    * TODO: Fill email, password and full name rules to be (all fields are mandatory):
//    *  email: Valid email
//    *  password: Letters (upper and lower case) and number
//    *  Minimun 3 and max 30 characters, using next regular expression: /^[a-zA-Z0-9]{3,30}$/
//    */
//     const schemaAdmin = {
//         email: Joi.string().email({ minDomainAtoms: 2 }).required(),
//         password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
//     };
// }

// /**
//  * Check if the user exists into database.
//  * 
//  */
// async function findUserByEmail(email) {
//     const sqlQuery = 'SELECT * FROM users WHERE email=?';
//     const connection = await mysqlPool.getConnection();

//     try {
//         // Destructuring [ [{user}], [] ]
//         const [user] = await connection.query(sqlQuery, email);
//         return user[0] || null;
//     } catch (e) {
//         if (connection) {
//             connection.release();
//         }
//         throw e;
//     }
// }

// async function loginAdmin(req, res, next) { }

// async function comparePassword(user, password) { }

module.exports = loginAdmin;
