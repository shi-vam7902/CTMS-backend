const taskStatusModel = require("../model/taskStatusModel");
// console.log("Debug controller 5.1")
exports.addTaskStatus = async (req, res) => {
  const taskStatus = new taskStatusModel(req.body);
  await taskStatusModel
    .findOne({ taskStatusName: req.body.taskStatusName })
    .then((data) => {
      if (!data) {
        taskStatus
          .save()
          .then((data) => {
            res.json({
              message: "Task Status Added Successfully",
              data: data,
              status: 200,
            });
            console.log("Task Status Data", data);
          })
          .catch((err) => {
            res.json({
              message: "Error Adding Task Status",
              error: err,
              status: 500,
            });
            console.log("Error", err);
          });
      } else {
        res.json({
          message: "Task Status Already Exists",
          status: 500,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Adding Task Status",
        error: err,
        status: 500,
      });
      console.log("Error", err);
    });
};
// console.log("Debug addTaskStatusDone");
exports.getTaskStatus = async (req, res) => {
  await taskStatusModel
    .find()
    .then((data) => {
      res.json({
        message: "All Task Status",
        data: data,
        status: 200,
      });
      console.log(" ALL task Status Data", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Task Status",
        error: err,
        status: 500,
      });
    });
};
// console.log("Debug getTaskStatusDone");
exports.updateTaskStatus = async (req, res) => {};
// console.log("Debug updateTaskStatusDone");
exports.deleteTaskStatus = async (req, res) => {};
// console.log("Debug deleteTaskStatusDone");
exports.getTaskStatusById = async (req, res) => {};
// console.log("Debug getTaskStatusByIdDone");
