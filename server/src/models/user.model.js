const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// checkpassword
// .lean() and .exex() will give an issue
UserSchema.methods.checkpassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// Hashing the password
// ES6 is not supported in Schema.pre callbacks, so carefull while hashing the password
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 4);
  return next();
});

module.exports = mongoose.model("user", UserSchema);
