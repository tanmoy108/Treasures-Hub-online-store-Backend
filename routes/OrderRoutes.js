const express = require('express')
const OrderController = require('../controller/OrderController')
const router = express.Router()

router
    .post("/", OrderController.PostOrder)
    .get("/", OrderController.GetOrder)
    .get("/user", OrderController.fetchOrderById)
    .patch("/:id", OrderController.PatchOrder)

exports.router = router