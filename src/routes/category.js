const express = require('express');
const { categoryController } = require('../controllers');
const auth = require('../middlewares/auth');

const categoryRouter = express.Router();

categoryRouter.use(auth);

categoryRouter.post('/', categoryController.create);

categoryRouter.get('/', categoryController.findAll);

module.exports = categoryRouter;