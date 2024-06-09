const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema(
  {
    statusName: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    statusDesc: {
      type: String,
    },
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

module.exports = mongoose.model("Status", statusSchema);
