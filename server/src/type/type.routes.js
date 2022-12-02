const express = require('express');
const router = express.Router();

const typeController = require('./type.controller');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;
const isManager = authMiddleware.isManager;

router.get('', typeController.getAll);
router.get('/:typeName', typeController.get);
router.post('/create', isAuth, isManager, typeController.create);
router.delete('/:typeName', isAuth, isManager, typeController.delete);

module.exports = router;
