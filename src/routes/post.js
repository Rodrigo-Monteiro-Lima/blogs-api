const express = require('express');
const { postController } = require('../controllers');
const auth = require('../middlewares/auth');

const postRouter = express.Router();

postRouter.use(auth);

postRouter.post('/', postController.create);

postRouter.get('/', postController.findAll);

postRouter.get('/search', postController.searchPost);

postRouter.get('/:id', postController.findById);

postRouter.put('/:id', postController.update);

postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;