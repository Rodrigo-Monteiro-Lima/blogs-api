const express = require('express');
const loginRouter = require('./login');
const userRouter = require('./user');
const categoryRouter = require('./category');

const routes = express.Router();

routes.use('/login', loginRouter);

routes.use('/user', userRouter);

routes.use('/categories', categoryRouter);

module.exports = routes;