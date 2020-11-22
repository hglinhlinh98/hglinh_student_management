const express = require("express");
const student_router = express.Router();
const student_controller = require("../controllers/student.controller.js");

student_router.post(
  "/students/addnewStudent",
  student_controller.createStudent
);

student_router.get("/api/students", student_controller.getStudents);

student_router.delete("/students/:id", student_controller.delete);

student_router.put("/students/update/:id", student_controller.update);

module.exports = student_router;
