var ttn = require("ttn");

const appID = "fe63b4366";
const accessKey = "ttn-account-v2.0V3LSaszXVXKaxjwqItLzS6lyhDqBNL-kePSmurZkYY";

const main = async function () {
    const application = await ttn.application(appID, accessKey);

    // // set the payload functions
    // await application.setCustomPayloadFunctions({
    //     decoder: `
    //   function Decoder(payload) {
    //     return { led: 1 };
    //   }
    // `,
    // });
    //
    // // get the application info
    // const app = await application.get();
    // console.log(app);
    //
    // // additional information (name, EUIs) is stored on the Account Server,
    // // so we need to retrieve this information separately.
    // // there is a shorthand for an application to get the EUIs:
    // const euis = await application.getEUIs();

    // register a new device

    //Nombre y Device updates {}
    // await application.registerDevice("sinotaaxoz", {
    //     description: "Description",
    //     appEui:"70b3d57ed0027076",
    //     devEui: "9988776623443330"
    // });
    await  application.updateDevice
    // list the apps devices
    const devices = await application.devices();
    console.log(devices)
};

main().catch(function (err) {
    console.error(err);
    process.exit(1)
});