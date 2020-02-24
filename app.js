const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const devicesRouter = require("./routes/devices");
const cors = require("cors");
const app = express();
// const ttn=require('./controllers/ttnController');
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/devices", devicesRouter);
// const ttn=require('./TTN/ttn');

module.exports = app;
