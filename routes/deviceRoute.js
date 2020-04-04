const express = require("express");
const router = express.Router();
const deviceController = require("./../controllers/deviceController");
const ttnController = require("./../controllers/ttnController");
const { verifyToken, verifyUser } = require("../controllers/authController");

router.get("/status", deviceController.getCountBySector);

router.get(
  "/:sector",
  verifyToken,
  verifyUser,
  deviceController.getDevicesBySector
);

router.patch("/:id", verifyToken, verifyUser, deviceController.updateDevice);

router.delete("/:id", verifyToken, verifyUser, deviceController.deleteDevice);

router.post("/", verifyToken, verifyUser, deviceController.createDevice);

router.get("/", verifyToken, verifyUser, deviceController.getAllDevices);

router.post("/message", verifyToken, verifyUser, ttnController.sendDown);

module.exports = router;
