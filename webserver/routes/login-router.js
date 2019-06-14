'use strict';

const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login-controller');

/**
 * Define routes
 */

router.post('/login', loginController);

module.exports = router;
