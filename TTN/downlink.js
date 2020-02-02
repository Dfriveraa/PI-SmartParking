const ttn = require('ttn');

const appID = "fe63b4366";
const accessKey = "ttn-account-v2.0V3LSaszXVXKaxjwqItLzS6lyhDqBNL-kePSmurZkYY";

ttn.data(appID, accessKey)
    .then(function (client) {
        client.send("123", Buffer.alloc(1, 0x01, 'binary'));
    })
    .catch(function (error) {
        console.error("Error", error);
        process.exit(1);
    });

// ttn.data(appID, accessKey)
//     .then(function (client) {
//         client.send("123", {"Estado":"testEnd"});
//         console.log("bandera");
//     })
//     .catch(function (error) {
//         console.error("Error", error);
//         process.exit(1);
//     });
