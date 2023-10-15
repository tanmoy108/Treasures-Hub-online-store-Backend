const model = require("../model/UserModel")
const Users = model.Users;


exports.PostUsers = async (req, res) => {
    const User = new Users(req.body);
    try {
        const docs = await User.save();
        res.status(201).json(docs)
    } catch (error) {
        res.status(400).json(error)
    }
}