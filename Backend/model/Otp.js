const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema(
  {
    otp: {
      type: String,
      default: 0,
    },
    phone_no: {
      type: String,
      default: "",
    },
    isBlocked: {
      type: Date,
      default: null,
    },
    expirationTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ManageOTP", OtpSchema);
