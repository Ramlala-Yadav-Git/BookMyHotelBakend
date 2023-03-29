const express = require("express");
const user = require("./features//user/routes");
const transaction = require("./features//transaction/routes");
const hotel = require("./features//hotel/routes");
const fileManagement = require("./features/fileManagement/routes");

const router = express.Router();

router.use("/user", user);
router.use("/transactions", transaction);
router.use("/hotels", hotel);
router.use("/file-management", fileManagement);

module.exports = router;
