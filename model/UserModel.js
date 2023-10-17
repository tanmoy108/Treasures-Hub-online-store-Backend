const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: Buffer, required: true },
    role: { type: String,required:true, default: "user" },
    name: { type: String,default:"Anonymous" },
    address: { type: [Schema.Types.Mixed] },
    orders: { type: [Schema.Types.Mixed] },
    salt: { type: Buffer}
})

const virtual = userSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Users = model('Users', userSchema)