const mongoose = require("mongoose");
var Student = require("../models/student.model");
const CALLBACK_ERR = { success: false, message: "Error!", data: undefined };

exports.createStudent = (req, res) => {
  const { Fullname, DateOfBirth, Class, Address } = req.body;
  if (
    /^[a-zA-Z]/.test(Fullname) &&
    Fullname.length >= 5 &&
    /^[0-9/]*\d$/.test(DateOfBirth) &&
    DateOfBirth.length >= 6 &&
    Class.length == 2
  ) {
    const student = new Student({
      Fullname,
      DateOfBirth,
      Class,
      Address,
    });
    student.save().then(() => {
      res.send({ success: true, message: "Tạo thành công!" });
    });
  } else {
    res.send({
      success: false,
      message: "Tạo thông tin học sinh chưa hợp lệ!",
    });
  }
};

exports.getStudents = (req, res) => {
  Student.find((err, data) => {
    if (err) {
      res.send(CALLBACK_ERR);
      return;
    }
    res.send({ success: true, message: "Thành công", data });
  });
};

exports.delete = (req, res) => {
  const student_id = req.params.id;
  Student.findOneAndRemove(
    { _id: mongoose.Types.ObjectId(student_id) },
    function (err) {
      if (!err) {
        return res.send({ success: true, message: "Thành công" });
      } else {
        return res.send(CALLBACK_ERR);
      }
    }
  );
};

exports.update = (req, res) => {
  const student_id = req.params.id;
  const { Fullname, DateOfBirth, Class, Address } = req.body;
  Student.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(student_id) },
    { Fullname, DateOfBirth, Class, Address },
    function (err) {
      if (!err) {
        if (
          /^[a-zA-Z]/.test(Fullname) &&
          Fullname.length >= 5 &&
          DateOfBirth.length >= 6 &&
          Class.length == 2
        ) {
          return res.send({ success: true, message: "Thành công" });
        } else {
          return res.send({
            success: false,
            message: "Thong tin khong hop le! ",
            data: undefined,
          });
        }
      } else {
        return res.send(CALLBACK_ERR);
      }
    }
  );
};
