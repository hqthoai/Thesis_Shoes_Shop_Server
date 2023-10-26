const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema(
    {
        name: { type: String, required:true },
        parentId: { type: Schema.Types.ObjectId , ref: 'Category', },
    }, 
    {
        timestamps: true
    }

);

module.exports = mongoose.model('Category', Category);