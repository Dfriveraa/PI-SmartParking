var ttn = require("ttn");
const transactionModel=require('./../models/transactionModel');
var socketController=require('./../controllers/socketController');
const deviceModel=require('./../models/devicesModel');
// const addProperty=list=>{
//   let newList=[];
//   list.map(i=>{
//     let a={
//       state:'Libre',
//       canvas_location:{
//         x:i.canvas_location.x,
//         y:i.canvas_location.y,
//       },
//       real_location: { sector: i.real_location.sector, identifier: i.real_location.identifier },
//       _id:i._id,
//       app_eui: i.app_eui,
//       date: i.date
//     };
//     newList.push(a);
//   });
//   return newList
// };
class TheThingSocket{
     constructor(io) {
        this.appId="piparking";
        this.accessKey="ttn-account-v2.58_sDnuGDKwAXip17AnCBziZSuwormjqCAutPSexSL8";
        this.client=new ttn.DataClient(this.appId,this.accessKey,'us-west.thethings.network');
        this.io=io;
        // this.list=addProperty(list);
        this.io.on('connection', socket=>{
          console.log('New listener');

          deviceModel.find({}, (err, list) =>{
            socket.emit('initial',list);
          });
         });
       this.initEvents();
       }
    initEvents(){
        this.client.on("uplink", async (devID,payload)=> {
            if(payload.port===2){
                console.log("Keep alive");
            }
            else {
                const transaction=new transactionModel();
                transaction.location.sector="Bloque 16";
                transaction.location.identifier=15;
                transaction.date=new Date();
                transaction.state=payload.payload_fields.estado;
                transaction.height=payload.payload_fields.distancia;
                transaction.battery=payload.payload_fields.bateria;
                await transaction.save();
                await deviceModel.findByIdAndUpdate(devID*1,{state:payload.payload_fields.estado});

                console.log(devID,payload.payload_fields);
                this.io.emit('news', {
                  newState:payload.payload_fields.estado,
                  device:devID*1
                });
            }
        })

    }

}


module.exports=TheThingSocket;
