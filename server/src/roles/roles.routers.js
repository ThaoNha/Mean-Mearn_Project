const express = require('express');
const router = express.Router();

const roleController = require('./roles.controller');

router.get('', roleController.getAll);
router.get('/:roleName',  roleController.get);
router.post('/create', roleController.create);
router.delete('/:roleName', roleController.delete);

module.exports = router;
