var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    _id: {
      type: String,
      required: [true, "Un dispositivo debe tener un id"]
    },
    recorder_id: {
      type: String,
      required: [true, "Un dispositivo debe ser registrado por un usuaio"],
      trim: true,
      default: "Admin"
    },
    canvas_location: {
      x: {
        type: Number,
        required: [true, "Coordenada x"],
        trim: true
      },
      y: {
        type: Number,
        required: [true, "Coordenada y"],
        trim: true
      }
    },
    real_location: {
      sector: {
        type: String,
        required: [
          true,
          "Debe indicar a que parqueadero pertenece el dispositivo"
        ],
        trim: true
      },
      identifier: {
        type: Number,
        required: [true, "Debe indicar con "],
        trim: true
      }
    },
    app_eui: {
      type: String,
      required: [true, "Un dispostivo debe tener un appEui"],
      trim: true,
      default: "4564684684684"
    },
    dev_eui: {
      type: String,
      required: [true, "Un dispostivo debe tener un devEui"],
      trim: true
    },
    date: {
      type: Date,
      required: [true, "Fecha en la que se registró del dispositivo"],
      default: new Date()
    },
    state: {
      type: String,
      required: [true, "Por defecto inicia libre"],
      default: "Libre"
    },
    lastKeepAlive: {
      type: Date,
      required: [false, "Por defecto inicia libre"],
      default: new Date()
    },
    battery:{
    type: Number,
      required: [false, "Batería por defecto en 3.7"],
    default:3.7,
  }
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("Device", deviceSchema);
