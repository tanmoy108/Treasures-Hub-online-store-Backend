const express = require("express")
const mongoose = require('mongoose');
const ProductRouter = require("./routes/ProductRoutes")
const CategoryRouter = require("./routes/CategoryRoutes")
const BrandRouter = require("./routes/BrandRoutes")
const UserRouter = require("./routes/UserRoutes")
const AuthRouter = require("./routes/AuthRoutes")
const CartRouter = require("./routes/CartRoutes")
const OrderRouter = require("./routes/OrderRoutes")
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require("./model/UserModel");
const { isAuth, filterValue } = require("./common/Common");
const crypto = require("crypto")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const server = express()

//for jwt
const SECRET_KEY = "SECRET_KEY"
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;
//.........................

//middleware
//for passport auth
server.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));
server.use(passport.authenticate('session'));
//....................................



server.use(cors({ exposedHeaders: ["X-Total-Count"] }))
server.use(express.json())
server.use("/products", ProductRouter.router)
server.use("/categories", CategoryRouter.router)
server.use("/brands", BrandRouter.router)
server.use("/users",isAuth(), UserRouter.router)
server.use("/auth", AuthRouter.router)
server.use("/carts", isAuth(), CartRouter.router)
server.use("/orders", isAuth(), OrderRouter.router)

//for passport auth
passport.use('local', new LocalStrategy(
  {usernameField:'email'},
  async function (email, password, done) {
    try {
      const oneUser = await Users.findOne({ email:email })
      if (!oneUser) {
        done(null, false, { status: "invalid credentials" })
      }
      crypto.pbkdf2(password, oneUser.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
        if (!crypto.timingSafeEqual(oneUser.password, hashedPassword)) {
          done(null, false, { status: "invalid credentials" })
        }
        var token = jwt.sign(filterValue(oneUser), SECRET_KEY);
        done(null, token)
      })

    } catch (err) {
      done(err)
    }
  }
));
//......................
//for jwt
passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await Users.findOne({ id: jwt_payload.sub });
    if (user) {
      return done(null, filterValue(user));
    } else return done(null, false);

  } catch (err) {
    return done(err, false);
  }
}));
//......................

//for passport auth
passport.serializeUser(function (oneUser, cb) {
  process.nextTick(function () {
    return cb(null, filterValue(oneUser));
  });
});

passport.deserializeUser(function (oneUser, cb) {
  process.nextTick(function () {
    return cb(null, oneUser);
  });
});
//........................

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/treasurehub');
  console.log("database connected")
}
server.listen(8000, () => {
  console.log("server started");
})