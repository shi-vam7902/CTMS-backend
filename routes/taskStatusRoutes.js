const express = require("express");
const router = express.Router();
const validate = require("../middleware/zodMiddleWare");
const taskStatusController = require("../controller/taskStatusController");
const taskStatusValidation = require("../util/taskStatusValidation");

router.post(
  "/taskStatus",
  validate(taskStatusValidation),
  taskStatusController.addTaskStatus
);
router.get("/taskStatus", taskStatusController.getTaskStatus);
router.put(
  "/taskStatus/:id",
  validate(taskStatusValidation),
  taskStatusController.updateTaskStatus
);
router.delete("/taskStatus/:id", taskStatusController.deleteTaskStatus);
router.get("/taskStatus/:id", taskStatusController.getTaskStatusById);

module.exports = router;
