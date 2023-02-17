const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";
const {
  isValidName,
  isValidBody,
  isValidEmail,
  isValidPwd,
} = require("../validators/validations.js");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let data = req.body;
    console.log(data);

    if (!isValidName(name))
      return res.send({ status: false, name: "please enter valid name " });

    if (!isValidEmail(email))
      return res.send({ status: false, email: "please enter valid email" });

    const ceeck = await UserModel.findOne({ email: email });

    if (ceeck) {
      console.log("reagistered");
      return res.send({ message: "this user is already registered " });
    }
    const datasave = await UserModel.create(data);
    res.send({ data: datasave, message: "user created successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = req.body;
    if (!email || !password || email == "" || password == "")
      return res.send({
        status: false,
        message: "email and passowrd should be present",
      });

    if (!isValidEmail(email))
      return res.send({ status: false, email: "please enter valid email" });

    const check = await UserModel.findOne({ email: email,password: password });
    if (!check) {
      res.send({ status: false, message: "this user is not registered or check email password" });
    } else {
      jwt.sign({ check }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            status: false,
            message: "something went wrong please try after some time",
          });
        }
        res.send({
          status: true,
          message: "succesfully login",
          data: check,
          auth: token,
        });
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  register,
  login,
};
