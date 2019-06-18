'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const mysqlPool = require('../../database/mysql-pool');

/**
 * Create controller for routing check.
 */
// async function loginAdmin(req, res, next) {
//     return res.status(500).send('hola');
// }

/**
 * If user is an admin, validate incoming data.  
 */
async function validateSchemaAdmin(payload) {
  /**
   * TODO: Fill email, password and full name rules to be (all fields are mandatory):
   *  email: Valid email
   *  password: Letters (upper and lower case) and number
   *  Minimun 3 and max 30 characters, using next regular expression: /^[a-zA-Z0-9]{3,30}$/
   */

  const schemaAdmin = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };

  return Joi.validate(payload, schemaAdmin);
}

/**
 * Controller to login admin user.
 */
async function loginAdmin(req, res, next) {
  /**
   * Validar datos de entrada con Joi
   */
  const accountData = { ...req.body };
  try {
    await validateSchemaAdmin(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  /**
   * Check if the admin user exists in the database.
   */
  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT
    user_id, role_id, email, password, uuid, activated_at
    FROM users
    WHERE email = '${accountData.email}'`;

    const [result] = await connection.query(sqlQuery);
    if (result.length === 1) {
      const userData = result[0];

      if (!userData.activated_at) {
        return res.status(403).send();
      }

      /**
       * Check password is correct or incorrect.
       */
      const isPasswordOk = await bcrypt.compare(accountData.password, userData.password);
      if (isPasswordOk === false) {
        return res.status(401).send();
      }

      /**
      * Generate JWT token with uuid + role (admin) 
      * associated to the token.
      */
      const payloadJwt = {
        uuid: userData.uuid,
        role: userData.role_id,
      };

      const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
      const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
      const response = {
        accessToken: token,
        expiresIn: jwtTokenExpiration,
      };

      return res.status(200).json(response);
    }

    return res.status(404).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = loginAdmin;
