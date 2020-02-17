const mongoose = require('mongoose');
//const mongodb=`mongodb://localhost:27017/smartparking`;
const mongodb='mongodb+srv://sht:nijOcHQF7ixdZWc4@cluster0-7av5w.mongodb.net/smartparking?retryWrites=true&w=majority';
exports.connect=()=>{
  mongoose.connect(mongodb
    , {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!')).catch((error)=> {
    console.log(error);
  });
};
