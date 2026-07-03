const express = require("express");

const router = express.Router();

const { getPowerUsage } = require("../controllers/power.controller");

router.get("/", getPowerUsage);

module.exports = router;