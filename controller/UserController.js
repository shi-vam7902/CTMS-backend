const userSchema = require("../model/userModel");
// console.log("Debug - 2.2 -> User Controller Called");
exports.signUp = async (req, res) => {
  const user = new userSchema(req.body);
  console.log("req.body", req.body);
  await userSchema
    .findOne({
      email: req.body.email,
      firstName: req.body.firstName,
    })
    .then((data) => {
      if (data == undefined || data == null) {
        user
          .save()
          .then((data) => {
            res.json({
              message: "User Registered Successfully!",
              data: data,
              status: 200,
            });
            console.log("user's data", data);
          })
          .catch((err) => {
            res.json({
              message: "Error Registering User!",
              error: err,
              status: 500,
            });
            console.log("Error ", err);
          });
      } else {
        res.json({
          message: "User Already Exists!",
          status: 500,
        });
      }
    });
};
// console.log("Debug - 2.2 -> User Controller Called");
exports.login = async (req, res) => {
  await userSchema
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data == undefined || data == null) {
        res.json({
          message: "User Not Found!",
          status: 404,
        });
      } else {
        if (data.password == req.body.password) {
          res.json({
            message: "User Logged In!",
            data: data,
            status: 200,
          });
        } else {
          res.json({
            message: "Invalid Password!",
            status: 500,
          });
        }
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Logging In!",
        error: err,
        status: 500,
      });
    });
};
// console.log("Debug - 2.2 -> User Controller Called");
exports.getAllUsers = async (req, res) => {};
// console.log("Debug - 2.2 -> User Controller Called");
exports.getUserById = async (req, res) => {};
// console.log("Debug - 2.2 -> User Controller Called");
exports.updateUser = async (req, res) => {};
// console.log("Debug - 2.2 -> User Controller Called");
exports.deleteUser = async (req, res) => {};
// console.log("Debug - 2.2 -> User Controller Called");
exports.changePassword = async (req, res) => {};
// console.log("Debug - 2.2 -> User Controller Called");
exports.forgotPassword = async (req, res) => {};
// console.log("Debug - 2.2 -> User Controller Called");
exports.resetPassword = async (req, res) => {};
// console.log("Debug - 2.2 -> User Controller Called");
