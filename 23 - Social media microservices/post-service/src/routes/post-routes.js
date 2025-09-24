const express = require('express');
const { createPost, getAllPosts, getPost, deletePost } = require('../controllers/post-controller.js');
const { authenticateRequest } = require('../middlewares/auth-middleware.js');

const router = express();

router.use(authenticateRequest);

router.post('/create-post', createPost);
router.get('/getPosts', getAllPosts);
router.get('/:id', getPost);
router.delete('/:id', deletePost);

module.exports = router;