const User = require('../models/User');

class UserController {
    getAll(req, res) {
        User.find({})
        .then ((users)=> res.send(users))
        .catch(err => console.log(err));
    }
}

module.exports  = new UserController;