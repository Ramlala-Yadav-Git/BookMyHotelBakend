const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({ filemanagement: "filemanagement" });
});

module.exports = router;
