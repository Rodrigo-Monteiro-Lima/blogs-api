const { addUserSchema, addCategorySchema } = require('./schemas');

const validateNewUser = (user) => {
  const { error } = addUserSchema.validate(user);
  if (error) return { status: 400, message: error.message };
  return { status: 200, message: '' };
};

const validateNewCategory = (category) => {
  const { error } = addCategorySchema.validate(category);
  if (error) return { status: 400, message: error.message };
  return { status: 200, message: '' };
};

module.exports = {
  validateNewUser,
  validateNewCategory,
};
