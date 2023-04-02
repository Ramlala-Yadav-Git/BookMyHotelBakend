const express = require("express");
const { multerUploads } = require("../../../middlewares/multer");
const upload = require("../../../middlewares/upload");

const router = express.Router();

router.post("/", multerUploads, upload, (req, res, next) => {
  try {
    const { image: link } = req;
    res.status(200).send({ imageLink: link });
  } catch (exception) {
    next(exception);
  }
});
router.get("/", (req, res, next) => {
  try {
    const { image: link } = req;
    res.status(200).send({ imageLink: link });
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
