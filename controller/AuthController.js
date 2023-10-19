const { filterValue } = require("../common/Common");
const model = require("../model/UserModel")
const Users = model.Users;

const crypto = require("crypto")
const jwt = require('jsonwebtoken');

exports.PostUsers = async (req, res) => {
    try {
        //for passport auth
        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            const User = new Users({ ...req.body, password: hashedPassword, salt });
            const docs = await User.save();
            req.login(filterValue(docs), (err) => { // eta add korle signup korlei matro access korte parbe 
                if (err) {
                    res.status(400).json(error)
                }
                else {
                    var token = jwt.sign(filterValue(docs), process.env.SECRET_KEY);
                    res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).json({ id: docs.id, role: docs.role })

                    // res.status(201).json(token) //token asbe ekta
                }
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.LoginUsers = async (req, res) => {
    const user = req.user;
    try {
        console.log("loginUseer 33", req.user)
        res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).json({ id: user.id, role: user.role })
        // res.json(req.user) // id , role from serializerUser
    } catch (err) {
        console.log("login error:", err)
    }
}
exports.CheckAuth = async (req, res) => {
    try {
        res.json(req.user)
    } catch (err) {
        console.log("check error", err)
    }
}