const express = require('express');
const { userController } = require('../controllers');
const auth = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/', userController.create);

userRouter.get('/', auth, userController.findAll);

module.exports = userRouter;