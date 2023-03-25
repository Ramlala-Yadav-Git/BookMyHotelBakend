const express = require("express");
const user = require("./user/routes");
const transaction = require("./transaction/routes");
const hotel = require("./hotel/routes");
const fileManagement = require("./fileManagement/routes");

const router = express.Router();

router.route("/user", user);
router.route("/transaction", transaction);
router.route("/hotel", hotel);
router.route("/file-management", fileManagement);

module.exports = router;
