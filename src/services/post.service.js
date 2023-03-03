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

const update = async (id, post, user) => {
  const error = schema.validateUpdatedPost(post);
  if (error.message) return error;
  const postExist = await BlogPost.findOne({ where: { id } });
  if (!postExist) return { status: 404, message: 'Post does not exist' };
  if (postExist.userId !== user.id) return { status: 401, message: 'Unauthorized user' };
  const [updatedPost] = await BlogPost.update(post, { where: { id } });
  const { post: updated } = await findById(updatedPost);
  return { status: 200, updated };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};
