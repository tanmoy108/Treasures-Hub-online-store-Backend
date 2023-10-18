const { filterValue } = require("../common/Common");
const model = require("../model/UserModel")
const Users = model.Users;

const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const SECRET_KEY = "SECRET_KEY"

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
                else{
                    var token = jwt.sign(filterValue(docs), SECRET_KEY);
                    res.cookie('jwt', token,{ expires: new Date(Date.now() + 3600000), httpOnly: true }).status(201).json(token)
                }
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.LoginUsers = async (req, res) => {
    res.json(req.user)
}
exports.Check = async (req, res) => {
    res.json({status:"success",user:req.user})
}