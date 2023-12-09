const Order = require('../models/Order');

const OrderController = {

    getAll: (req, res) => {
        Order.find({})
            .then ((orders)=> res.json(orders))
            .catch(() => res.status(404).json('Không tìm thấy danh sách đơn hàng.'));
    },

    getById: (req, res) => {
        Order.findOne({_id: req.params.id})
        .then((order) => {
            res.status(200).json(order);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy đơn hàng.')
        })
    },

    getOrderByUserId: (req, res) => {
        Order.find({owner: req.params.id})
        .then((orders) => {
            console.log(orders);
            res.status(200).json(orders);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy người dùng.')
        })
    },

    create: (req, res) => { 
        const order = new Order(req.body);
        try {
            order.save();
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json('Xảy ra lỗi trong quá trình tạo đơn hàng.')
        }  
    },

    update: (req, res) => {
        Order.findOne({_id: req.params.id})
        .then((order) => {
            order.updateOne({_id: order._id}, req.body)
            .then(()=>{
                res.status(200).json('Cập nhật đơn hàng thành công.');
            })
            .catch((err)=>{
                res.status(500).json('Có lỗi xảy ra trong quá trình cập nhật đơn hàng.');
            })
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy đơn hàng.')
        })
    },

    delete: (req, res) => {
        Order.findOne({_id: req.params.id})
        .then((order)=> {
            Order.updateOne({_id: order._id}, req.body)
            .then(()=>{
                res.status(204).json('Xóa đơn hàng thành công.');
            })
            .catch((err)=> {
                res.status(500).json('Có lỗi khi xóa đơn hàng.');
            });
        })
        .catch(()=> {
            res.status(404).json('Không tìm thấy đơn hàng.');
        })
    },

    destroy: async (req, res) => {
        try {
            const result = await Order.deleteOne({_id: req.params.id});
            if (result.deletedCount===0) {
                res.status(404).json('Không tìm thấy đơn hàng.');
            }
            else {
                res.status(204).json('Xóa vĩnh viễn đơn hàng thành công.');
            }
        } catch (error) {
            res.status(500).json('Có lỗi khi xóa đơn hàng');
        }
    }
}

module.exports = OrderController;