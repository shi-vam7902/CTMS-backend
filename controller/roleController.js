const roleModel = require("../model/roleModel");
// console.log("Debug - 1.1 -> Role Controller Called");

exports.addRole = async (req, res) => {
  const role = new roleModel(req.body);

  await roleModel
    .findOne({ roleName: req.body.roleName, roleDesc: req.body.roleDesc })
    .then((data) => {
      if (data == undefined || data == null) {
        role.save().then((data) => {
          res.json({
            message: "Role Saved!",
            data: data,
            status: 200,
          });
          console.log("role Data", data);
        });
      } else {
        res.json({
          message: "Role Already Exists!",
          status: 500,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Saving Role!",
        error: err,
        status: 500,
      });
    });
};

// add roles done
// console.log("DEBUG 1.2 - role Added Successfully");

exports.getAllRoles = async (req, res) => {
  await roleModel
    .find()
    .then((data) => {
      res.json({
        message: "All Roles",
        data: data,
        status: 200,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Roles",
        error: err,
        status: 500,
      });
    });
};

// console.log("DEBUG 1.3 - role retrieved Successfully");
exports.getRoleById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await roleModel
    .findById({ _id: id })
    .then((data) => {
      if (!data) {
        return res.json({
          message: "Role Not Found",
          status: 404,
        });
      } else {
        return res.json({
          message: "Role Found",
          data: data,
          status: 200,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Role",
        error: err,
        status: 500,
      });
    });
};
// console.log("DEBUG 1.4 - roleByid retrieved Successfully");
exports.deleteRoleById = async (req, res) => {
  const id = req.params.id;

  await roleModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      if (!data) {
        return res.json({
          message: "Role Not Found",
          status: 404,
          data: data,
        });
      }
      res.status(200).json({
        message: "Role Deleted",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err); // Log the error for debugging purposes
      res.status(500).json({
        message: "Error Deleting Role",
        error: err,
      });
    });
};
// console.log("DEBUG 1.5 - role deleted Successfully");
exports.updateRoleById = async (req, res) => {
  const id = req.params.id;

  await roleModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.json({
          message: "Role Not Found",
          status: 404,
          data: data,
        });
      } else {
        res.json({
          message: "Role Updated",
          data: data,
          status: 200,
        });
        console.log("Role Updated", data);
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in updating Role",
        error: err,
        status: 500,
      });
      console.log("error in Updating the Role", err);
    });
};
// console.log("DEBUG 1.6 - role Updated Successfully");
