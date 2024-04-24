const { Auth, Utility } = require("../common");
const Model = require("../model");
const { default: axios } = require("axios");

async function sendOtp(phone, otp) {
  const response = await axios
    .get(
      `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.MSG_API_KEY}&route=otp&variables_values=${otp}&flash=0&numbers=${phone}`
    )
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });

  return response;
  // return true;
}

module.exports.SendMobileOTP = async (req, res) => {
  try {
    const { mobile_no } = req.body;
    //not registration type
    if (req.body.type === "Registration") {
      let findUserExists = Model.User.findOne({
        mobile_no: mobile_no,
      });

      if (findUserExists) {
        return res.status(400).json({ error: "User Already Exists" });
      }
    }

    let otp = await generateOTP();
    await Model.Otp.deleteMany({ phone_no: mobile_no });

    async function addMinutes(date, minutes) {
      const dateCopy = new Date(date);
      dateCopy.setMinutes(date.getMinutes() + minutes);
      return dateCopy;
    }

    const date = new Date();

    const newDate = await addMinutes(date, 10);
    await Model.Otp.create({
      otp: otp,
      phone_no: mobile_no,
      expirationTime: newDate,
    });

    const check = await sendOtp(mobile_no, otp);

    if (!check) {
      return res.status(400).json({ error: "OTP Not Send" });
    }

    return res.status(200).json({ msg: "SUCCESSFULLY DONE" });
  } catch (error) {
    return res.status(400).json({ error: "Syntax Error" });
  }
};

module.exports.Verify_OTP = async (req, res) => {
  try {
    const { mobile_no, OTPCode } = req.body;
    const Get_OTP = await Model.Otp.find({ phone_no: mobile_no });
    if (!Get_OTP) {
      return res.status(400).json({ error: "Not  OTP Found" });
    }

    if (Get_OTP.otp === OTPCode) {
      if (new Date() > Get_OTP.expirationTime) {
        return res.status(400).json({ error: "OTP Expired" });
      }

      const UpdateOTP = await Model.Otp.findOneAndUpdate(
        {
          _id: Get_OTP._id,
        },
        {
          $set: {
            verified: true,
          },
        },
        { new: true }
      );

      const user = await Model.User.findOne({
        mobile_no: mobile_no,
      });

      //Building for Forgot Password
      if (user) {
        if (user.accessToken !== "") {
          return res.status(200).json({
            msg: "Verification Successfull",
            accessToken: user.accessToken,
          });
        } else {
          let accessTokenGenerate = await Auth.getToken({
            _id: user._id,
          });

          const updateUser = await Model.User.findOneAndUpdate(
            { _id: user._id },
            {
              $set: {
                accessToken: accessTokenGenerate,
              },
            },
            { new: true }
          );

          return res.status(200).json({
            msg: "Verification Successfull",
            accessToken: accessTokenGenerate,
          });
        }
      }
      return res.status(200).json({
        msg: "Verification Successfull",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: "Verification Failed" });
  }
};

module.exports.RegisterUser = async () => {
  try {
    //Check OTP Exists
    const CheckIsThereOTP = await Model.Otp.findOne({
      phone_no: req.body.mobile_no,
      verified: true,
    });

    if (CheckIsThereOTP) {
      const CreateUser = await Model.User.create(req.body);
      await CreateUser.setPassword(req.body.password);
      await CreateUser.save();

      //Generate AccessToken
      let accessTokenGenerate = await Auth.getToken({
        _id: CreateUser._id,
      });

      const UpdateUser = await Model.User.findOneAndUpdate(
        { _id: CreateUser._id },
        {
          $set: {
            accessToken: accessTokenGenerate,
          },
        },
        { new: true }
      );

      UpdateUser.password = "";

      return res
        .status(200)
        .json({ msg: "Account Created Successfully", data: UpdateUser });
    } else {
      return res.status(401).json({ error: "Unverified Mobile No Found!" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Registration Failed!" });
  }
};

module.exports.LoginUser = async () => {
  try {
    if (req.body.mobile_no) {
      let User = await Model.User.findOne({
        mobile_no: req.body.mobile_no,
      });

      if (!User) {
        return res.status(400).json({ error: "No User Found!" });
      }

      let match = await Utility.comparePasswordUsingBcrypt(
        req.body.password,
        User.password
      );

      if (!match) {
        return res.status(400).json({ error: "Password Not Matching" });
      }

      let accessTokenGenerate = await Auth.getToken({
        _id: User._id,
      });

      const UpdateUser = await Model.User.findOneAndUpdate(
        {
          _id: User._id,
        },
        {
          $set: {
            accessToken: accessTokenGenerate,
          },
        },
        { new: true }
      );

      UpdateUser.password = "";

      return res
        .status(200)
        .json({ msg: "Login Successfull", data: UpdateUser });
    } else {
      return res.status(400).json({ error: "Invalid Phone No" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Authentication Failed" });
  }
};

module.exports.getProfile = async () => {
  try {
    const User = req.user;
    User.password = "";
    return res.status(200).json({ msg: "Successfully Fetched", data: User });
  } catch (error) {
    return res.status(400).json({ error: "Error While Gettting User" });
  }
};
