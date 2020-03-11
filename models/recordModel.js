var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const record = new Schema(
  {
    device:{
        type:String,
        ref:"Device",
        required: [true, "Id del dispositivo al que pertenece"]
    },
    location: {
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
    start: {
      type: Date,
      required: [true, "Fecha en la que se registró del dispositivo"]
    },
    end: {
      type: Date
    },
    state: {
      type: String,
      required: [true, "Se debe de indicar el cambio de estado"]
    },
    battery: {
      type: String,
      required: [true, "Debe proporcionar la batería actual del dispositivo"]
    }
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);
module.exports = mongoose.model("Record", record);
