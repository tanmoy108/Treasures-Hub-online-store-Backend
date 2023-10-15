const model = require("../model/ProductModel")
const Products = model.Products;

exports.postProduct = async (req, res) => {
    const Product = new Products(req.body)
    try {
        const doc = await Product.save()
        res.status(201).json(doc)
        console.log("added");
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.patchProduct = async (req, res) => {
    const {id} = req.params
    try {
        const doc = await Products.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(doc)
        console.log("updated");
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.fetchAllProduct = async (req, res) => {
    let query = Products.find({}) // all document
    let totalquery = Products.find({}) // all document

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
    console.log(req.query)


    try {
        const doc = await query.exec()
        res.set("X-Total-Count", totalDoc)
        res.status(201).json(doc)
        console.log("filtered");
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.fetchProductById = async (req, res) => {
    const {id} = req.params
    try {
        const doc = await Products.findById(id)
        res.status(201).json(doc)
        console.log("success with id");
    } catch (error) {
        res.status(400).json(error)
    }
}