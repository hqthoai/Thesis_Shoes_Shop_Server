const Category = require('../models/Category');

class CategoryController {
    getAll(req, res) {
        Category.find({})
            .then ((categories)=> res.send(categories))
            .catch(err => console.log(err));
    }
}


module.exports  = new CategoryController;