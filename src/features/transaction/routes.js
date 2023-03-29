const express = require("express");
const transactionController = require("./controller/transaction.controller");

const router = express.Router();

router.use("/", transactionController);

module.exports = router;
