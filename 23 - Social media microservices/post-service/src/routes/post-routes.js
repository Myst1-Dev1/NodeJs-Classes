const express = require('express');
const { createPost } = require('../controllers/post-controller.js');
const { authenticateRequest } = require('../middlewares/auth-middleware.js');

const router = express();

router.use(authenticateRequest);

router.post('/create-post', createPost);

module.exports = router;