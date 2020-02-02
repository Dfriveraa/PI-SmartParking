var ttn = require("ttn");

const appId="estasifinal";
const accessKey="ttn-account-v2.9jqo-k2lKDy4F_5ncAt1NpTsFdtmo65sJ7REirOJEZc";
// var app=new ttn.ApplicationClient('staging.thethingsnetwork.org',appId,accessKey);


ttn.data(appId,accessKey).
then(function (client) {
    client.on("uplink",function (devID,payload) {
        console.log("mensaje recibido de",devID);
        console.log(payload.payload_fields);
    })

}).catch(function (error) {
    console.error("Error",error);
    process.exit(1);
});

