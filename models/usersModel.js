var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const user = new Schema(
  {
    institutional_user:{
      type: String,
      required: [true, 'Usuario instuticional UdeA'],
      trim: true
    },
    name:{
      type: String,
      required: [true, 'Nombre del usuario'],
      trim: true
    },
    password:{
      type: String,
      required: [true, 'Contraseña del usuario'],
      trim: true
    }
  },{
    versionKey: false // You should be aware of the outcome after set to false
  });
module.exports = mongoose.model('Users',user);
