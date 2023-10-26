const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true },
        images: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        brand: { type: Schema.Types.ObjectId, ref:'Brand', required: true },
        categoryId : { type: Schema.Types.ObjectId, ref:'Category', default:null },
        forGender: {type: Number},
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        countInStock: { type: Number, default: 20, required: true },
        isActive: {type: Boolean, default: true, required: true},
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', Product);