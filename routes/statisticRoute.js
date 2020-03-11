const express = require("express");
const router = express.Router();
const statistivcController= require("../controllers/statisticController");


router.get("/", statistivcController.getStatistics);


module.exports = router;
