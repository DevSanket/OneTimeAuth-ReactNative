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
    }
  } catch (error) {}
};

module.exports.RegisterUser = async () => {
  try {
    const CreateUser = await Model.User.create(req.body);
    await CreateUser.setPassword(req.body.password);
    await CreateUser.save();
  } catch (error) {}
};

module.exports.LoginUser = async () => {
  try {
  } catch (error) {}
};

module.exports.getProfile = async () => {
  try {
  } catch (error) {}
};
