'use strict';

const express = require('express');

const checkJwtToken = require('../controllers/session/check-jwt-token');
const checkIsAdmin = require('../controllers/session/check-is-admin');
const createRecordController = require('../controllers/record/create-record-controller');
const searchRecords = require('../controllers/record/search-record-controller');

const router = express.Router();


/**
 * Define routes
 */

router.post('/new-record', checkJwtToken, checkIsAdmin, createRecordController);
router.get('/search-record', checkJwtToken, checkIsAdmin, searchRecords);

module.exports = router;
