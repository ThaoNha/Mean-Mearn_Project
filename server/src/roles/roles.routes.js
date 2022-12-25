const express = require('express');
const router = express.Router();

const roleController = require('./roles.controller');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;
const isManager = authMiddleware.isManager;

router.get('', roleController.getAll);
router.get('/:roleName', roleController.get);
router.post('/create', isAuth, isManager, roleController.create);
router.put('/update/:roleName', isAuth, isManager, roleController.update);
router.delete('/:roleName', isAuth, isManager, roleController.delete);

module.exports = router;
