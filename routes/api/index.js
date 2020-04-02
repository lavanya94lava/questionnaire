const express = require('express');

const router = express.Router();

router.use('/question', require('./questions'));
router.use('/option', require('./options'));

module.exports = router;