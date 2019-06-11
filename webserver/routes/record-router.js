'use strict';

const express = require('express');

const router = express.Router();

const createRecordController = require('../controllers/create-record/create-record-controller');

/**
 * Define routes
 */

router.post('/new-record', createRecordController);

module.exports = router;

