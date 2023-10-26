const express = require('express');
const router = express.Router();

const categoryController = require('../controller/CategoryController');

router.post('/save', categoryController.getAll);
router.put('/update/:id', categoryController.getAll);
router.delete('/delete/:id', categoryController.getAll);
router.get('/', categoryController.getAll);

module.exports = router;
