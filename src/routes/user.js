const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const userController = require ('../controller/UserController');
const OrderController = require('../controller/OrderController');

// router.post('/create', userController.create);
router.get('/:id/orders', OrderController.getOrderByUserId);
router.post('/recover-password', userController.sendRecoverPassEmail)
router.get('/check-email-availability', userController.checkEmailAvailability); // check email exist 
router.put('/:id/delete', authToken.verifyTokenAdmin, userController.delete);
router.put('/change-password', userController.changePassword);
router.put('/:id/profile', userController.updateProfile);
router.put('/:id',  userController.update);
router.delete('/:id', userController.destroy);
router.get('/:id',userController.getById);
router.post('/', userController.create);
router.get('/', userController.getAll);

module.exports = router;
