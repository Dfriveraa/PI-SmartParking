const express=require('express');
const router=express.Router();
const deviceController=require('./../controllers/deviceController');

router.get('/',deviceController.getAllDevices);

router.get('/:id',deviceController.getDeviceById);

router.patch('/:id',deviceController.updateDevice);

router.delete(':id',deviceController.deleteDevice);

router.post('/',deviceController.createDevice);

module.exports  =router;