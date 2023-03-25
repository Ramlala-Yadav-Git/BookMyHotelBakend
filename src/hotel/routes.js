const express = require("express");
const hotelController = require("./controller/hotel.controller");

const router = express.Router();

router.use("/", hotelController);

module.exports = router;
