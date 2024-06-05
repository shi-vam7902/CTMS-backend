const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
// ("mongodb+srv://root:root@ctmsbackend.euczt3j.mongodb.net/backend");

const dbConnection = () => {
  mongoose
    .connect(MONGO_URI)
    .then((success) => {
      console.log("Database Connection Established");
    })
    .catch((err) => {
      console.log("Error Connecting Database", err);
    });
};

module.exports = dbConnection;
