var ttn = require("ttn");
const transactionModel=require('./../models/transactionModel');
const deviceModel=require('./../models/devicesModel');
class TheThingSocket{
     constructor(io) {
        this.appId="piparking";
        this.accessKey="ttn-account-v2.58_sDnuGDKwAXip17AnCBziZSuwormjqCAutPSexSL8";
        this.client=new ttn.DataClient(this.appId,this.accessKey,'us-west.thethings.network');
        this.io=io;
        this.io.on('connection', socket=>{
          console.log('New listener');

          deviceModel.find({}, (err, list) =>{
            socket.emit('initial',list);

          });
          socket.on('disconnect', function (){
            socket.disconnect(0);
            console.log('disconected');
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
                console.log(payload.payload_fields);
                const transaction=new transactionModel();
                transaction.location.sector="Bloque 16";
                transaction.location.identifier=15;
                transaction.date=new Date();
                transaction.state=payload.payload_fields.estado;
                transaction.height=payload.payload_fields.distancia;
                transaction.battery=payload.payload_fields.bateria;
                await transaction.save();
                console.log(devID,payload.payload_fields);
                await deviceModel.findByIdAndUpdate(devID*1,{state:payload.payload_fields.estado});

                // this.io.emit('news', {
                //   newState:payload.payload_fields.estado,
                //   device:devID*1
                // });
              deviceModel.find({}, (err, list) =>{
                this.io.emit('initial',list);
              });
            }
        })

    }

}


module.exports=TheThingSocket;
