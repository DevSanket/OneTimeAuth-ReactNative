const jwt = require("jsonwebtoken");
const Model = require("../model");

module.exports.getToken = (data) =>
  jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "30d" });

module.exports.verifyToken = (token) =>
  jwt.verify(token, process.env.SECRET_KEY);

module.exports.verifyUser = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization || "")
      .replace(/bearer|jwt/i, "")
      .replace(/^\s+|\s+$/g, "");

    const decoded = this.verifyToken(token);

    const doc = await Model.User.findOne({
      _id: decoded._id,
      accessToken: token,
    });

    if (!doc) throw new Error("INVALID_ERROR");

    req.user = doc;

    next();
  } catch (error) {
    return res.status(401).json({ error: "UNAUTHORIZED ACCESS" });
  }
};
