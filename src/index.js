const express = require("express");
const { urlencoded, json } = require("body-parser");
const parser = require("body-parser");
const { cloudinaryConfig } = require("./config/cloudinaryConfig");
const cors = require("cors");
const router = require("./routes");
const undefinedUrlHandler = require("./middlewares/undefinedUrlhandler");
const errorHandler = require("./middlewares/errorHandler");
const multer = require("multer");
const db = require("./config/sqlConfig");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(parser.text({ type: "/" }));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use("*", cloudinaryConfig);
app.use(multer().any());

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/app", router);

app.use(undefinedUrlHandler);
app.use(errorHandler);

const port = process.env.PORT || "2345";

const start = () => {
  app.listen(port, () => {
    console.log("Hurray! listening to port no: ", port);
  });
};

start();
