const express = require("express");

const router = express.Router();

const { getPowerUsage, getPowerHistory } = require("../controllers/power.controller");

router.get("/", getPowerUsage);

router.get("/history", getPowerHistory);

module.exports = router;