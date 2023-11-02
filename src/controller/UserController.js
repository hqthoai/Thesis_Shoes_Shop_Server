
const User = require('../models/User');

const UserController = {
    
    getAll: (req, res) => {
        User.find({})
        .then ((users)=> res.json(users))
        .catch(() => res.status(404).json('Không tìm thấy danh sách người dùng.'));
    },

    getById: (req, res) => {
        User.findOne({_id: req.params.id})
        .then((user) => {
           res.json(user);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy người dùng.');
        })
    },

    // create(req, res) {
    //     const user = new User (req.body);
    //     try {
    //         user.save();
    //         res.json(user);
    //     } catch (error) {
    //         throw Error(`Xảy ra lỗi trong quá trình tạo user :  ${err}`)
    //     }  
    // }

    // Đăng ký
  
    update: (req, res) => {
        User.findOne({_id: req.params.id})
        .then((user) => {
            User.updateOne({_id: user._id}, req.body)
            .then(()=>{
                res.status(200).json('Cập nhật người dùng thành công.');
            })
            .catch((err)=>{
                res.status(500).json('Có lỗi xảy ra trong quá trình cập nhật user.');
            })
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy người dùng.')
        })
    },

    delete: (req, res) => {
        User.findOne({_id: req.params.id})
        .then((user)=> {
            User.updateOne({_id: user._id}, req.body)
            .then(()=>{
                res.status(200).json('Xóa người dùng thành công.');
            })
            .catch((err)=> {
                res.status(500).json('Có lỗi khi xóa người dùng.');
            });
        })
        .catch(()=> {
            res.status(404).json('Không tìm thấy người dùng.');
        })
    },

    destroy: async (req, res) => {
        try {
            const result = await User.deleteOne({_id: req.params.id});
            if (result.deletedCount===0) {
                res.status(404).json('Không tìm thấy người dùng.');
            }
            else {
                res.status(200).json('Xóa vĩnh viễn người dùng thành công.');
            }
        } catch (error) {
            res.status(500).json('Có lỗi khi xóa người dùng');
        }
    }
}

module.exports = UserController;