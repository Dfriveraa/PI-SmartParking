var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var devicesRouter = require('./routes/devices');
var socketController=require('./controllers/socketController');
var cors = require('cors');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(app.listen(3000,()=>{
  console.log("Listen o port ",3000);
}));

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const socketMiddleware =(req,res,next) => {
  console.log("Using middleware");
  req.io = io;
  req.server = server;
  next();

};
io.on('connection', socketController.emit);
app.use('/', socketMiddleware ,indexRouter);
app.use('/users', socketMiddleware  , usersRouter);
app.use('/devices', devicesRouter);

module.exports = app;



