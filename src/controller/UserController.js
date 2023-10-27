const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserController {
    
    getAll(req, res) {
        User.find({})
        .then ((users)=> res.json(users))
        .catch(() => res.status(404).json('Không tìm thấy danh sách người dùng.'));
    }

    getById(req, res) {
        User.findOne({_id: req.params.id})
        .then((user) => {
           res.json(user);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy người dùng.');
        })
    }

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
    async signUp(req, res) { 
        try {
            const {email, firstName, lastName, password, phone} = req.body;
            const existentUser = await User.findOne({ email });
    
            if (!existentUser) {
                const hashPassword = await bcrypt.hash(password, 10)
                const user = await User.create({
                    email,
                    firstName,
                    lastName,
                    password: hashPassword,
                    phone,
                })
                return res.json(user)
            }
            else {
                return res.status(400).json({
                    message:'Email đã tồn tại! Bạn có muốn đăng nhập không? ',
                })
            }
            
        } catch (err) {
            throw Error(`Có lỗi trong quá trình đăng ký :  ${err}`)
        }
    }

    // Đăng nhập
    async singIn (req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email: email});
            if (!user) 
                return res.status(404).json('Không tìm thấy người dùng');
            
            // Tìm thấy tài khoản, so sánh mật khẩu
            const isSamePassword = bcrypt.compareSync(password, user.password);
            if (isSamePassword) {
                // Nếu chưa có accessToken
                if (!user.accessToken || user.accessToken == null) {
                    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1m'});
                    user.accessToken = accessToken;
                    await User.updateOne({_id: user._id}, user);
                    return res.json(user);
                }
                else {

                }
            }
            else {
                return res.status(400).json('Mật khẩu không chính xác! Vui lòng nhập lại');
            }
        } catch ( err ) {
            return res.status(400).json({ message:`Có lỗi trong quá trình đăng nhập : ${err}`});
        }
       
    }

    async logout (req, res) {
        try {
            const {email} = req.body;
            const user = await User.findOne({email: email});
            if ( !user ) {
                return res.status(404).json('Không tìm thấy người dùng');
            }
            user.accessToken = "";
            await User.updateOne({_id: user._id}, user);
            return res.json(user);
        } catch ( err ) {
            return res.status(400).json({ message:`Có lỗi trong quá trình đăng xuất : ${err}`});
        }
    }

    update(req, res) {
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
    }

    delete(req, res) {
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
    }

    async destroy (req, res) {
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

module.exports  = new UserController;