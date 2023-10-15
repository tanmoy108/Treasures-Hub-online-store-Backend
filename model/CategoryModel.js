const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    value: { type: String, required: true, unique: true },
    label: { type: String, required: true },
})

const virtual  = categorySchema.virtual('id');
virtual.get(function(){
    return this._id;
})
categorySchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Categories = model('Categories', categorySchema)