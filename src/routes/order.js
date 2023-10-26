const express = require('express');
const router = express.Router();

const orderController = require('../controller/OrderController');

router.post('/save', orderController.getAll);
router.put('/update/:id', orderController.getAll);
router.delete('/delete/:id', orderController.getAll);
router.get('/', orderController.getAll);

module.exports = router;
