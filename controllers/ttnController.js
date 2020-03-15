const mqtt = require("mqtt");
const client = mqtt.connect("mqtts://us-west.thethings.network", {
  username: process.env.TTN_APPID,
  port: 8883,
  password: process.env.TTN_KEY
});
const recordModel = require("../models/recordModel");
const deviceModel = require("../models/deviceModel");

const opts = {
  port: 1, // LoRaWAN FPort
  confirmed: false, // Whether the downlink should be confirmed by the device
  payload_fields: { action: "ChangeMode" } // Base64 encoded payload: [0x01, 0x02, 0x03, 0x04] or JSON
};
// parqueadero18
// parqueadermua
// circunvalarferrocarril
// circunvalarregional
// circunvalarbarranquilla
const initIo = io => {
  io.on("connection", socket => {
    socket.on("Join", room => {
      socket.join(room);
      console.log("new lisener in ", room);

      deviceModel.find({ "real_location.sector": room }, (err, list) => {
        socket.emit("initial", list);
      });
    });
    socket.on("disconnect", () => {
      socket.disconnect(0);
      console.log("disconected");
    });
  });
};

const saveRecord = async uplink => {
  console.log(uplink.payload_fields);
  const { state, battery } = uplink.payload_fields;
  //truchazo para no tracker mensajes de un dispositivo dormido
  const dev = await deviceModel.findById(uplink.dev_id);
  if (dev.state !== "Sleep") {
    let aux = uplink.dev_id.split("_");
    const location = { sector: aux[0], identifier: aux[1] * 1 };
    if (state === "Ocupado") {
      const start = new Date();
      const record = new recordModel({
        device: uplink.dev_id,
        state,
        battery,
        location,
        start
      });
      await record.save();
    } else {
      await recordModel.updateOne(
        { location: location, state: "Ocupado" },
        { end: Date.now(), state: "Libre" }
      );
    }
    await deviceModel.findByIdAndUpdate(uplink.dev_id, { state });
  } else console.log("Mensaje de dispositivo apagado");
};
const listen = io => {
  initIo(io);
  client.on("connect", () => {
    client.subscribe("+/devices/+/up", (err, topic) => {
      client.on("message", async (topic, message) => {
        let uplink = JSON.parse(message.toString());
        let aux = uplink.dev_id.split("_");
        if (uplink.port === 2) {
          await deviceModel.findOneAndUpdate(
            { _id: uplink.dev_id },
            { lastKeepAlive: new Date() }
          );
        } else {
          await saveRecord(uplink);
        }
        deviceModel.find({ "real_location.sector": aux[0] }, (err, list) => {
          io.in(aux[0]).emit("initial", list);
        });
      });
    });
  });
};

const sendDown = async (req, res) => {
  let device = req.body.device;
  let aux = device._id.split("_");
  client.publish(
    `piparking/devices/${req.body.device._id}/down`,
    JSON.stringify(opts),
    {
      retain: true,
      qos: 0
    }
  );

  if (device.state !== "Sleep") {
    await deviceModel.findOneAndUpdate({ _id: device._id }, { state: "Sleep" });
    await deviceModel.find(
      { "real_location.sector": device.real_location.sector },
      { lastKeepAlive: 1, real_location: 1, state: 1, dev_eui: 1 },
      (err, l) => {
        return res.status(200).send(l);
      }
    );
  } else {
    await deviceModel.findOneAndUpdate({ _id: device._id }, { state: "Libre" });
    await deviceModel.find(
      { "real_location.sector": device.real_location.sector },
      { lastKeepAlive: 1, real_location: 1, state: 1, dev_eui: 1 },
      (err, l) => {
        return res.status(200).send(l);
      }
    );
  }
};

module.exports = { sendDown, listen };
