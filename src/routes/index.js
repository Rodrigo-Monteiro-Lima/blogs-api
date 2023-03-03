const express = require('express');
const loginRouter = require('./login');
const userRouter = require('./user');
const categoryRouter = require('./category');
const postRouter = require('./post');

const routes = express.Router();

routes.use('/login', loginRouter);

routes.use('/user', userRouter);

routes.use('/categories', categoryRouter);

routes.use('/post', postRouter);

module.exports = routes;