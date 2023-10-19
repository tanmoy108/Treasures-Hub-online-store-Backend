const model = require("../model/OrderModel")
const Orders = model.Orders;

exports.PostOrder = async (req, res) => {
    const { id } = req.user;
    const Order = new Orders({...req.body,userId:id})
    try {
        const doc = await Order.save()
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.PatchOrder = async (req, res) => {
    const {id} = req.params
    try {
        const doc = await Orders.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.GetOrder = async (req, res) => {
    let query = Orders.find({})
    let totalquery = Orders.find({}) 
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

exports.fetchOrderById = async (req, res) => {
    const { id } = req.user;
    try {
        const doc = await Orders.find({userId:id})
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}