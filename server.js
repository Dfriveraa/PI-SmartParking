require('dotenv').config();
const app=require('./app');
const database=require('./database');
const TheThingsSocket=require('./TTN/ttn');
const io = require('socket.io')(app.listen(process.env.PORT || 3000,()=>{
  console.log("Listen o port ",3000);
}));
database.connect();

new TheThingsSocket(io);



