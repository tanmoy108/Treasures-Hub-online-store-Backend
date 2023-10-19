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
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmVkZTZlNDVlMmNiNzY5MTI4ZTkyNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3NzE1NjE2fQ.Ha4UeW2AEbue5otTxpek3Hm_3M2PWz2fKIq2HbFzXv8"
   
    return token;
};




// exports.isAuth = (req, res, done) => {
//         if (req.user) {
//             done()
//         } else res.sendStatus(401)
//     }