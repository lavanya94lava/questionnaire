const express = require('express');
const router = express.Router();
const optionsController = require('../../controllers/optionsController');


router.get('/:id/delete',optionsController.delete);
router.put(':id/add_vote',);

module.exports = router;