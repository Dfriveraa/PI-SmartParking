const app=require('./app');
const database=require('./database');
const io = require('socket.io')(app.listen(process.env.PORT || 3000,()=>{
  console.log("Listen o port ",3000);
}));

var TheThingsSocket=require('./TTN/ttn');
new TheThingsSocket(io);
database.connect();


