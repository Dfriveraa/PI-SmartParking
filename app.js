const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const usersRouter = require("./routes/userRoute");
const devicesRouter = require("./routes/deviceRoute");
const statisticsRouter = require("./routes/statisticRoute");
const cors = require("cors");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/SmartParking")));


app.use("/users", usersRouter);
app.use("/devices", devicesRouter);
app.use("/statistics", statisticsRouter);


module.exports = app;
