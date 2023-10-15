const express = require('express')
const ProductController = require('../controller/ProductController')
const router = express.Router()

router
    .post("/", ProductController.postProduct)
    .get("/", ProductController.fetchAllProduct)
    .get("/:id", ProductController.fetchProductById)
    .patch("/:id", ProductController.patchProduct)

exports.router = router