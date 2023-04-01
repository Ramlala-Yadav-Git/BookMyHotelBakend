const express = require("express");
const {
  validateUpdate,
  validateCreate,
  validateLogin,
} = require("../validators/validator");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

const router = express.Router();

const SALT_ROUNDS = 10;

router.get("/", async (req, res, next) => {
    res.status(200).send("Yup!! Server runnning");
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const { body = {} } = req;
    await validateLogin(body);
    const { email } = body;
    const user = await User.findOne({ email: email }).lean().exec();
    res.status(200).send(user);
  } catch (exception) {
    next(exception);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { body = {}, headers = {} } = req;
    const { id, name, role, password, email } = body;
    let user;
    if (id) {
      await validateUpdate(body, headers);
      const updatedUser = {};
      if (password) {
        updatedUser.password = await bcrypt.hash(password, SALT_ROUNDS);
      }
      if (role) updatedUser.role = role;
      if (email) updatedUser.email = email;
      updatedUser.name = name ? name : "";
      user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    } else {
      await validateCreate(body);
      const newUser = {};
      newUser.password = await bcrypt.hash(password, SALT_ROUNDS);
      newUser.role = role ? role : "USER";
      newUser.email = email;
      newUser.name = name ? name : "";
      user = await User.create(newUser);
    }
    res.status(200).send(user);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
