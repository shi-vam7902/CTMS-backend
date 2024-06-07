const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskStatusSchema = new Schema({
  taskStatusName: {
    type: String,
    required: true,
    trim: true,
  },
  taskStatusDesc: {
    type: String,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model("taskStatus", taskStatusSchema);
