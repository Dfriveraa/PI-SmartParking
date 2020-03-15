require("dotenv").config();
const app = require("./app");
const database = require("./database/database");
const ttn = require("./controllers/ttnController");
const io = require("socket.io")(
  app.listen(process.env.PORT || 3000, () => {
    console.log("Listen o port ", 3000);
  })
);
database.connect();
ttn.listen(io);
//require("./routines/routine");
