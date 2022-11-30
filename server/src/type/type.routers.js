const express = require('express');
const router = express.Router();

const typeController = require('./type.controller');


router.get('', typeController.getAll);
router.get('/:typeName', typeController.get);
router.post('/create', typeController.create);
router.delete('/:typeName', typeController.delete);

module.exports = router;
