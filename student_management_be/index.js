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
app.use(userRoute);
app.use(studentRoute);

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Add other headers here
  res.setHeader("Access-Control-Allow-Methods", "POST"); // Add other methods here
  res.send();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
