const express = require('express');
const router = express.Router();

const roleController = require('./roles.controller');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;

router.get('',isAuth, roleController.getAll);
router.get('/:roleKeyword', isAuth, roleController.get);
router.post('/create',isAuth, roleController.create);
router.put('/:roleKeyword',isAuth, roleController.update);
router.delete('/:roleKeyword',isAuth, roleController.delete);

module.exports = router;
