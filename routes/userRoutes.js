const express = require("express");
const router = express.Router();
const validate = require("../middleware/zodMiddleWare");
const userController = require("../controller/UserController");
const userValidation = require("../util/UserValidation");

router.post("/signup", validate(userValidation), userController.signUp);
router.post("/login", userController.login);
module.exports = router;
