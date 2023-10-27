const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: { type: Schema.Types.ObjectId, ref:'Product' },
        totalAmount:{ type:Number },
        paymentMethod: { type: String },
        shippingFee: { type: Number },
        status:{type: String, default: 'processing' },
        canceledAt: {type: Date},
        completedAt: {type: Date},
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', Order);