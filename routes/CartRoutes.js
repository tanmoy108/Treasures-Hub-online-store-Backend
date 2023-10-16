const express = require('express')
const CartController = require('../controller/CartController')
const router = express.Router()

router
    .post("/", CartController.PostCart )
    .get("/", CartController.GetCart)
    .patch("/:id", CartController.PatchCart )
    .delete("/:id", CartController.DeleteCart )

exports.router = router