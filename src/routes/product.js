const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const ProductController = require('../controller/ProductController');
const uploadCloud = require('../middlewares/uploader');

router.get('/lastest-products', ProductController.getLatest)
router.put('/:id/delete',  ProductController.delete);
router.put('/:id',uploadCloud.single('images'), ProductController.update);
router.delete('/:id', ProductController.destroy);
router.get('/:id', ProductController.getById);  
router.post('/', uploadCloud.single('images') ,ProductController.create);
router.get('/', ProductController.getAll);  
// router.post('/create', authToken.verifyTokenAdmin, ProductController.createMany);

module.exports = router;
