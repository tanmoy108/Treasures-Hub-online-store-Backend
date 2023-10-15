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

exports.CheckUsers = async (req, res) => {
    try {
        const oneUser = await Users.findOne({ email: req.body.email })

        if (!oneUser) {
            res.status(401).json({ status: "user not found" })
        } else {
            if (oneUser.password === req.body.password) {
                res.status(201).json(oneUser)
            } else res.status(401).json({status:"wrong information"})
        }
    } catch (err) {
        res.status(400).json({status:"wrong information"})
    }
}