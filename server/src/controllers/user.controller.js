const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

// Creating Account
router.post("/create-account", async (req, res) => {
  try {
    const checkIfUserExists = await User.findOne({ email: req.body.email })
      .lean()
      .exec();
    if (checkIfUserExists.length > 0) {
      return res
        .status(404)
        .send({ success: false, message: "E-mail already exists" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error });
  }
});

module.exports = router;
