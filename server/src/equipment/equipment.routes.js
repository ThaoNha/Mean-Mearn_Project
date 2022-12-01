const express = require('express');
const router = express.Router();

const equipmentController = require('./equipment.controllers');

const authMiddleware = require('../auth/auth.middleware');
const isAuth = authMiddleware.isAuth;

// @route GET api/equipment

router.get('', isAuth, equipmentController.getAll);
router.get('/:equipmentId', isAuth, equipmentController.get);
router.post('/create', isAuth, equipmentController.create);
router.put('/:equipmentId', isAuth, equipmentController.update);
router.delete('/:equipmentId', isAuth, equipmentController.delete);

module.exports = router;
