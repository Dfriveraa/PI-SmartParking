const app=require('./app');
const database=require('./database');
const deviceModel=require('./models/devicesModel');

const io = require('socket.io')(app.listen(process.env.PORT || 3000,()=>{
  console.log("Listen o port ",3000);
}));
database.connect();
var TheThingsSocket=require('./TTN/ttn');

new TheThingsSocket(io);



