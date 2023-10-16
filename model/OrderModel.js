const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    products: { type: [Schema.Types.Mixed], required: true},
    price: { type: Number},
    quantity: { type: Number,required:true },
    method: { type: String, required: true },
    status: { type: String, required: true,default:"pending" },
    address:{type:Schema.Types.Mixed,required:true},
    userId:{type: Schema.Types.ObjectId, ref: 'Users',required:true}
})

const virtual  = orderSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
orderSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Orders = model('Orders', orderSchema)



// {
//     "products": [
//       {
//         "title": "iPhone 9",
//         "description": "An apple mobile which is nothing like apple",
//         "price": 549,
//         "discountPercentage": 12.96,
//         "rating": 4.69,
//         "stock": 94,
//         "brand": "Apple",
//         "category": "smartphones",
//         "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//         "images": [
//           "https://i.dummyjson.com/data/products/1/1.jpg",
//           "https://i.dummyjson.com/data/products/1/2.jpg",
//           "https://i.dummyjson.com/data/products/1/3.jpg",
//           "https://i.dummyjson.com/data/products/1/4.jpg",
//           "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//         ],
//         "quantity": 2,
//         "userId": 1,
//         "userEmail": "a",
//         "id": 1
//       },
//       {
//         "title": "Sneaker shoes",
//         "description": "Synthetic Leather Casual Sneaker shoes for Women/girls Sneakers For Women",
//         "price": 120,
//         "discountPercentage": 10.37,
//         "rating": 4.19,
//         "stock": 50,
//         "brand": "Synthetic Leather",
//         "category": "womens-shoes",
//         "thumbnail": "https://i.dummyjson.com/data/products/47/thumbnail.jpeg",
//         "images": [
//           "https://i.dummyjson.com/data/products/47/1.jpg",
//           "https://i.dummyjson.com/data/products/47/2.jpg",
//           "https://i.dummyjson.com/data/products/47/3.jpg",
//           "https://i.dummyjson.com/data/products/47/thumbnail.jpeg"
//         ],
//         "quantity": 1,
//         "userId": 1,
//         "userEmail": "a",
//         "id": 2
//       }
//     ],
//     "address": {
//       "fullName": "tanoy",
//       "phone": "334343434",
//       "email": "a",
//       "streetAddress": "fdsffsfsd",
//       "city": "fsfsfsd",
//       "region": "dfsdfsdf",
//       "postalCode": "fsdfdsfsfd"
//     },
//     "userId": 1,
//     "price": 1218,
//     "quantity": 3,
//     "method": "cash",
//     "status": "pending",
//     "id": 1
//   },