const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const userController = require ('../controller/UserController');

// router.post('/create', userController.create);

router.put('/:id/delete', authToken.verifyTokenAdmin, userController.delete);
router.put('/:id/change-password', userController.changePassword);
router.put('/:id/profile', userController.updateProfile);
router.put('/:id',  userController.update);
router.delete('/:id', userController.destroy);
router.get('/:id',userController.getById);
router.post('/', userController.create);
router.get('/', userController.getAll);

module.exports = router;
