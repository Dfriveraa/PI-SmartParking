var ttn = require("ttn");
const appID = "piparking";
const accessKey = "ttn-account-v2.58_sDnuGDKwAXip17AnCBziZSuwormjqCAutPSexSL8";

var deviceUpdates= {
    description: "---",
    devEui: "0000000000000004"
};

async function register(deviceID,deviceUpdates) {
    const application=await ttn.application(appID,accessKey);
    await application.registerDevice(deviceID,deviceUpdates);
    console.log(await application.devices());
}

register("daniel",deviceUpdates).catch(function (error) {
    console.error(error);
    process.exit(1);
});