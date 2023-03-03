const { Category, BlogPost, PostCategory, sequelize, User } = require('../models');
const schema = require('./validations/validationsInputValues');

const create = async ({ title, content, userId, categoryIds }) => {
  try {
    const error = schema.validateNewPost({ title, content, categoryIds });
    if (error.message) return error;
    const findCategories = await Category.findAll({ where: { id: categoryIds } });
    if (findCategories.length !== categoryIds.length) { 
      return { status: 400, message: 'one or more "categoryIds" not found' }; 
    }
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost
      .create({ title, content, userId }, { transaction: t });
      await Promise.all(categoryIds.map(async (categoryId) => PostCategory
      .create({ postId: newPost.id, categoryId }, { transaction: t })));
      return newPost;
    });
    return { status: 201, result };
  } catch (error) {
    return { message: error.message };
  }
};

const findAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findOne({ where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { status: 404, message: 'Post does not exist' };
  return { status: 200, post };
};

module.exports = {
  create,
  findAll,
  findById,
};
