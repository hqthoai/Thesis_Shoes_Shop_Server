const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        firstName: { type: String, required:true },
        lastName: { type: String, required:true },
        email: { type: String, required:true, unique:true },
        password: { type: String, required:true },
        address: { type: String },
        phone: { type: String, maxLength:10 },
        isAdmin:{type: Boolean, default: false, required:true},
        isActive: {type: Boolean, default: true, required:true},
        accessToken: {type: String, required:true},
        refreshToken: {type: String,  required:true},
        orders: {type: Schema.Types.ObjectId, ref: 'Order'}
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', User);