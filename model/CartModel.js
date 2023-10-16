const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    quantity: { type: Number, required: true }
})


// {
//     "product": {
//       "id": 1,
//       "title": "iPhone 9",
//       "description": "An apple mobile which is nothing like apple",
//       "price": 549,
//       "discountPercentage": 12.96,
//       "rating": 4.69,
//       "stock": 94,
//       "brand": "Apple",
//       "category": "smartphones",
//       "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//       "images": [
//         "https://i.dummyjson.com/data/products/1/1.jpg",
//         "https://i.dummyjson.com/data/products/1/2.jpg",
//         "https://i.dummyjson.com/data/products/1/3.jpg",
//         "https://i.dummyjson.com/data/products/1/4.jpg",
//         "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//       ]
//     },
//     "quantity": 1,
//     "userId": 1,
//     "userEmail": "tanmoy@gmail.com",
//     "id": 3
//   }

const virtual = cartSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Carts = model('Carts', cartSchema)