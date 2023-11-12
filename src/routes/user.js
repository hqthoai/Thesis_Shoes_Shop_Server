const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const userController = require ('../controller/UserController');

// router.post('/create', userController.create);

router.put('/delete/:id', authToken.verifyTokenAdmin, userController.delete);
router.put('/:id', authToken.verifyTokenAdmin, userController.update);
router.delete('/:id',authToken.verifyTokenAdmin, userController.destroy);
router.get('/:id',authToken.verifyTokenAdmin, userController.getById);
router.post('/', userController.create);
router.get('/', userController.getAll);

module.exports = router;
