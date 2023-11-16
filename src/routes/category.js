const express = require('express');
const router = express.Router();

const categoryController = require('../controller/CategoryController');

router.put('/:id/delete',  categoryController.delete);
router.put('/:id',categoryController.update);
router.delete('/:id', categoryController.destroy);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router;
