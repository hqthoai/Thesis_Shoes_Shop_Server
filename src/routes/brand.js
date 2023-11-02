const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/authToken');
const brandController = require('../controller/BrandController');

router.post('/create', authToken.verifyTokenAdmin, brandController.create);
router.put('/update/:id', authToken.verifyTokenAdmin, brandController.update);
router.put('/delete/:id', authToken.verifyTokenAdmin, brandController.delete);
router.delete('/destroy/:id', authToken.verifyTokenAdmin, brandController.destroy);
router.get('/:id', brandController.getById);  
router.get('/', brandController.getAll);  

module.exports = router;
