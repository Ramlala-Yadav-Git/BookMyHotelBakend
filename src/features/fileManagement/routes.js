const express = require("express");
const fileManagementController = require("./controller/fileManagement.controller");

const router = express.Router();

router.use("/", fileManagementController);

module.exports = router;
