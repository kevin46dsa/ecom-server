const configRoutes = require("./routes")

// Require Dot Env for env variables
require("dotenv").config()
let port = 8000;

// Initializing Express server

const express = require("express")
const app = express()

// Require Cors to let the Client communicate with the server
const cors = require("cors")
app.use(
    cors({
      origin: "http://localhost:3000",
    })
  )

  app.use(express.json())




configRoutes(app);
app.listen(process.env.PORT, () => {
	console.log(`The server is running on http://localhost:${process.env.PORT}`);
});