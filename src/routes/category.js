const express = require('express');
const router = express.Router();

const categoryController = require('../controller/CategoryController');

router.put('/delete/:id',  categoryController.delete);
router.put('/:id',categoryController.update);
router.delete('/:id', categoryController.destroy);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router;
