const app=require('./app');
const mongoose = require('mongoose');
const mongodb=`mongodb://localhost:27017/smartparking`;
// mongoose.connect('mongodb+srv://sht:nijOcHQF7ixdZWc4@cluster0-7av5w.mongodb.net/smartparking?retryWrites=true&w=majority'
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

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://sht:nijOcHQF7ixdZWc4@cluster0-7av5w.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(err);
//   client.close();
// });

