const express = require('express');
const bookController = require('../controllers/book-controller.js');

const router = express.Router();

router.post('/add-new-book', bookController.addBook);
router.get('/get-all-books', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;