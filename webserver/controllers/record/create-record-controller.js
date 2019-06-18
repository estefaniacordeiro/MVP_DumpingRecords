'use strict';

/**
 * Installed packages.
 */
const Joi = require('@hapi/joi');
const uuidV4 = require('uuid/v4');
const sendgridMail = require('@sendgrid/mail');

const mysqlPool = require('../../../database/mysql-pool');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Create controller for routing check
 */
// async function createRecord(req, res, next) {
//     return res.status(500).send('hola');
// }

/**
 * Middleware to validate schema with the minimun
 * fields necessary to activate company user
 * account to be created by the admin user.
 */
async function validateSchema(payload) {
  /**
   * TODO: Fill email, password and full name rules to be (all fields are mandatory):
   *  email: Valid email
   *  numberRecord: Letters  and number,
   * minimun 3 and max 125 characters, using
   * next regular expression: /^[a-zA-Z0-9]{12,16}$/
   */
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    numberRecord: Joi.string()
      .regex(/^[a-zA-Z0-9]{12,16}$/)
      .required(),
  };

  return Joi.validate(payload, schema);
}

/**
 * Create a verification code for the given user
 * and insert this code into the database.
 * @param {String} uuid
 * @return {String} verificationCode
 */
async function addVerificationCode(uuid) {
  const verificationCode = uuidV4();
  const now = new Date();
  const createdAt = now
    .toISOString()
    .substring(0, 19)
    .replace('T', ' ');
  const sqlQuery = 'INSERT INTO users SET ?';
  const connection = await mysqlPool.getConnection();

  await connection.query(sqlQuery, {
    uuid,
    verification_code: verificationCode,
    created_at: createdAt,
  });

  connection.release();

  return verificationCode;
}

/**
 * Middleware to send email registration email
 * to company users.
 * @param {String} userEmail
 * @param {String} numberRecord
 * @param {String} verificationCode
 * @return {Object} data
 */

async function sendEmailRegistration(userEmail, numberRecord, verificationCode) {
  const linkActivacion = `http://localhost:3000/api/account/activate?verification_code=${verificationCode}`;
  const msg = {
    to: userEmail,
    from: {
      email: 'mpvexp41@gmail.com',
      name: 'Exp@',
    },
    subject: 'Benvido a Exp@',
    text1: 'Exp@ é a aplicación web de seguimento de expedientes de vertidos.',
    text2: `A contrasinal para acceder ao seu expediente será o número de expediente ${numberRecord}`,
    html: `Para realizar o seguimento do seu expediente de vertido active a súa conta no seguinte <a href='${linkActivacion}'>enlace</a>`,
  };

  const data = await sendgridMail.send(msg);

  return data;
}

/**
 * Controller to create a new record by admin
 * user, including the registration of the
 * company user.
 */
async function createRecord(req, res, next) {
  const accountData = req.body;
  try {
    await validateSchema(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }
  /**
   * Insert company user into database:
   * 1. Generate uuidV4
   * 2. Look created_at
   */
  const now = new Date();
  const uuid = uuidV4();
  const createdAt = now
    .toISOString()
    .substring(0, 19)
    .replace('T', ' ');

  const connection = await mysqlPool.getConnection();
  const sqlInsercion = 'INSERT INTO users SET ?';
  console.log('hello1');
  try {
    await connection.query(sqlInsercion, {
      uuid,
      email: accountData.email,
      // numberRecord: accountData.numberRecord,
      created_at: createdAt,
    });
    console.log('hello2')
    connection.release();

    const verificationCode = await addVerificationCode(uuid);

    await sendEmailRegistration(accountData.email, accountData.numberRecord, verificationCode);

    return res.status(201).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = createRecord;
