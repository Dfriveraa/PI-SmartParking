const deviceModel = require("../models/deviceModel");
const axios = require("axios");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Key ${process.env.TTN_KEY}`
};

const getAllDevices = async (req, res) => {
  deviceModel.find({}, (err, l) => {
    return res.status(200).send(l);
  });
};

const getDevicesBySector = async (req, res) => {
  let dateAux=new Date();
  const list=await deviceModel.find(
    { "real_location.sector": req.params.sector },
    { lastKeepAlive: 1, real_location: 1, state: 1, battery: 1 }).lean(false);

  let finalList=[];
  list.map(device=> {
    let auxDev = device.toObject();
    auxDev.lastSeen=Math.floor((dateAux.valueOf()-auxDev.lastKeepAlive.valueOf())/1000/60);
    finalList.push(auxDev);
  });
  res.status(200).send(finalList);
};

const createDevice = async (req, res) => {

  const { canvas_location, real_location, dev_eui } = req.body;
  const _id = `${real_location.sector}_${real_location.identifier}`.toLowerCase();
  let date = new Date();
  let device = new deviceModel({
    _id,
    canvas_location,
    real_location,
    dev_eui,
    date
  });
  console.log(device);
  await device
    .save()
    .then(e => {
      console.log(e);
      const data = {
        dev_id: _id,
        lorawan_device: {
          activation_constraints: "otaa",
          app_eui: "70B3D57ED002740B",
          app_id: "piparking",
          app_key: "01020304050607080102030405060708",
          dev_eui: dev_eui,
          dev_id: _id,
          disable_f_cnt_check: true,
          uses32_bit_f_cnt: true
        }
      };
      console.log(data);
      axios
        .post(
          "http://us-west.thethings.network:8084/applications/piparking/devices",
          data,
          { headers }
        )
        .then(response => {
          return res.status(200).json({
            message: "Created"
          });
        })
        .catch(error => {
          console.log(error);
          res.status(502).json({
            message: "Error",
            error: error.response
          });
        });
    })
    .catch(e => {
      res.status(502).json({
        message: "Error",
        error: e,
        lugar: "ttn"
      });
    });
};

const deleteDevice = async (req, res) => {
  const device = await deviceModel.findByIdAndDelete(req.params.id);
  if (!device) {
    return res.status(404).json({
      status: "Not device found in server",
      data: null
    });
  }
  axios
    .delete(
      `http://us-west.thethings.network:8084/applications/piparking/devices/${req.params.id}`,
      { headers }
    )
    .then(() => {
      res.status(200).json({
        status: "Success",
        data: "Delete success"
      });
    })
    .catch(error => {
      res.status(404).json({
        status: "Not device found in ttn",
        data: error.response.data
      });
    });
  res.status(200).json({
    status: "Success",
    data: "Delete success"
  });
};

const updateDevice = (req, res) => {
  res.json({
    status: "Not found",
    message: "try again more later"
  });
};

const getCountBySector = (req, res) => {
  deviceModel
    .aggregate([
      { $match: { state: "Libre" } },
      { $group: { _id: "$real_location.sector", count: { $sum: 1 } } }
    ])
    .exec((err, result) => {
      return res.status(200).send(result);
    });
};

module.exports = {
  getAllDevices,
  getDevicesBySector,
  updateDevice,
  deleteDevice,
  createDevice,
  getCountBySector
};
