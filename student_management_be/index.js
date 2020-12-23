const express = require("express");
const app = express();
const port = 8080;
require("dotenv").config();
const userRoute = require("./app/routes/user.routes");
const studentRoute = require("./app/routes/student.routes");

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`connected db`);
  }
);
// parse requests of content-type application/json
app.use(bodyParser.json());
// parser requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(userRoute);
app.use(studentRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
