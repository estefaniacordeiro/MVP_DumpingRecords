'use strict';

const express = require('express');

const router = express.Router();

const loginAdminController = require('../controllers/login-admin-controller');

/**
 * Define routes
 */
router.post('/login-admin', loginAdminController);

module.exports = router;
