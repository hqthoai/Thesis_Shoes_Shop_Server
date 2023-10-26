const express = require('express');
const router = express.Router();

const orderController = require('../controller/OrderController');

router.post('/create', orderController.create);
router.put('/update/:id',orderController.update);
router.put('/delete/:id',  orderController.delete);
router.delete('/destroy/:id', orderController.destroy);
router.get('/:id', orderController.getById);
router.get('/', orderController.getAll);

module.exports = router;
