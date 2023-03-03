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

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);
    if (user.message) return next(user);
    return res.status(user.status).json(user.user);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.user.id);
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  deleteUser,
};