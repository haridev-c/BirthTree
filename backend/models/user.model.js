const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  dob: Date,
  totalDonation: { type: Number, default: 0 },
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donations" }],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
