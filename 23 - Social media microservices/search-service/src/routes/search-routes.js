const express = require('express');
const { searchPostController } = require('../controllers/search-controller.js');
const { authenticateRequest } = require('../middlewares/auth-middleware.js');

const router = express.Router();

router.use(authenticateRequest);

router.get('/posts', searchPostController);

module.exports = { router };