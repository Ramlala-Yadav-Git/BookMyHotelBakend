const express = require("express");
const user = require("./user/routes");
const transaction = require("./transaction/routes");
const hotel = require("./hotel/routes");
const filemanagement = require("./filemanagement/routes");

const router = express.Router();

router.use("/user", user);
router.use("/transaction", transaction);
router.use("/hotel", hotel);
router.use("/filemanagement", filemanagement);

module.exports = router;
