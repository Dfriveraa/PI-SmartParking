require("dotenv").config();
const app = require("./app");
const database = require("./database/database");
const ttn = require("./controllers/ttnController");
const port=process.env.PORT || 3000;

const io = require("socket.io")(
  app.listen(port, () => {
    console.log("Listen o port ", port);
  })
);
database.connect();
ttn.listen(io);
require("./routines/routine");
