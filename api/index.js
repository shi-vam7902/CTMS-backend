const express = require("express"); //creating server
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("../database/dbConnection");
const { errorMiddleware } = require("../middleware/errorMiddleware");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(
  cors({
    // origin: ["*"],
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error Connecting to Server", err);
  } else {
    console.log("Server Connected to Port:",PORT);
  }
});
const roleRoutes = require("../routes/roleRoutes");
const statusRoutes = require("../routes/statusRoutes");
const userRoutes = require("../routes/userRoutes");
const projectRoutes = require("../routes/projectRoutes");
const taskRoutes = require("../routes/taskRoutes");
const taskStatusRoutes = require("../routes/taskStatusRoutes");
//usage
app.use("/roles", roleRoutes);
app.use("/status", statusRoutes);
app.use("/api", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/taskStatus", taskStatusRoutes);
app.use(errorMiddleware);

dbConnection();
