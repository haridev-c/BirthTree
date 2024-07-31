const mongoose = require("mongoose");

const donationSchema = mongoose.Schema({
  donorName: String,
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  donationAmount: Number,
  orderId: String,
  paymentId: String,
});

const donationModel = mongoose.model("Donation", donationSchema);

module.exports = donationModel;
