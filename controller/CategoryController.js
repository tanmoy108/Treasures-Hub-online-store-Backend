const model = require("../model/CategoryModel")
const Categories = model.Categories;

exports.postCategory = async (req, res) => {
    const Category = new Categories(req.body)
    try {
        const doc = await Category.save()
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.fetchAllCategories= async (req, res) => {
    try {
        const doc = await Categories.find({}).exec()
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}