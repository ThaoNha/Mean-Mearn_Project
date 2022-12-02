const express = require('express');
const router = express.Router();

const authController = require('./auth.controllers');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;
const isManager = authMiddleware.isManager;

router.post('/register', isAuth, isManager, authController.register);

router.post('/login', authController.login);

router.post('/refresh',isAuth, authController.refreshToken);

module.exports = router;
