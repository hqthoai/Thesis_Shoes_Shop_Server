const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const ProductController = require('../controller/ProductController');

router.get('/lastest-products', ProductController.getLatest)
router.put('/:id/delete', authToken.verifyTokenAdmin, ProductController.delete);
router.put('/:id', authToken.verifyTokenAdmin, ProductController.update);
router.delete('/:id', authToken.verifyTokenAdmin, ProductController.destroy);
router.get('/:id', ProductController.getById);  
router.post('/', authToken.verifyTokenAdmin, ProductController.create);
router.get('/', ProductController.getAll);  
// router.post('/create', authToken.verifyTokenAdmin, ProductController.createMany);

module.exports = router;
