const express = require("express")
const mongoose = require('mongoose');
const ProductRouter = require("./routes/ProductRoutes")
const CategoryRouter = require("./routes/CategoryRoutes")
const BrandRouter = require("./routes/BrandRoutes")
const UserRouter = require("./routes/UserRoutes")
const AuthRouter = require("./routes/AuthRoutes")
var cors = require('cors')
const server = express()

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/treasurehub');
  console.log("database connected")
}
server.use(cors({ exposedHeaders: ["X-Total-Count"] }))
server.use(express.json())

server.use("/products", ProductRouter.router)
server.use("/categories", CategoryRouter.router)
server.use("/brands", BrandRouter.router)
server.use("/users", UserRouter.router)
server.use("/auth", AuthRouter.router)


server.listen(8000, () => {
  console.log("server started");
})