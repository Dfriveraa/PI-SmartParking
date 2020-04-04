var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
const salts = 10;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Usuario instuticional UdeA"],
      trim: true
    },
    name: {
      type: String,
      required: [true, "Nombre del usuario"],
      trim: true
    },
    password: {
      type: String,
      required: [true, "Contraseña del usuario"],
      trim: true
    }
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);

userSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(salts, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("Users", userSchema);
