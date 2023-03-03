const express = require('express');
const { categoryController } = require('../controllers');
const auth = require('../middlewares/auth');

const categoryRouter = express.Router();

categoryRouter.post('/', auth, categoryController.create);

module.exports = categoryRouter;