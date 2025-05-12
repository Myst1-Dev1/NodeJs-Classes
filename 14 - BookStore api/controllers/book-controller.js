const Book = require("../models/book.js");

const getAllBooks = async(req, res) => {
    try {
        const allBooks = await Book.find({});
        
        if(allBooks?.length > 0) {
            res.status(200).json({
                success: true,
                message: 'List of books fetched successfully',
                data: allBooks
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No Books founded in collection'
            });
        }
    } catch (error) {
        console.log('Failed to get all books', error);
        res.status(500).json({message:'Failed to get books'});
    }
}

const getSingleBookById = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const bookDetailsById = await Book.findById(getCurrentBookID);

        console.log(bookDetailsById);

        if (!bookDetailsById) {
            return res.status(404).json({
                success: false,
                message: "Book with the current id is not found. Please try another ID."
            });
        }

        res.status(200).json({
            success: true,
            data: bookDetailsById
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get a single book',
            error: error.message
        });
    }
}

const addNewBook = async(req, res) => {
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);

        if(newBookFormData) {
            res.status(201).json({
                success:true,
                message:'Book added successfully',
                data: newlyCreatedBook
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to create a new book'});
    }
}

const updateBook = async(req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const updatedBookFormData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(getCurrentBookID, updatedBookFormData, {
            new: true
        });

        if(!getCurrentBookID) {
            return res.status(404).json({
                success: false,
                message: 'Failed to find a book, please try another rid'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to get a single book',
            error: error.message
        });
    }
}

const deleteBook = async(req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);

        if(!getCurrentBookID) {
            return res.status(404).json({
                success: false,
                message: 'Failed to find a book, please try another rid'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to get a single book',
            error: error.message
        });
    }
}

module.exports = { getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook }