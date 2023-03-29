const express = require("express");
const { validateUpdate, validateCreate } = require("../validators/validator");
const User = require("../model/user.model");

const router = express.Router();
router.get("/", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email: "someshkumar71524@gmail.com" })
  console.log(user)
  res.status(200).send({ somesh: "somesh" });
});

router.get("/login", async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).send({ error: "true", message: "Please fill details properly" })
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).send({
        error: "true",
        message: "User does not exist please register"
      });
    }
    const isPassMatch = password == user.password;
    if (!isPassMatch) {
      res.status(400).json({
        error: "true",
        message: "You have entered wrong password"
      });
    }
    res.status(200).send(user);
  } catch (exception) {
    next(exception);
  }
});
router.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (!email || !password) {
      return res.status(422).send({ error: "true", message: "Please fill details properly" })
    }
    if (isUser) {
      return res.status(422).send({
        error: "true",
        message: "User already exists please login"
      })
    }
    const userdata = {
      email,
      password,
      role: "USER"
    }
    const newUser = await User.create(userdata);
    res.status(200).send(newUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
