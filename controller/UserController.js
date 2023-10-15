const model = require("../model/UserModel")
const Users = model.Users;

exports.fetchUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const docs = await Users.findById(id,"id name email address").exec()
        res.status(201).json(docs)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.PatchUsers =async(req,res)=>{
    const {id} =req.params
    try {
        const docs = await Users.findByIdAndUpdate(id,req.body)
        res.status(201).json(docs)
    } catch (error) {
        res.status(400).json(error)
    }
}