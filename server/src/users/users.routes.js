const express = require('express');
const router = express.Router();

const userController = require('./users.controller');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;
const isManager = authMiddleware.isManager;

router.get('/profile', isAuth, async (req, res) => {
  res.send(req.user);
});

router.get('', isAuth, isManager, userController.get);

router.put('/update', isAuth, userController.update);

router.put(
  '/forget-password/:userId',
  isAuth,
  isManager,
  userController.forgetPassword,
);

module.exports = router;
