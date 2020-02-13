var ttn = require("ttn");
const transactionModel=require('./../models/transactionModel');
var socketController=require('./../controllers/socketController');
const deviceModel=require('./../models/devicesModel');

class TheThingSocket{
     constructor(io,list) {
        this.appId="piparking";
        this.accessKey="ttn-account-v2.58_sDnuGDKwAXip17AnCBziZSuwormjqCAutPSexSL8";
        this.client=new ttn.DataClient(this.appId,this.accessKey,'us-west.thethings.network');
        this.io=io;
        this.initEvents();
        this.list=list;
      console.log(this.list);
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
                console.log(payload.payload_fields);
                this.io.emit('news', payload.payload_fields);
            }
        })

    }
    getList=async ()=>{
        await deviceModel.find({}, (err, list) =>{
            return list;
        });
    };
}

const getList= ()=>{
     deviceModel.find({}, (err, list) =>{
        return list;
    });
};

module.exports=TheThingSocket;