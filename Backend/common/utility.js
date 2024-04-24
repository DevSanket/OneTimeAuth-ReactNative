const bcrypt = require("bcryptjs");

module.exports = {
  hashPasswordUsingBcrypt: async (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },

  comparePasswordUsingBcrypt: async (pass, hash) => {
    return bcrypt.compareSync(pass, hash);
  },
};
