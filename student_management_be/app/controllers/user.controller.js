var User = require("../models/user.model");
var config = require("../config/auth.config");
var md5 = require('md5');
var jwt = require('jsonwebtoken');

const CALLBACK_ERR = { success: false, message: "Error!", data: undefined };

exports.create = async (req, res) => {
  const { NameOrEmail, Password } = req.body;

  const count = await User.count({ NameOrEmail });
  if (count > 0) {
    res.send(CALLBACK_ERR);
  } else {
    if (
      /^[a-zA-Z0-9]/.test(NameOrEmail) &&
      NameOrEmail.length >= 4 &&
      Password.length >= 6
    ) {
      const hashPassword = md5(Password);
      const u = new User({
        NameOrEmail,
        Password: hashPassword,
      });
      console.log(`user:`, u);
      u.save().then(() => {
        res.send({ success: true, message: "Tạo user thành công!" });
      });
    } else {
      res.send({ success: false, message: "Tạo tài khoản chưa hợp lệ!" });
    }
  }
};

exports.getUSers = (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.send(CALLBACK_ERR);
      return;
    }
    res.send({ success: true, message: "Thành công", data });
  });
};

exports.loginUser = (req, res) => {
  const { NameOrEmail, Password } = req.body;
  // console.log('name: ',NameOrEmail, 'Pass: ',Password);
  const hashPassword = md5(Password);
  User.findOne({ NameOrEmail, Password: hashPassword }, function (err, data) {
    if (err) {
      res.send(CALLBACK_ERR);    
      return;
    }
    if (data) {
      const token = jwt.sign({ name: NameOrEmail }, config.secret, {
        expiresIn: 86400 // 24hours
      })
      res.send({ success: true, message: "Đăng nhập thành công.", data,token });
    } else {
      res.send(CALLBACK_ERR);
    }
  });
};
