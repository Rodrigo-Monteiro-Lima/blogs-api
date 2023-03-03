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

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.findById(id);
    if (post.message) return next(post);
    return res.status(post.status).json(post.post);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await postService.update(id, { title, content }, req.user);
    if (post.message) return next(post);
    return res.status(post.status).json(post.updated);
  } catch (error) {
    return next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.deletePost(id, req.user);
    if (post.message) return next(post);
    return res.sendStatus(post.status);
  } catch (error) {
    return next(error);
  }
};

const searchPost = async (req, res, next) => {
  try {
    const { q = '' } = req.query;
    const posts = await postService.searchPost(`%${q}%`);
    return res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deletePost,
  searchPost,
};