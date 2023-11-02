const Order = require('../models/Order');

const OrderController = {

    getAll: (req, res) => {
        Order.find({})
            .then ((orders)=> res.send(orders))
            .catch(() => res.status(404).send('Không tìm thấy danh sách đơn hàng.'));
    },

    getById: (req, res) => {
        Order.findOne({_id: req.params.id})
        .then((order) => {
            res.send(order);
        })
        .catch(()=>{
            res.status(404).send('Không tìm thấy đơn hàng.')
        })
    },

    create: (req, res) => { 
        const order = new Order(req.body);
        try {
            order.save();
            res.send(order);
        } catch (error) {
            res.status(500).send('Xảy ra lỗi trong quá trình tạo đơn hàng.')
        }  
    },

    update: (req, res) => {
        Order.findOne({_id: req.params.id})
        .then((order) => {
            order.updateOne({_id: order._id}, req.body)
            .then(()=>{
                res.status(200).send('Cập nhật đơn hàng thành công.');
            })
            .catch((err)=>{
                res.status(500).send('Có lỗi xảy ra trong quá trình cập nhật đơn hàng.');
            })
        })
        .catch(()=>{
            res.status(404).send('Không tìm thấy đơn hàng.')
        })
    },

    delete: (req, res) => {
        Order.findOne({_id: req.params.id})
        .then((order)=> {
            Order.updateOne({_id: order._id}, req.body)
            .then(()=>{
                res.status(200).send('Xóa đơn hàng thành công.');
            })
            .catch((err)=> {
                res.status(500).send('Có lỗi khi xóa đơn hàng.');
            });
        })
        .catch(()=> {
            res.status(404).send('Không tìm thấy đơn hàng.');
        })
    },

    destroy: async (req, res) => {
        try {
            const result = await Order.deleteOne({_id: req.params.id});
            if (result.deletedCount===0) {
                res.status(404).send('Không tìm thấy đơn hàng.');
            }
            else {
                res.status(200).send('Xóa vĩnh viễn đơn hàng thành công.');
            }
        } catch (error) {
            res.status(500).send('Có lỗi khi xóa đơn hàng');
        }
    }
}

module.exports = OrderController;