const express = require("express");
const projectController = require("../controller/projectController");
const router = express.Router();
const validate = require("../middleware/zodMiddleWare");
const projectValidation = require("../util/projectValidation");
router.post(
  "/project",
  validate(projectValidation),
  projectController.addProject
);
router.get("/project", projectController.getAllProjects);
router.put(
  "/project/:id",
  validate(projectValidation),
  projectController.updateProjectById
);
router.get("/project/:id", projectController.getProjectById);
router.get("/user/project", projectController.getUserProject);
router.delete("/project/:id", projectController.deleteProjectById);

module.exports = router;
