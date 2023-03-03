const { categoryService } = require('../services');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await categoryService.create({ name });
    if (category.message) return next(category);
    return res.status(category.status).json(category.newCategory);
  } catch (error) {
    return next(error); 
  }
};

module.exports = {
  create,
};