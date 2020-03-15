const express = require("express");
const router = express.Router();
const statistivcController = require("../controllers/statisticController");

router.post("/", statistivcController.getStatistics);

module.exports = router;
