const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET;

const generateToken = (email) => {
  const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};

module.exports = generateToken;