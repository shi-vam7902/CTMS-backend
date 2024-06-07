const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskModel = new Schema({
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  taskDesc: {
    type: String,
    required: true,
    trim: true,
  },
  taskStartDate: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const date = currentDate.getDate().toString().padStart(2, "0");
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const strHours = hours.toString().padStart(2, "0");
      return `${date}-${month}-${year} ${strHours}:${minutes} ${ampm}`;
    },
  },
  assignedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  reportTo: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  taskStatus: {
    type: Schema.Types.ObjectId,
    ref: "taskstatus",
  },
  taskDueDate: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() ; // Add 3 months
      let date = currentDate.getDate();
      let hours = currentDate.getHours()+24;
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const strHours = hours.toString().padStart(2, "0");

      // Adjust if the end date falls into the next year or month
      if (month > 11) {
        year++;
        month -= 12;
      }
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      if (date > daysInMonth) {
        date = daysInMonth;
      }

      // Formatting the due date
      month = (month + 1).toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");

      return `${date}-${month}-${year} ${strHours}:${minutes} ${ampm}`;
    },
  },
});

module.exports = mongoose.model("task", taskModel);
