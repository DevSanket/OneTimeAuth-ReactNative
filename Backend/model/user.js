const mongoose = require("mongoose");
const bcrypt = require("bcryptjs/dist/bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    mobile_no: {
      type: String,
      default: "",
    },
    email_id: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

ApplyFormSchema.index({ location: "2dsphere" });
ApplyFormSchema.methods.setPassword = function (password, callback) {
  const promise = new Promise((resolve, reject) => {
    if (!password) reject(new Error("MISSING_PASSWORD"));

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      this.password = hash;
      resolve(this);
    });
  });

  if (typeof callback != "function") return promise;
  promise
    .then((result) => callback(null, result))
    .catch((err) => callback(err));
};

module.exports = mongoose.model("users", UserSchema);
