const express = require('express');
const router = express.Router();

const categoryController = require('../controller/CategoryController');

router.get('/getAll', categoryController.getAll);
router.post('/create', categoryController.create);
router.put('/update/:id',categoryController.update);
router.put('/delete/:id',  categoryController.delete);
router.delete('/destroy/:id', categoryController.destroy);
router.get('/:id', categoryController.getById);

module.exports = router;
