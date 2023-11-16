const express = require('express');
const router = express.Router();

const orderController = require('../controller/OrderController');

router.put('/:id/delete',  orderController.delete);
router.put('/:id',orderController.update);
router.delete('/:id', orderController.destroy);
router.get('/:id', orderController.getById);
router.post('/', orderController.create);
router.get('/', orderController.getAll);

module.exports = router;
