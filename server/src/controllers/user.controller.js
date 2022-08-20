const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

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

module.exports = router;
