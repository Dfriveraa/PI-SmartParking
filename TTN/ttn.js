var ttn = require("ttn");
const transactionModel=require('./../models/transactionModel');
var socketController=require('./../controllers/socketController');

// var app=new ttn.ApplicationClient('staging.thethingsnetwork.org',appId,accessKey);

class TheThingSocket{
    constructor(io) {
        this.appId="piparking";
        this.accessKey="ttn-account-v2.58_sDnuGDKwAXip17AnCBziZSuwormjqCAutPSexSL8";
        this.io=io.on('connection', socketController.emit);
        ttn.data(this.appId,this.accessKey).
        then(client=> {
            client.on("uplink", (devID,payload)=> {
                if(payload.port===2){
                    console.log("Keep alive");
                }
                else {
                    var transaction=new transactionModel();
                    console.log("mensaje recibido de",devID);
                    console.log(payload.payload_fields);
                    transaction.location.sector="Bloque 16";
                    transaction.location.identifier=15;
                    transaction.date=new Date();
                    transaction.state=payload.payload_fields.estado;
                    transaction.height=payload.payload_fields.distancia;
                    transaction.battery=payload.payload_fields.bateria;
                    transaction.save();
                    io.emit('news', payload.payload_fields);
                }
            })

        }).catch(function (error) {
            console.error("Error",error);
            process.exit(1);
        });

    }
}


module.exports=TheThingSocket;