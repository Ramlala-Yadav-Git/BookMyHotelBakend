const express = require("express");
const transactionController = require("./controller/transaction.controller");

const router = express.Router();

router.use("/transaction", transactionController);

module.exports = router;
