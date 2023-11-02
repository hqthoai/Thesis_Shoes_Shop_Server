const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const userController = require ('../controller/UserController');

// router.post('/create', userController.create);

router.put('/update/:id', authToken.verifyTokenAdmin, userController.update);
router.put('/delete/:id', authToken.verifyTokenAdmin, userController.delete);
router.delete('/destroy/:id',authToken.verifyTokenAdmin, userController.destroy);
router.get('/:id',authToken.verifyTokenAdmin, userController.getById);
router.get('/',authToken.verifyTokenAdmin, userController.getAll);

module.exports = router;
