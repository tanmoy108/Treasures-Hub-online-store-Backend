const passport = require("passport")

exports.isAuth = (req, res, done) => {
    return passport.authenticate("jwt")
}

exports.filterValue = (user) => {
    return ({ id: user.id, role: user.role })
}
    




// exports.isAuth = (req, res, done) => {
    //     if (req.user) {
    //         done()
    //     } else res.sendStatus(401)
    // }