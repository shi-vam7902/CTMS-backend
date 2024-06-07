const taskModel = require("../model/tasksModel");
const userModel = require("../model/userModel");
const { sendNewTaskNotification } = require("../util/emailService");
const getUsersByTaskStatusId = (taskStatusId) => {
  return userModel.find({ taskStatusId: taskStatusId }, "email").exec();
};
// console.log("Debug Console -- 4.1 Debug controller called")
exports.addTask = async (req, res) => {
  const task = new taskModel(req.body);
  await taskModel
    .findOne({ taskName: req.body.taskName })
    .then((data) => {
      if (!data) {
        task
          .save()
          .then(async (data) => {
            res.json({
              message: "Task Added Successfully",
              data: data,
              status: 200,
            });
            console.log("Task Data", data);
            const users = await getUsersByTaskStatusId(data.taskStatusId);
            console.log("fetched User", users);
            users.forEach((user) => {
              sendNewTaskNotification(user.email, data);
            });
            console.log("Email Sent");
          })

          .catch((err) => {
            res.json({
              message: "Error Adding Task",
              error: err,
              status: 500,
            });
            console.log("Error", err);
          });
      } else {
        res.json({
          message: "Task Already Exists",
          status: 500,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Adding Task",
        error: err,
        status: 500,
      });
      console.log("Error", err);
    });
};
// console.log("Debug Console -- 4.2 Task Added Successfully")
exports.getAllTask = async (req, res) => {
  await taskModel
    .find()
    .then((data) => {
      res.json({
        message: "All Tasks",
        data: data,
        status: 200,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Tasks",
        error: err,
        status: 500,
      });
    });
};
// console.log("Debug Console -- 4.3 Get Task Called")
exports.updateTaskById = async (req, res) => {
  const id = req.params.id;
  const task = req.body;
  await taskModel
    .findByIdAndUpdate({ _id: id }, task, { new: true })
    .then((data) => {
      res.json({
        message: "Task Updated!",
        data: data,
        status: 200,
      });
      console.log("Task Updated Successfully ", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in updating Task",
        error: err,
        status: 500,
      });
      console.log("error Updating the task");
    });
};
// console.log("Debug Console -- 4.4 Update Task Called")
exports.deleteTaskById = async (req, res) => {
  const id = req.params.id;
  await taskModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json({
        message: "Task Deleted!",
        data: data,
        status: 200,
      });
      console.log("Task Deleted Successfully ", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in deleting Task",
        error: err,
        status: 500,
      });
      console.log("Error Deleting the task");
    });
};
// console.log("Debug Console -- 4.5 Delete Task Called")
exports.getTaskById = async (req, res) => {
  const id = req.params.id;
  await taskModel
    .findById({ _id: id })
    .then((data) => {
      res.json({
        message: "Task",
        data: data,
        status: 200,
      });
      console.log("Task Retrieved Successfully ", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Task",
        error: err,
        status: 500,
      });
      console.log("Error in getting the task");
    });
};
// console.log("Debug Console -- 4.6 Get Task By Id Called")
