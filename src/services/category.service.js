const { Category } = require('../models');
const schema = require('./validations/validationsInputValues');

const create = async (category) => {
  const error = schema.validateNewCategory(category);
  if (error.message) return error;
  const { name } = category;
  const categoryExists = await Category.findOne({ where: { name } });
  if (categoryExists) return { status: 409, message: 'Category already registered' };
  await Category.create(category);
  const newCategory = await Category.findOne({ where: { name } });
  return { status: 201, newCategory };
};

module.exports = {
  create,
};