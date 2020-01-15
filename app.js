const express = require("express");

const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const authRoute = require("./router/auth");

const cors = require("cors");

const morgan = require("morgan");

const forgetPassword = require('./router/forgetpassword')

const bodypraser = require("body-parser")

dotenv.config();


mongoose.connect(
  process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  error => {
    if (error) {
      console.error(
        "Please make sure your MongoDB configuration is correct and that service is running"
      );
      throw error;
    }
  }
);

var corsMiddleware = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "192.168.0.146"); //replace localhost with actual host
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );
  next();
}


app.use(bodypraser.json())
app.use(corsMiddleware);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/user/forget", forgetPassword);



app.listen(8000);