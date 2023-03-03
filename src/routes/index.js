const express = require('express');
const loginRouter = require('./login');
const userRouter = require('./user');

const routes = express.Router();

routes.use('/login', loginRouter);

routes.use('/user', userRouter);

module.exports = routes;