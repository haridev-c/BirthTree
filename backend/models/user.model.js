const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  dob: Date,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
