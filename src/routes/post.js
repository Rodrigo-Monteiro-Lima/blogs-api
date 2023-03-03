const express = require('express');
const { postController } = require('../controllers');
const auth = require('../middlewares/auth');

const postRouter = express.Router();

postRouter.use(auth);

postRouter.post('/', postController.create);

postRouter.get('/', postController.findAll);

postRouter.get('/:id', postController.findById);

postRouter.put('/:id', postController.update);

module.exports = postRouter;