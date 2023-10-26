const Order = require('../models/Order');

class OrderController {
   getAll(req, res){
    Order.find({})
        .then ((orders)=> res.send(orders))
        .catch(err => console.log(err));
   }
}

module.exports  = new OrderController;