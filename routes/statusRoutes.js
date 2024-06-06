const express = require("express");
const router = express.Router();
const validate = require("../middleware/zodMiddleWare");
const statusController = require("../controller/statusController");
const statusValidation = require("../util/statusValidation");

router.post("/status", validate(statusValidation), statusController.addStatus);
router.get("/status", statusController.getAllStatuses);
router.delete("/status/:id", statusController.deleteStatusById);
router.get("/status/:id", statusController.getStatusById);
router.put(
  "/status/:id",
  validate(statusValidation),
  statusController.updateStatusById
);

module.exports = router;
