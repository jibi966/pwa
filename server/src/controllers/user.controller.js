const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const router = express.Router();
require("dotenv").config();

// creating tokens for user
const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: "1h" });
};

// Creating Account
router.post("/create-account", async (req, res) => {
  try {
    // here we can may be implement more form validation methods using express-validator
    const checkIfUserExists = await User.findOne({ email: req.body.email })
      .lean()
      .exec();
    if (checkIfUserExists) {
      return res
        .status(404)
        .send({ success: false, message: "E-mail already exists" });
    }
    const createdUser = await User.create(req.body);
    return res.status(200).send({ success: true, message: createdUser });
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const loginUser = await User.findOne({ email: req.body.email });

    if (!loginUser) {
      return res.status(404).send({
        success: false,
        message: "Please Provide a valid email or password",
      });
    }
    const match = loginUser.checkpassword(req.body.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Please provide a valid email or password",
      });
    }
    const token = newToken(loginUser);
    return res.status(200).send({ success: true, message: loginUser, token });
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
});

module.exports = router;
