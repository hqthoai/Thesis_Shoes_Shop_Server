const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const AuthController = require ('../controller/AuthController');

// router.post('/create', AuthController.create);
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.singIn);
router.post('/refreshToken', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

module.exports = router;