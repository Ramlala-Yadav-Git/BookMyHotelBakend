const express = require("express");
const auth = require("../../middlewares/auth");
const { multerUploads } = require("../../middlewares/multer");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/", auth, multerUploads, upload, (req, res, next) => {
  try {
    const { image: link } = req;
    res.status(200).send({ imageLink: link });
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
