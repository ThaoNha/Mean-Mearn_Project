const express = require('express');
const router = express.Router();

const authMiddleware = require('../auth/auth.middleware');
const userController = require('./users.controller');
const isAuth = authMiddleware.isAuth;

router.get('/profile', isAuth, async (req, res) => {
  res.send(req.user);
});

router.put('/update', isAuth, userController.update);

module.exports = router;
