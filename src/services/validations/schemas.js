const Joi = require('joi');

const addUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const addCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const requiredMessage = 'Some required fields are missing';

const addPostSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': requiredMessage,
    'string.empty': requiredMessage,
  }),
  content: Joi.string().required().messages({
    'any.required': requiredMessage,
    'string.empty': requiredMessage,
  }),
  categoryIds: Joi.array().required().messages({
    'any.required': requiredMessage,
  }),
});

module.exports = {
  addUserSchema,
  addCategorySchema,
  addPostSchema,
};
