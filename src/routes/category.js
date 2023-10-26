const express = require('express');
const router = express.Router();

const categoryController = require('../controller/CategoryController');

router.post('/create', categoryController.create);
router.put('/update/:id',categoryController.update);
router.put('/delete/:id',  categoryController.delete);
router.delete('/destroy/:id', categoryController.destroy);
router.get('/:id', categoryController.getById);
router.get('/', categoryController.getAll);

module.exports = router;
