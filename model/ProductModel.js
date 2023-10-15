const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [0, "wrong min price"], max: [10000, "wrong max price"], required: true },
    discountPercentage: { type: Number, min: [0, "wrong min discount"], max: [50, "wrong max discount"] },
    raing: { type: Number, min: [0, "wrong min rating"], max: [5, "wrong max rating"], default: 0 },
    stock: { type: Number, min: [20, "wrong min stock"], default: 20 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    deleted: { type: Boolean, default: false }
})

const virtual  = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Products = model('Products', productSchema)