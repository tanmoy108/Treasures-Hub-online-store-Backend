const model = require("../model/BrandModel")
const Brands = model.Brands;

exports.postBrand = async (req, res) => {
    const Brand = new Brands(req.body)
    try {
        const doc = await Brand.save()
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.fetchAllBrands= async (req, res) => {
    try {
        const doc = await Brands.find({}).exec()
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}