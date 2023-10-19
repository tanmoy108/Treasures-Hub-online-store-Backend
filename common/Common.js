const passport = require("passport")

exports.isAuth = (req, res, done) => {
    return passport.authenticate("jwt")
}

exports.filterValue = (user) => {
    return ({ id: user.id, role: user.role })
}

exports.cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

exports.hasTokenInCookie = function (req) {
    return !!req.cookies && req.cookies.jwt; // Check if the 'jwt' cookie exists
};



// exports.isAuth = (req, res, done) => {
//         if (req.user) {
//             done()
//         } else res.sendStatus(401)
//     }