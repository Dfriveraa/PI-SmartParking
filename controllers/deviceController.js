const deviceModel=require('./../models/devicesModel');
const axios = require('axios');
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Key ttn-account-v2.58_sDnuGDKwAXip17AnCBziZSuwormjqCAutPSexSL8'
};
const getAllDevices=async(req,res)=>{
   deviceModel.find({}, (err, l) =>{
        res.status(200).send(l);
    });

};
const getDeviceById=(req,res)=>{
    const device = deviceModel.find(req.params.id);
    res.json({
        status:"Not found",
        message:"try again more later"
    })
};
const createDevice=async (req,res)=>{
  let device=new deviceModel();
  device._id=req.body._id;
  device.recorder_id='Admin';
  device.canvas_location.x=req.body.canvas_location.x;
  device.canvas_location.y=req.body.canvas_location.y;
  device.real_location.sector=req.body.real_location.sector;
  device.real_location.identifier=req.body.real_location.identifier;
  device.app_eui='4564684684684';
  device.date=new Date();
  device.dev_eui=req.body.dev_eui;
  device.state='Libre';
  await device.save();

  const data=
    {
      "dev_id":req.body._id,
      "lorawan_device": {
        "activation_constraints": "otaa",
        "app_eui": req.body.app_eui,
        "app_id": "piparking",
        "app_key": "01020304050607080102030405060708",
        "dev_eui": req.body.dev_eui,
        "dev_id": req.body._id,
        "disable_f_cnt_check": true,
        "uses32_bit_f_cnt": true
      }
    };
  axios.post('http://us-west.thethings.network:8084/applications/piparking/devices',data,{headers})
    .then(response => {
      if(response.status===404){
        res.body=response.body;
        res.status(404).send();
      }
    })
    .catch(error => {
      console.log(error);
    });
    res.json({
      message:'Created'
    })
  };

const deleteDevice=(req,res)=>{
    res.json({
        status:"Not found",
        message:"try again more later"
    })
};
const updateDevice=(req,res)=>{
    res.json({
        status:"Not found",
        message:"try again more later"
    })
};
module.exports={getAllDevices,getDeviceById,updateDevice,deleteDevice,createDevice};
