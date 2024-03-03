const express = require('express');
const testingController = require('../controllers/testing');

const router = express.Router();

router.post('/reset', testingController.reset);

module.exports = router;
