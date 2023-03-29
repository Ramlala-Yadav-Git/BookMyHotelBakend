const express = require("express");
const { urlencoded, json } = require("body-parser");
const { cloudinaryConfig } = require("./config/cloudinaryConfig");
const cors = require("cors");
const connect = require("./config/mongoConfig");
const router = require("./routes");
const undefinedUrlHandler = require("./middlewares/undefinedUrlhandler");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true }))
app.use(json());
app.use("*", cloudinaryConfig);

app.use("/", router);
// app.use("/book-my-hotel", router);

app.use(undefinedUrlHandler);
app.use(errorHandler);

const port = process.env.PORT || "2345";

const start = async () => {
  await connect();
  app.listen(port, () => {
    console.log("Hurray! listening to port no: ", port);
  });
};

start();
