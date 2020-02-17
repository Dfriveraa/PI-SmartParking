const deviceModel=require('./../models/devicesModel');
const axios = require('axios');
const AppError = require('./../utils/appError');
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
  if(req.body.id.length===1){
    console.log('jejejje')
  }
  device._id=req.body.id;
  device.recorder_id='Admin';
  device.canvas_location.x=req.body.canvas_location.x;
  device.canvas_location.y=req.body.canvas_location.y;
  device.real_location.sector=req.body.real_location.sector;
  device.real_location.identifier=req.body.real_location.identifier;
  device.app_eui='4564684684684';
  device.date=new Date();
  device.dev_eui=req.body.dev_eui;
  device.state='Libre';
  await device.save()
    .then(e=>{
      const data= {
        "dev_id":req.body.id,
        "lorawan_device": {
          "activation_constraints": "otaa",
          "app_eui": "70B3D57ED002740B",
          "app_id": "piparking",
          "app_key": "01020304050607080102030405060708",
          "dev_eui": req.body.dev_eui,
          "dev_id": req.body.id,
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
        res.status(200).json({
          message:'Created'
        })}

    ).catch(e=>{
      res.status(502).json({
        message:'Created',
        error:e
      })
    });
  };

const deleteDevice=async (req,res)=>{
    const device=await deviceModel.findByIdAndDelete(req.params.id);
    if(!device){
     return res.status(404).json({
        status:"Not device found in server",
        data: null
      });
    }
    console.log('holi');
    axios.delete(`http://us-west.thethings.network:8084/applications/piparking/devices/${req.params.id}`,{headers})
      .then(() => {
        res.status(200).json({
          status:"Success",
          data:'Delete success'
        })
      })
      .catch(error => {
        res.status(404).json({
          status:"Not device found in ttn",
          data: error.response.data
        })
      });

};
const updateDevice=(req,res)=>{
    res.json({
        status:"Not found",
        message:"try again more later"
    })
};
module.exports={getAllDevices,getDeviceById,updateDevice,deleteDevice,createDevice};
