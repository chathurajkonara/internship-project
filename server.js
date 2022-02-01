const express = require('express')
const next = require('next')
var bodyParser = require('body-parser')

const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const productRoute = require('./routes/products')
const jwtRoute = require('./routes/jwt')
const cookieParser = require("cookie-parser")

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to mongo DB.."))
  .catch((err) => console.log(err));

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(cookieParser())

  server.use("/auth", authRoute);
  server.use("/products", productRoute);
  server.use("/jwt", jwtRoute);

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
