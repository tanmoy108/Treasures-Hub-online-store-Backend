const model = require("../model/UserModel")
const Users = model.Users;

exports.fetchUserInfo = async (req, res) => {
    console.log("fetchUser",req.user)
    // console.log(req.headers.Set-Cookie)
    const { id } = req.user;
    try {
        const docs = await Users.findById(id)
        res.status(201).json({email:docs.email,name:docs.name,role:docs.role,address:docs.address})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.PatchUsers =async(req,res)=>{
    const {id} =req.user
    try {
        const docs = await Users.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(docs)
    } catch (error) {
        res.status(400).json(error)
    }
}