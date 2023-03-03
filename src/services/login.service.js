const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const login = async (email, password) => {
  if (!email || !password) { 
    return { status: 400, message: 'Some required fields are missing' }; 
  }
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { status: 400, message: 'Invalid fields' }; 
  const token = generateToken(email);
  return { status: 200, token };
};

module.exports = {
  login,
};