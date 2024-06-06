const statusModel = require("../model/statusModel");
// console.log("Debug - 1.2 -> Status Controller Called");
exports.addStatus = async (req, res) => {
  const status = new statusModel(req.body);

  await statusModel
    .findOne({
      statusName: req.body.statusName,
    })
    .then((data) => {
      if (!data) {
        status.save().then((data) => {
          res.json({
            message: "Status Saved!",
            data: data,
            status: 200,
          });
          console.log("Status Data", data);
        });
      } else {
        res.json({
          message: "Status Already Exists!",
          status: 500,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Saving Status!",
        error: err,
        status: 500,
      });
    });
};
//  
// console.log("DEBUG 1.2 - Status Added Successfully");
exports.getAllStatuses = async (req, res) => {
  await statusModel
    .find()
    .then((data) => {
      res.json({
        message: "All Statuses",
        data: data,
        status: 200,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Statuses",
        error: err,
        status: 500,
      });
    });
};
//  
// console.log("DEBUG 1.3 - Status retrieved Successfully");
exports.getStatusById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await statusModel
    .findById({ _id: id })
    .then((data) => {
      if (!data) {
        return res.json({
          message: "Status Not Found",
          status: 404,
        });
      } else {
        return res.json({
          message: "Status Found",
          data: data,
          status: 200,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in getting Status",
        error: err,
        status: 500,
      });
    });
};
// 
// console.log("DEBUG 1.4 - Status retrieved Successfully");
exports.deleteStatusById = async (req, res) => {
  const id = req.params.id;

  await statusModel
    .findByIdAndDelete({ _id: id })
    .then((data) => {
      if (!data) {
        return res.json({
          message: "Status Not Found",
          status: 404,
          data: data,
        });
      }
      res.status(200).json({
        message: "Status Deleted",
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error Deleting Status",
        error: err,
      });
    });
};

// console.log("DEBUG 1.5 - Status Deleted Successfully");
exports.updateStatusById = async (req, res) => {
  const id = req.params.id;

  await statusModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.json({
          message: "Status Not Found",
          status: 404,
          data: data,
        });
      } else {
        res.json({
          message: "Status Updated",
          data: data,
          status: 200,
        });
        console.log("Status Updated", data);
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in updating Status",
        error: err,
        status: 500,
      });
      console.log("Error in Updating the Status", err);
    });
};
// console.log("DEBUG 1.6 - Status Updated Successfully");