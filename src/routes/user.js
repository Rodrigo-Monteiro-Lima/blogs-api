const express = require('express');
const { userController } = require('../controllers');
const auth = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/', userController.create);

userRouter.use(auth);

userRouter.get('/', userController.findAll);

userRouter.get('/:id', userController.findById);

module.exports = userRouter;