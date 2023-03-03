const { User } = require('../models');
const schema = require('./validations/validationsInputValues');
const generateToken = require('../utils/generateToken');

const create = async (user) => {
  const error = schema.validateNewUser(user);
  if (error.message) return error;
  const { email } = user;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return { status: 409, message: 'User already registered' };
  await User.create(user);
  const token = generateToken(email);
  return { status: 201, token };
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const findAll = async () => User.findAll({ attributes: { exclude: 'password' } });

module.exports = {
  create,
  findAll,
  findByEmail,
};