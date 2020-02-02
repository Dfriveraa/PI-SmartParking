var ttn = require("ttn");
const appID = "fe63b4366";
const accessKey = "ttn-account-v2.0V3LSaszXVXKaxjwqItLzS6lyhDqBNL-kePSmurZkYY";

var deviceUpdates= {
    description: "---",
    appEui:"70b3d57ed0027075",
    devEui: "99887766234433453",
    devAddr: "11223344"
};

async function register(deviceID,deviceUpdates) {
    const application=await ttn.application(appID,accessKey);
    await application.registerDevice(deviceID,deviceUpdates);
    console.log(await application.devices());
}

register("pablo",deviceUpdates).catch(function (error) {
    console.error(error);
    process.exit(1);
});