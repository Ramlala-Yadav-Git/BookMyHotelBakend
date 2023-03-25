const express = require("express");
const user = require("./user/routes");
const transaction = require("./transaction/routes");
const hotel = require("./hotel/routes");
const fileManagement = require("./fileManagement/routes");

const router = express.Router();

router.use("/users", user);
router.use("/transactions", transaction);
router.use("/hotels", hotel);
router.use("/file-management", fileManagement);

module.exports = router;
