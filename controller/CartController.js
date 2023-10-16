const model = require("../model/CartModel")
const Carts = model.Carts;

exports.PostCart = async (req, res) => {
    const Cart = new Carts(req.body)
    try {
        const doc = await Cart.save()
        const result = await doc.populate("product")
        res.status(201).json(result)
        console.log("cart added");
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.GetCart = async (req, res) => {
  const {userId} = req.query
    try {
        const docs = await Carts.find({user:userId}).populate("product")
        res.status(200).json(docs)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.DeleteCart = async (req, res) => {
    const {id} = req.params
    try {
        const doc = await Carts.findByIdAndDelete(id)
        res.status(200).json(doc)
        console.log("cart deleted");
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.PatchCart = async (req, res) => {
    const {id} = req.params
    try {
        const doc = await Carts.findByIdAndUpdate(id,req.body,{new:true})
        const result = await doc.populate("product")
        res.status(200).json(result)
        console.log("updated");
    } catch (error) {
        res.status(400).json(error)
    }
}