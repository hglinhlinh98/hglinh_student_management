var User = require("../models/user.model");

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
      const u = new User({
        NameOrEmail,
        Password,
      });
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
  User.findOne({ NameOrEmail, Password }, function (err, data) {
    if (err) {
      res.send(CALLBACK_ERR);
      return;
    }
    if (data) {
      res.send({ success: true, message: "Đăng nhập thành công.", data });
    } else {
      res.send(CALLBACK_ERR);
    }
  });
};
