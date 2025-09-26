const express = require('express');
const authorController = require('../controllers/author-controller.js');

const router = express.Router();

router.post('/add-author', authorController.addAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;