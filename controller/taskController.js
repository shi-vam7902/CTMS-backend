const taskModel = require("../model/tasksModel");
const projectModel = require("../model/projectModel");
const mongoose = require("mongoose");
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

exports.updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { taskStatus } = req.body;

    const updateStatus = await taskModel.findByIdAndUpdate(
      taskId,
      { taskStatus },
      { new: true }
    );

    if (!updateStatus) {
      return res.status(500).json({ message: "Task updation failed" });
    }
    res
      .status(200)
      .json({ data: updateStatus, message: "Task status updated" });
  } catch (error) {
    res.status(500).json({ message: "Task status update failed" });
  }
};

exports.getTaskByProjectId = async (req, res) => {
  try {
    const pid = req.params.projectId;

    const aggregation = await taskModel.aggregate([
      {
        $match: { project: new mongoose.Types.ObjectId(pid) },
      },

      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedToInfo",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "reportTo",
          foreignField: "_id",
          as: "reportToInfo",
        },
      },
      {
        $project: {
          taskName: 1,
          taskDesc: 1,
          assignedTo: { $arrayElemAt: ["$assignedToInfo.username", 0] },
          reportTo: { $arrayElemAt: ["$reportToInfo.username", 0] },
          taskStatus: 1,
          taskStartDate: 1,
          taskDueDate: 1,
        },
      },
    ]);

    res.status(200).json({
      data: aggregation,
      message: "Successfully retrieved tasks by project Id",
    });
  } catch (error) {
    console.error("Error fetching tasks by project ID:", error);
    res.status(500).json({ error: "Error fetching tasks by project ID" });
  }
};
