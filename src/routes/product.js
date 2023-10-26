const express = require('express');
const router = express.Router();

const ProductController = require('../controller/ProductController');

router.post('/create', ProductController.create);
router.put('/update/:id', ProductController.update);
router.put('/delete/:id', ProductController.delete);
router.delete('/destroy/:id', ProductController.destroy);
router.get('/:id', ProductController.getById);  
router.get('/', ProductController.getAll);  

module.exports = router;
