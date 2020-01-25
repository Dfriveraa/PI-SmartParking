var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ttn = require("ttn");

const appId="estasifinal";
const accessKey="ttn-account-v2.9jqo-k2lKDy4F_5ncAt1NpTsFdtmo65sJ7REirOJEZc";
// var app=new ttn.ApplicationClient('staging.thethingsnetwork.org',appId,accessKey);


ttn.data(appId,accessKey).
then(function (client) {
    client.on("uplink",function (devID,payload) {
        console.log("mensaje recibido de",devID);
        console.log(payload)
    })

}).catch(function (error) {
    console.error("Error",error);
    process.exit(1);
});




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;



