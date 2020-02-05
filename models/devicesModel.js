var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const device = new Schema(
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
    }
  },{
    versionKey: false // You should be aware of the outcome after set to false
  });
module.exports = mongoose.model('Device',device);
