const express = require("express");
const router = express.Router();
const validate = require("../middleware/zodMiddleWare");
const roleController = require("../controller/roleController");
const rolevalidation = require("../util/roleValidation");
// validate(rolevalidation);
router.post("/role", validate(rolevalidation), roleController.addRole);
router.get("/role", roleController.getAllRoles);
router.delete("/role/:id", roleController.deleteRoleById);
router.get("/role/:id", roleController.getRoleById);
router.put(
  "/role/:id",
  validate(rolevalidation),
  roleController.updateRoleById
);

// router.get("/role/:id", roleController.getRoleById);

module.exports = router;
