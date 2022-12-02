const express = require('express');
const router = express.Router();

const equipmentController = require('./equipment.controllers');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;
const isManager = authMiddleware.isManager;
// @route GET api/equipment

router.get('', isAuth, equipmentController.getAll);
router.get('/:equipmentId', isAuth, equipmentController.get);
router.post('/create', isAuth, isManager, equipmentController.create);
router.put('/:equipmentId', isAuth, isManager, equipmentController.update);
router.delete('/:equipmentId', isAuth, isManager, equipmentController.delete);

module.exports = router;
