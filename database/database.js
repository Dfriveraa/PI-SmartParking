const mongoose = require("mongoose");
exports.connect = () => {
  mongoose
    .connect(/*process.env.DB_HOST*/ "mongodb://localhost:27017/smartparking", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log("DB connection successful!"))
    .catch(error => {
      console.log(error);
    });
};
