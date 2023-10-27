const express = require('express');
const router = express.Router();

const userController = require ('../controller/UserController');

// router.post('/create', userController.create);
router.post('/signup', userController.signUp);
router.post('/signin', userController.singIn);
router.post('/logout', userController.logout);
router.put('/update/:id',userController.update);
router.put('/delete/:id',  userController.delete);
router.delete('/destroy/:id', userController.destroy);
router.get('/:id', userController.getById);
router.get('/', userController.getAll);

module.exports = router;
