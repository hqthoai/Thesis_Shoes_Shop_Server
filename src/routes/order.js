const express = require('express');
const router = express.Router();

const orderController = require('../controller/OrderController');

router.get('/getAll', orderController.getAll);
router.post('/create', orderController.create);
router.put('/update/:id',orderController.update);
router.put('/delete/:id',  orderController.delete);
router.delete('/destroy/:id', orderController.destroy);
router.get('/:id', orderController.getById);

module.exports = router;
