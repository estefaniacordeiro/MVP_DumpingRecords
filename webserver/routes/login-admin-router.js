'use strict';

const express = require('express');

const checkIsAdmin = require('../controllers/session/check-is-admin');

const router = express.Router();

const loginAdminController = require('../controllers/login-admin-controller');

/**
 * Define routes
 */
router.post('/login-admin', checkIsAdmin, loginAdminController);

module.exports = router;
