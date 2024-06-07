const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const taskValidation = require("../util/taskValidation");
const validate = require("../middleware/zodMiddleWare");
router.post("/task", validate(taskValidation), taskController.addTask);
router.get("/task", taskController.getAllTask);
router.put(
  "/task/:id",
  validate(taskValidation),
  taskController.updateTaskById
);
router.get("/task/:id", taskController.getTaskById);
router.delete("/task/:id", taskController.deleteTaskById);
router.put("/tasks/:taskId/updateStatus", taskController.updateTaskStatus);
module.exports = router;
