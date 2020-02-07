var ttn = require("ttn");
const transactionModel=require('./../models/transactionModel');
const appId="piparking";
const accessKey="ttn-account-v2.58_sDnuGDKwAXip17AnCBziZSuwormjqCAutPSexSL8";
// var app=new ttn.ApplicationClient('staging.thethingsnetwork.org',appId,accessKey);


ttn.data(appId,accessKey).
then(function (client) {
    client.on("uplink",function (devID,payload) {
        if(payload.port==2){
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
        }


    })

}).catch(function (error) {
    console.error("Error",error);
    process.exit(1);
});

module.exports=ttn;