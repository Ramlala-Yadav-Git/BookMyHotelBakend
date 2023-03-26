const express = require("express");
const {
  validateUpdate,
  validateCreate,
  validateLogin,
} = require("../validators/validator");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const error = require("../../utils/errorUtil");

const router = express.Router();

const SALT_ROUNDS = 10;

router.post("/login", async (req, res, next) => {
  try {
    const { body: { email } = {} } = req;
    await validateLogin(body);
    const user = await User.findOne({ email: email }).lean().exec();
    res.status(200).send(User);
  } catch (exception) {
    next(exception);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body: { id, name, role, password, email } = {}, headers = {} } =
      req;
    let user;
    if (id) {
      await validateUpdate(body, headers);
      const updatedUser = {};
      if (password) {
        bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
          if (err) {
            error(500, err.message);
          } else {
            updatedUser.password = hash;
          }
        });
      }
      updatedUser.role = role ? role : "USER";
      if (email) updatedUser.email = email;
      updatedUser.name = name ? name : "";
      user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    } else {
      await validateCreate(body);
      const newUser = {};
      bcrypt.hash(password, SALT_ROUNDS, function (err, hash) {
        if (err) {
          error(500, err.message);
        } else {
          newUser.password = hash;
        }
      });
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
