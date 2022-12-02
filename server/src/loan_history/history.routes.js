const express = require('express');
const router = express.Router();

const historyController = require('./history.controller');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;
const isManager = authMiddleware.isManager;

// @route GET api/history

router.get('', isAuth, isManager, historyController.getAll);
router.get('/getHistory', isAuth, historyController.getHistory);
router.get(
  '/getByUsername/:username',
  isAuth,
  isManager,
  historyController.getByUsername,
);
router.get(
  '/getByUserId/:userId',
  isAuth,
  isManager,
  historyController.getByUserId,
);
router.get(
  '/getByEquipmentId/:equipmentId',
  isAuth,
  isManager,
  historyController.getByEquipment,
);
router.get(
  '/returnEquipment/:historyId',
  isAuth,
  isManager,
  historyController.returnEquipment,
);
router.post('/create', isAuth, isManager, historyController.create);

module.exports = router;
