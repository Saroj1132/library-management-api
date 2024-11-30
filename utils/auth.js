const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// hash a password
const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

// verify a password
const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

// generate a JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { hashPassword, verifyPassword, generateToken };
