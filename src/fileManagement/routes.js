const express = require("express");
const fileManagementController = require("./controller/fileManagement.controller");

const router = express.Router();

router.route("/", fileManagementController);

module.exports = router;
