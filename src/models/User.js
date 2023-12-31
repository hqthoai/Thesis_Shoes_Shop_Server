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
        isAdmin: { type: Boolean, default: false},
        isActive: { type: Boolean, default: true},
        accessToken: { type: String, default:""},
        refreshTokens: [{ type: String, default:"" }],
        cart: {type: Object},
        orders: [{ type: Schema.Types.ObjectId, ref: 'Order'}]
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', User);