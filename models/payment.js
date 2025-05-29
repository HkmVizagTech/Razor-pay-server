const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: String,
  whatsappNumber: String,
  email: String,
  area: String,
  collegeName: String,
  courseAndYear: String,
  gender: {
    type: String,
    enum: ["male", "female", "Other"]
  },
  dayScholarOrHostler: {
    type: String,
    enum: ["Day Scholar", "Hostler"]
  },
  amount: Number,

  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,

  paymentSuccess: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);

