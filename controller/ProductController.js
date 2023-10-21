// const model = require("../model/productModel")
// const Products = model.Products;

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [0, "wrong min price"], max: [10000, "wrong max price"], required: true },
    discountPercentage: { type: Number, min: [0, "wrong min discount"], max: [100, "wrong max discount"] },
    rating: { type: Number, min: [0, "wrong min rating"], max: [5, "wrong max rating"], default: 0 },
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



exports.postProduct = async (req, res) => {
    const Product = new Products(req.body)
    try {
        const doc = await Product.save()
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.patchProduct = async (req, res) => {
    const {id} = req.params
    try {
        const doc = await Products.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.fetchAllProduct = async (req, res) => {
    let obj = {}
    if(!req.query.admin)
    {
        obj.deleted={$ne:true}
    }
    let query = Products.find(obj) // all document
    let totalquery = Products.find(obj) // all document

    if (req.query.category) {
        query = query.find({ category: req.query.category })
        totalquery = totalquery.find({ category: req.query.category })
    }
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand })
        totalquery = totalquery.find({ category: req.query.brand })
    }

    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
    }

    const totalDoc = await totalquery.count().exec();


    if (req.query._page && req.query._limit) {
        const page = req.query._page
        const limit = req.query._limit
        query = query.skip(limit * (page - 1)).limit(limit)
    }


    try {
        const doc = await query.exec()
        res.set("X-Total-Count", totalDoc)
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.fetchProductById = async (req, res) => {
    const {id} = req.params
    try {
        const doc = await Products.findById(id)
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}