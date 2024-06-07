const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const {upload}=require('../middleware/multer.middleware');
const {verifyJwt} =require('../middleware/auth.middleware');

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/signout", userController.signout);
router.post("/google", userController.google);
router.get("/users", verifyJwt,userController.getUsers);
router.delete("/user/:userId", verifyJwt,userController.deleteUser);
router.get("/user/:userId", userController.getUser);
router.patch("/user/:userId", upload.single('profilePicture'), userController.updateUser);

module.exports = router;
