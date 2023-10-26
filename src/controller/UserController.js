const User = require('../models/User');

class UserController {
    getAll(req, res) {
        User.find({})
        .then ((users)=> res.send(users))
        .catch(() => res.status(404).send('Không tìm thấy danh sách người dùng.'));
    }

    getById(req, res) {
        User.findOne({_id: req.params.id})
        .then((user) => {
           res.send(user);
        })
        .catch(()=>{
            res.status(404).send('Không tìm thấy người dùng.')
        })
    }

    create(req, res) { 
        const user = new User(req.body);
        try {
            user.save();
            res.send(user);
        } catch (error) {
            res.status(500).send('Xảy ra lỗi trong quá trình tạo user.')
        }  
    }

    update(req, res) {
        User.findOne({_id: req.params.id})
        .then((user) => {
            User.updateOne({_id: user._id}, req.body)
            .then(()=>{
                res.status(200).send('Cập nhật người dùng thành công.');
            })
            .catch((err)=>{
                res.status(500).send('Có lỗi xảy ra trong quá trình cập nhật user.');
            })
        })
        .catch(()=>{
            res.status(404).send('Không tìm thấy người dùng.')
        })
    }

    delete(req, res) {
        User.findOne({_id: req.params.id})
        .then((user)=> {
            User.updateOne({_id: user._id}, req.body)
            .then(()=>{
                res.status(200).send('Xóa người dùng thành công.');
            })
            .catch((err)=> {
                res.status(500).send('Có lỗi khi xóa người dùng.');
            });
        })
        .catch(()=> {
            res.status(404).send('Không tìm thấy người dùng.');
        })
    }

    async destroy (req, res) {
        try {
            const result = await User.deleteOne({_id: req.params.id});
            if (result.deletedCount===0) {
                res.status(404).send('Không tìm thấy người dùng.');
            }
            else {
                res.status(200).send('Xóa vĩnh viễn người dùng thành công.');
            }
        } catch (error) {
            res.status(500).send('Có lỗi khi xóa người dùng');
        }
    }
}

module.exports  = new UserController;