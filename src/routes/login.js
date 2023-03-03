const express = require('express');
const { loginController } = require('../controllers');

const userRouter = express.Router();

userRouter.post('/', loginController.login);

module.exports = userRouter;