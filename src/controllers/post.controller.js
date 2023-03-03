const { postService } = require('../services');

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const { id: userId } = req.user;
    const post = { ...body, userId };
    const newPost = await postService.create(post);
    if (newPost.message) return next(newPost);
    return res.status(newPost.status).json(newPost.result);
  } catch (error) {
    return next(error); 
  }
};

const findAll = async (_req, res, next) => {
  try {
    const posts = await postService.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  findAll,
};