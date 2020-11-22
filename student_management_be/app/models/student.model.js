var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  Fullname: String,
  DateOfBirth: String,
  Class: String,
  Address: String,
});

var Student = mongoose.model("Student", studentSchema);
module.exports = Student;
