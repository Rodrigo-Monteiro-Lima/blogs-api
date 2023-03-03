const jwt = require('jsonwebtoken');
require('dotenv/config');
const userService = require('../services/user.service');

const secret = process.env.JWT_SECRET;

module.exports = async (req, _res, next) => {
  const token = req.header('Authorization');
  if (!token) return next({ status: 401, message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded;
    const { dataValues } = await userService.findByEmail(email);
    req.user = { ...dataValues };
    next();
  } catch (err) {
    next({ status: 401, message: 'Expired or invalid token' });
  }
};