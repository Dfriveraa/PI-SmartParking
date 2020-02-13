const deviceModel=require('./../models/devicesModel');
const mongoose=require('mongoose');
const getAllDevices=(req,res)=>{

    res.json({
        status:"Not found",
        message:"try again more later"
    })
};
const getDeviceById=(req,res)=>{
    const device = deviceModel.find(req.params.id);
    res.json({
        status:"Not found",
        message:"try again more later"
    })
};
const createDevice=async (req,res)=>{
  console.log("connect");
   const device=new deviceModel();

   device._id=123;
   device.recorder_id="Daniel Rivera";
   device.canvas_location.y=45;
   device.canvas_location.x=15;
   device.real_location.sector="Bloque 16";
   device.real_location.identifier=1;
   device.app_eui="45648";
   device.date=new Date();
   await device.save();
   // device._id=req.body._id*1;
   // device.title=req.body.title;
   // device.author=req.body.author;
    //device.save();
    res.json({
        status:"Entro al create",
        message:"try again more later",
        data:req.body
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
