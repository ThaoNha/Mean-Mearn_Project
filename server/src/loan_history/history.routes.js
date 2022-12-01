const express = require('express');
const router = express.Router();

const historyController = require('./history.controller');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;

// @route GET api/history

router.get('', isAuth, historyController.getAll);
router.get('/:userId', isAuth, historyController.getByUser);
router.get('/:equipmentId', isAuth, historyController.getByEquipment);
router.get('/returnEquipment/:historyId', isAuth, historyController.returnEquipment);
router.post('/create', isAuth, historyController.create);


module.exports = router;
