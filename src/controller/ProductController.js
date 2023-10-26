const Product = require('../models/Product');

class ProductController {
    
    getAll(req, res) {
        Product.find({})
        .then ((products)=> res.send(products))
        .catch(err => console.log(err));
    }

}

module.exports  = new ProductController;