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
          console.log(payload.metadata.time);
            if(payload.port===2){
                await deviceModel.findOneAndUpdate({_id:devID},{lastKeepAlive:new Date()});
            }
            else {
              console.log(payload.payload_fields);
                const {state,height,battery}=payload.payload_fields;
                if(state==='Ocupado'){
                  const location={sector:'Bloque 16',identifier:15};
                  const start=new Date();
                  const transaction=new transactionModel({state,height,battery,location,start});
                  await transaction.save();
                }
                await deviceModel.findByIdAndUpdate(devID*1,{state});
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
