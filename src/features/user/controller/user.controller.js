const express = require("express");
const {
  validateUpdate,
  validateCreate,
  validateLogin,
} = require("../validators/validator");
const bcrypt = require("bcrypt");
const db = require("../../../config/sqlConfig");

const router = express.Router();

const SALT_ROUNDS = 10;

router.post("/login", async (req, res, next) => {
  try {
    const { body = {} } = req;
    await validateLogin(body);
    const { email } = body;
    const user = await db.user.findOne({ where: { email: email } });
    res.status(200).send(user);
  } catch (exception) {
    next(exception);
  }
});

router.post("/", async (req, res, next) => {
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
      const savedUser = await db.user.findByPk(id);
      user = await savedUser.update(updatedUser);
    } else {
      await validateCreate(body);
      const newUser = {};
      newUser.password = await bcrypt.hash(password, SALT_ROUNDS);
      newUser.role = role ? role : "USER";
      newUser.email = email;
      newUser.name = name ? name : "";
      user = await db.user.create(newUser);
    }
    res.status(200).send(user);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
