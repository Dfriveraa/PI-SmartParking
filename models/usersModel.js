var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const user = new Schema(
  {
    _id:{
      type:Number,
      required:[true,'Un dispositivo debe tener un id'],
      trim: true
    },
    recorder_id:{
      type:String,
      required: [true,'Un dispositivo debe ser registrado por un usuaio'] ,
      trim: true
    },
    canvas_location:{
      x:{
        type:Number,
        required: [true,'Coordenada x'] ,
        trim: true
      },
      y:{
        type:Number,
        required: [true,'Coordenada y'] ,
        trim: true
      }
    },
    real_location:{
      sector:{
        type:String,
        required: [true,'Debe indicar a que parqueadero pertenece el dispositivo'] ,
        trim: true
      },
      identifier:{
        type:Number,
        required: [true,'Debe indicar con '] ,
        trim: true
      }
    },
    app_eui:{
      type:String,
      required: [true,'Un dispostivo debe tener un appEui'],
      trim:true
    },
    date:{
      type:Date,
      required:[true,'Fecha en la que se registró del dispositivo']
    }
  },{
    versionKey: false // You should be aware of the outcome after set to false
  });
module.exports = mongoose.model('Device',device);
