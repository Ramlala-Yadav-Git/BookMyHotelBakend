const { dataUri } = require("./multer");
const { uploader } = require("../config/cloudinaryConfig");

const upload = (req, res, next) => {
  if (req.files.length) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then((result) => {
        const image = result.url;
        req.image = image;
        next();
      })
      .catch((err) =>
        res.status(400).json({
          error: {
            message: err.message,
          },
        })
      );
  }
};

module.exports = upload;
