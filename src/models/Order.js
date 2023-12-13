const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [{ type: Object}],
        totalAmount:{ type: String },
        paymentMethod: { type: String },
        shippingFee: { type: String },
        status:{type: String, default: 'processing' },
        // canceledAt: {type: Date},
        // completedAt: {type: Date},
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', Order);