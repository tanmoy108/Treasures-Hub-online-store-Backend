const model = require("../model/CartModel")
const Carts = model.Carts;

exports.PostCart = async (req, res) => {
    console.log("post cart",req.user)
    const { id } = req.user;
    const Cart = new Carts({...req.body,user:id})
    try {
        const doc = await Cart.save()
        const result = await doc.populate("product")
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.GetCart = async (req, res) => {
    const { id } = req.user;
    try {
        const docs = await Carts.find({user:id}).populate("product")
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
    } catch (error) {
        res.status(400).json(error)
    }
}