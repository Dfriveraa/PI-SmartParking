const express = require("express");
const router = express.Router();
const statisticController = require("../controllers/statisticController");
const { verifyToken, verifyUser } = require("../controllers/authController");

router.post("/", verifyToken, verifyUser, statisticController.getStatistics);

module.exports = router;
