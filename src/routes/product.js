const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const ProductController = require('../controller/ProductController');

router.post('/create', authToken.verifyTokenAdmin, ProductController.create);
router.put('/update/:id', authToken.verifyTokenAdmin, ProductController.update);
router.put('/delete/:id', authToken.verifyTokenAdmin, ProductController.delete);
router.delete('/destroy/:id', authToken.verifyTokenAdmin, ProductController.destroy);
router.get('/:id', ProductController.getById);  
router.post('/', authToken.verifyTokenAdmin, ProductController.createMany);
router.get('/', ProductController.getAll);  

module.exports = router;
