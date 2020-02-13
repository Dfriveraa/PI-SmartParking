const app=require('./app');
const database=require('./database');
const deviceModel=require('./models/devicesModel');

const io = require('socket.io')(app.listen(process.env.PORT || 3001,()=>{
  console.log("Listen o port ",3000);
}));
database.connect();
var TheThingsSocket=require('./TTN/ttn');

deviceModel.find({}, (err, l) =>{

  let list=[];
    l.map(x=>{
      Object.defineProperty(x, 'Estado', 'Libre');
      list.push(x);
      console.log(x)
  });
    console.log(list);
    new TheThingsSocket(io,l);
});


