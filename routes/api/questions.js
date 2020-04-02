const express = require('express');
const router = express.Router();
const questionsController = require('../../controllers/questionsController');


router.post('/create', questionsController.create);
router.post('/:id/options/create',questionsController.createOption);
router.get('/:id/delete', questionsController.delete);

module.exports = router;