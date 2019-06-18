'use strict';

const Joi = require('@hapi/joi');
// const jwt = require('jsonwebtoken');

const mysqlPool = require('../../database/mysql-pool');

/**
 * Create controller for routing check
 */
// async function loginCompany(req, res, next) {
//     return res.status(500).send('hola');
// }

/**
 * If user is a company.
 */
async function validateSchemaCompany(payload) {
  /**
  * TODO: Fill email, password and full name rules to be (all fields are mandatory):
  *  email: Valid email
  *  numberRecord: Letters and number:
  *    Minimun 3 and max 125 characters, using next regular expression: /^[a-zA-Z0-9]{3,30}$/
  */
  const schemaCompany = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    numberRecord: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };
}

/**
 * Controller to login company user.
 */
async function loginCompany(req, res, next) {
  /**
  * Validar datos de entrada con Joi
  */
  const accountData = { ...req.body };
  try {
    await validateSchemaCompany(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  /**
   * Check if the admin user exists in the database.
   */
  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT
    user_id, role_id, email,  password, uuid, activated_at, verification_code, verified_at, company_id, company_name, company_taxIDcode, company_address, company_telephoneNumber, company_contactPerson
    FROM users
    WHERE email = '${accountData.email}'`;

    const [result] = await connection.query(sqlQuery);
    if (result.length === 1) {
      const userData = result[0];

      if (!userData.activated_at) {
        return res.status(403).send();
      }

      /**
       * Check numberRecord is correct or incorrect.
       */
      if (accountData.numberRecord !== userData.numberRecord) {
        return res.status(401).send();
      }


      // Creo que o token neste caso poderíase omitir. User company so accede para ver datos.
      // /**
      //  * Generate JWT token with uuid + role (admin) 
      // * associated to the token.
      // */
      // const payloadJwt = {
      //     uuid: userData.uuid,
      //     role: userData.role_id,
      // };

      // const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
      // const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
      // const response = {
      //     accessToken: token,
      //     expiresIn: jwtTokenExpiration,
      // };

      return res.status(200).send();
    }

    return res.status(404).send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = loginCompany;


async function loginCompany(req, res, next) { }

async function comparePassword(user, password) { }

module.exports = loginCompany;
