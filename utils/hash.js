const bcrypt = require("bcrypt")


async function hashPassword(password) {
    const saltRounds = 10; 
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error hashing password");
    }
  }

module.exports = hashPassword;