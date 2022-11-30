const express = require('express');
const router = express.Router();

const statusController = require('./status.controller');

router.get('', statusController.getAll);
router.get('/:statusName', statusController.get);
router.post('/create', statusController.create);
router.delete('/:statusName', statusController.delete);

module.exports = router;
