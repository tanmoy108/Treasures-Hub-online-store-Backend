const model = require("../model/OrderModel")
const Orders = model.Orders;

exports.PostOrder = async (req, res) => {
    const Order = new Orders(req.body)
    try {
        const doc = await Order.save()
        res.status(201).json(doc)
        console.log("order added");
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.PatchOrder = async (req, res) => {
    const {id} = req.params
    try {
        const doc = await Orders.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(doc)
        console.log("updated");
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
    console.log(req.query)

    try {
        const doc = await query.exec()
        res.set("X-Total-Count", totalDoc)
        res.status(201).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.fetchOrderById = async (req, res) => {
    const {userId} = req.query
    try {
        const doc = await Orders.find({userId:userId})
        res.status(201).json(doc)
        console.log("get order by id");
    } catch (error) {
        res.status(400).json(error)
    }
}