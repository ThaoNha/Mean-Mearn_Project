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

router.get('/user-role', isAuth, isManager, userController.getUser);

router.put('/update', isAuth, userController.update);

router.put('/update/:userId', isAuth, isManager, userController.updateByUserId);

router.put(
  '/forget-password/:userId',
  isAuth,
  isManager,
  userController.forgetPassword,
);

module.exports = router;
