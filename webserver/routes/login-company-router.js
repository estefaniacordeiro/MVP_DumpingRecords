'use strict';

const express = require('express');

const router = express.Router();

const loginCompanyController = require('../controllers/login-company-controller');

/**
 * Define routes
 */
router.post('/login', loginCompanyController);

module.exports = router;
