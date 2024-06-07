const projectModel = require("../model/projectModel");
const userModel = require("../model/userModel");
const { sendNewProjectEmail } = require("../util/emailService");
// console.log("Debug - 3.1 -> project Controller Called");

const getUsersByIds = (userIds) => {
  return userModel.find({ _id: { $in: userIds } }, "email").exec();
};
exports.addProject = async (req, res) => {
  const project = new projectModel(req.body);
  await projectModel
    .findOne({ projectName: req.body.projectName })
    .then((data) => {
      if (data == undefined || data == null) {
        project.save().then((data) => {
          res.json({
            message: "Project Saved!",
            data: data,
            status: 200,
          });
          console.log("Finding email ID's");
          const emails = data.user.email;
          // const users = userModel
          //   .find()
          //   .then((data) => {
          //     console.log("Users Found", data);
          //   })
          //   .catch((err) => {
          //     console.log("Error in getting Users", err);
          //   });
          console.log("Project Data", data);
          // Fetch user emails based on user IDs in the project
          const userIds = data.user; // Assuming 'user' field contains user IDs
          getUsersByIds(userIds)
            .then((users) => {
              const emails = users.map((user) => user.email);
              // Send email notification to all users
              sendNewProjectEmail(emails, data);
            })
            .catch((error) => {
              console.error("Error fetching users:", error);
            });
          console.log("emial sent");
        });
      } else {
        res.json({
          message: "Project Already Exists!",
          status: 500,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in saving Project",
        error: err,
        status: 500,
      });
      console.log("Error in saving Project", err);
    });
};
// console.log("Debug - 3.2 Projects Added Successfully")
exports.getAllProjects = async (req, res) => {
  await projectModel
    .find()
    .then((data) => {
      res.json({
        message: "All Projects",
        data: data,
        status: 200,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Projects",
        error: err,
        status: 500,
      });
      console.log("Error in getting all Projects", err);
    });
};
// console.log("Debug - 3.3 -> Get Project Called");
exports.updateProjectById = async (req, res) => {
  const id = req.params.id;
  const project = req.body;
  console.log(project);
  await projectModel
    .findByIdAndUpdate({ _id: id }, project, { new: true })
    .then((data) => {
      res.json({
        message: "Project Updated!",
        data: data,
        status: 200,
      });
      console.log("project Upadtes", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in updating Project",
        error: err,
        status: 500,
      });
      console.log("Error in updating Project", err);
    });
};
// console.log("Debug - 3.4 -> Update Project Called");
exports.deleteProjectById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await projectModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      res.json({
        message: "Project Deleted!",
        data: data,
        status: 200,
      });
      console.log("Project Deleted", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in deleting Project",
        error: err,
        status: 500,
      });
      console.log("Error in deleting Project", err);
    });
};
// console.log("Debug - 3.5 -> Delete Project Called");

exports.getProjectById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await projectModel
    .findById({ _id: id })
    .then((data) => {
      res.json({
        message: "Project Found",
        data: data,
        status: 200,
      });
      console.log("Project Found", data);
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Project",
        error: err,
        status: 500,
      });
      console.log("Error in getting Project", err);
    });
};
