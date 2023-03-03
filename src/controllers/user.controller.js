const { userService } = require('../services');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await userService.create({ displayName, email, password, image });
    if (user.message) return next(user);
    const { token } = user;
    return res.status(user.status).json({ token });
  } catch (error) {
    return next(error); 
  }
};

const findAll = async (_req, res, next) => {
  try {
    const users = await userService.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  findAll,
};