var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ttn = require("ttn");
const appId="fe63b4366";
const accessKey="ttn-account-v2.Gl0LStkM7b_yyFfP7yFBwrEvDSANlpv_AmlHT3pG9ho";
// var app=new ttn.ApplicationClient('staging.thethingsnetwork.org',appId,accessKey);
// app.regis


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



