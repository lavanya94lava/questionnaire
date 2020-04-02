const express = require('express');

const router = express.Router();

router.use('/question', require('./question'));

module.exports = router;