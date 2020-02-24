const express = require("express");
const router = express.Router();
const deviceController = require("./../controllers/deviceController");
const ttnController = require("./../controllers/ttnController");

router.get("/status", deviceController.getCountBySector);

router.get("/:id", deviceController.getDeviceById);

router.patch("/:id", deviceController.updateDevice);

router.delete("/:id", deviceController.deleteDevice);

router.post("/", deviceController.createDevice);

router.get("/", deviceController.getAllDevices);

router.post("/message", ttnController.sendDown);

module.exports = router;
