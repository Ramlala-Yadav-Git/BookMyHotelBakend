const express = require("express");
const auth = require("../../middlewares/auth");
const { validateUpdate, validateCreate } = require("../validators/validator");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    hotel: "hotel",
  });
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { body = {} } = req;
    const { id, name, city, facilities, rentPerDay, rooms } = body;
    if (id) {
      await validateUpdate(body);
    } else {
      await validateCreate(body);
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
