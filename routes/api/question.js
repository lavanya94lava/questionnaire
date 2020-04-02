const express = require('express');
const router = express.Router();
const questionsController = require('../../controllers/questionsController');


router.post('/create', questionsController.create);

module.exports = router;