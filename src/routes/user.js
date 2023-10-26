const express = require('express');
const router = express.Router();

const userController = require ('../controller/UserController');

router.post('/save', userController.getAll);
router.put('/update/:id',userController.getAll);
router.put('/delete/:id',  userController.getAll);
router.delete('/destroy/:id', userController.getAll);
router.get('/', userController.getAll);

module.exports = router;
