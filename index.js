const express = require("express")
const mongoose = require('mongoose');
require('dotenv').config()
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
const model = require("./model/UserModel")
const Users = model.Users;
const { isAuth, filterValue, cookieExtractor } = require("./common/Common");
const crypto = require("crypto")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const path = require('path');
const server = express()


//for jwt

var opts = {}
opts.jwtFromRequest = cookieExtractor;
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
//.........................

//webhook
const endpointSecret = process.env.END_POINT;

server.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
//.........


//middleware
//for passport auth
server.use(express.static(path.resolve(__dirname,"build")))
server.use(cookieParser())
server.use(session({
  secret: process.env.SESSION_KEY,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));

server.use(passport.authenticate('session'));
//....................................


server.use(cors({ exposedHeaders: ["X-Total-Count"] }))
server.use(express.json())
server.use("/products",isAuth(),ProductRouter.router)
server.use("/categories",isAuth(), CategoryRouter.router)
server.use("/brands",isAuth(), BrandRouter.router)
server.use("/users",isAuth(), UserRouter.router)
server.use("/auth", AuthRouter.router)
server.use("/carts",isAuth(), CartRouter.router)
server.use("/orders",isAuth(), OrderRouter.router)

// this line we add to make react router work in case of other routes doesnt match
server.get('*', (req, res) =>
  res.sendFile(path.resolve('build', 'index.html'))
);


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
        // done(null, {token})
        done(null, { id: oneUser.id, role: oneUser.role,token })
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
    console.log("index.js 109",jwt_payload)
    const user = await Users.findById(jwt_payload.id);
    if (user) {
      // return done(null,user);
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
    console.log("serializerUser 123",filterValue(oneUser))
    return cb(null, { id: oneUser.id, role: oneUser.role });
  });
});

passport.deserializeUser(function (oneUser, cb) {
  process.nextTick(function () {
    console.log("deserializerUser 130",oneUser)
    return cb(null, oneUser);
  });
});
//........................

//payment intent
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_KEY);


server.post("/create-payment-intent", async (req, res) => {
  const { price,order_id } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price*100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata:{
      order_id
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//..............................


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB);
  console.log("database connected")
}
server.listen(process.env.PORT, () => {
  console.log("server started");
})