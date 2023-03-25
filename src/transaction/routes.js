const express = require("express");
const transactionController = require("./controller/transaction.controller");

const router = express.Router();

router.route("/", transactionController);

module.exports = router;
