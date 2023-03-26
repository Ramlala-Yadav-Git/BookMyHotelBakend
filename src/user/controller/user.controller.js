const express = require("express");
const { validateUpdate, validateCreate } = require("../validators/validator");
const User = require("../model/user.model");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({ somesh: "somesh" });
});

router.post("/", async (req, res, next) => {
  try {
    const { body: { id, email, role = "USER" } = {}, headers = {} } = req;
    if (id) {
      validateUpdate(id, email, role, headers);
    } else {
      validateCreate(email, role, headers);
    }
    res.status(200).send("someh");
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
