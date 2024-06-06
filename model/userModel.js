const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: [
      {
        type: String,
        required: true,
      },
    ],
    // projectId: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "project",
    //   },
    // ],
    // taskId: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "task",
    //   },
    // ],
    statusId: [
      {
        type: Schema.Types.ObjectId,
        ref: "status",
      },
    ],
    createdAt: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
