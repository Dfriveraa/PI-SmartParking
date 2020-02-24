const mqtt = require("mqtt");
const client = mqtt.connect("mqtts://us-west.thethings.network", {
  username: process.env.TTN_APPID,
  port: 8883,
  password: process.env.TTN_KEY
});
const transactionModel = require("./../models/transactionModel");
const deviceModel = require("./../models/devicesModel");

const opts = {
  port: 1, // LoRaWAN FPort
  confirmed: false, // Whether the downlink should be confirmed by the device
  payload_fields: { action: "ChangeMode" } // Base64 encoded payload: [0x01, 0x02, 0x03, 0x04] or JSON
};
const initIo = io => {
  io.on("connection", socket => {
    console.log("New listener");
    deviceModel.find({}, (err, list) => {
      socket.emit("initial", list);
    });
    socket.on("disconnect", () => {
      socket.disconnect(0);
      console.log("disconected");
    });
  });
};
const saveTransaction = async uplink => {
  console.log(uplink.payload_fields);
  const { state, height, battery } = uplink.payload_fields;
  if (state === "Ocupado") {
    let aux = uplink.dev_id.split("_");
    const location = { sector: aux[0], identifier: aux[1] };
    const start = new Date();
    const transaction = new transactionModel({
      state,
      height,
      battery,
      location,
      start
    });
    await transaction.save();
  }
  await deviceModel.findByIdAndUpdate(uplink.dev_id, { state });
};
const listen = io => {
  initIo(io);
  client.on("connect", () => {
    client.subscribe("+/devices/+/up", (err, topic) => {
      client.on("message", async (topic, message) => {
        let uplink = JSON.parse(message.toString());
        if (uplink.port === 2) {
          await deviceModel.findOneAndUpdate(
            { _id: uplink.dev_id },
            { lastKeepAlive: new Date() }
          );
        } else {
          await saveTransaction(uplink);
        }
        deviceModel.find({}, (err, list) => {
          io.emit("initial", list);
        });
      });
    });
  });
};

const sendDown = (req, res) => {
  req.body.map(i => {
    client.publish(`piparking/devices/${i}/down`, JSON.stringify(opts), {
      retain: true,
      qos: 0
    });
  });
  return res.status(200).json({
    message: "Devices down"
  });
};

module.exports = { sendDown, listen };
