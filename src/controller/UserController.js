
const bcrypt = require('bcrypt')
const User = require('../models/User');

const UserController = {
    
    getAll: (req, res) => {
        User.find({})
        .then ((users)=> res.status(200).json(users))
        .catch(() => res.status(404).json('Không tìm thấy danh sách người dùng.'));
    },

    getById: (req, res) => {
        User.findOne({_id: req.params.id})
        .then((user) => {
           res.status(200).json(user);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy người dùng.');
        })
    },
    
    updateProfile: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findOne({ _id: id });
            if (user) {
                await User.updateOne({_id: id}, req.body)
                return res.status(200).json("Cập nhật profile thành công")
            }
            else {
                return res.status(404).json({
                    message:'Không tìm thấy user!',
                })
            }
        } catch (err) {
            return res.status(400).json(`Có lỗi trong quá trình cập nhật profile :  ${err}`)
        }
    },

    changePassword: (req, res) => {
        User.findOne({_id: req.params.id})
        .then(async (user) => {
            const { password, newPassword } = req.body;
            // kiểm tra password người dùng gửi lên
            const isSamePassword = bcrypt.compareSync(password, user.password);
            if (isSamePassword) {
                const hashNewPassword = await bcrypt.hash(newPassword,10)
                await User.updateOne({ _id: user._id }, { password: hashNewPassword});
                const { password, ...others } = user._doc;
                return res.status(200).json(others);
            } else {
                return res.status(401).json('Mật khẩu không chính xác! Vui lòng nhập lại');
            }
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy người dùng.')
        })
    },

    create: async (req, res) =>  {
        try {
            const {email, firstName, lastName, password, phone, address} = req.body;
            const existentUser = await User.findOne({ email });
            if (!existentUser) {
                const hashPassword = await bcrypt.hash(password, 10)
                const user = await User.create({
                    email,
                    firstName,
                    lastName,
                    password: hashPassword,
                    phone,
                    address
                })
                return res.status(201).json(user)
            }
            else {
                return res.status(400).json({
                    message:'Email đã tồn tại!',
                })
            }
        } catch (err) {
            return res.status(400).json(`Có lỗi trong quá trình tạo user :  ${err}`)
        }
    },

    update: async (req, res) => {
        try {
            const {email, firstName, lastName, password, phone, address} = req.body;
            const user = await User.findOne({ email });
            if (user) {
                const hashPassword = await bcrypt.hash(password, 10)
                const userUpdated = {
                    email,
                    firstName,
                    lastName,
                    password: hashPassword,
                    phone,
                    address
                }
                await User.updateOne({_id: user._id}, userUpdated)
                return res.status(200).json("Cập nhật user thành công")
            }
            else {
                return res.status(404).json({
                    message:'Không tìm thấy user!',
                })
            }
        } catch (err) {
            return res.status(400).json(`Có lỗi trong quá trình cập nhật user :  ${err}`)
        }
    },

    delete: (req, res) => {
        User.findOne({_id: req.params.id})
        .then((user)=> {
            User.updateOne({_id: user._id}, req.body)
            .then(()=>{
                res.status(204).json('Xóa người dùng thành công.');
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
                res.status(204).json('Xóa vĩnh viễn người dùng thành công.');
            }
        } catch (error) {
            res.status(500).json('Có lỗi khi xóa người dùng');
        }
    }
}

module.exports = UserController;