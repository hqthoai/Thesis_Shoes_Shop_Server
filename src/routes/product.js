const express = require('express');
const router = express.Router();

const ProductController = require('../controller/ProductController');

router.post('/save', ProductController.getAll);
router.put('/update/:id', ProductController.getAll);
router.delete('/delete/:id', ProductController.getAll);
router.get('/', ProductController.getAll);  

module.exports = router;
