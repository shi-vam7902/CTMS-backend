const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectDesc: {
    type: String,
    required: true,
    trim: true,
  },
  projectStartDate: {
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
  projectEndDate: {
    type: String,
    default: function () {
      // Get the current date
      const currentDate = new Date();

      // Add 2 months to the current date
      currentDate.setMonth(currentDate.getMonth() + 5);

      // Extract the new date components
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const date = currentDate.getDate().toString().padStart(2, "0");
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const strHours = hours.toString().padStart(2, "0");

      // Return the formatted date string
      return `${date}-${month}-${year} ${strHours}:${minutes} ${ampm}`;
    },
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  status: {
    type: Schema.Types.ObjectId,
    ref: "Status",
  },
  projectDueDate: {
    type: String,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 3; // Add 3 months
      let date = currentDate.getDate();
      let hours = currentDate.getHours();
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
module.exports = mongoose.model("projects", projectSchema);
