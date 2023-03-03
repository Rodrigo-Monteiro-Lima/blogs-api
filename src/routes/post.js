const express = require('express');
const { postController } = require('../controllers');
const auth = require('../middlewares/auth');

const postRouter = express.Router();

postRouter.post('/', auth, postController.create);

module.exports = postRouter;