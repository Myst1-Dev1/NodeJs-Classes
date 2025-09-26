

const { PrismaClient } = require('@prisma/client');

const prisma = PrismaClient();

async function addBook(title, publisedDate, authorId) {
    try {
        const newlyCreatedBook = await prisma.book.create({
            data: {
                title,
                publisedDate,
                author: {
                    connect : { id: authorId }
                },
            }, include: { author: true }
        });

        return newlyCreatedBook;
    } catch (error) {
        console.error(error);
    }
}

async function getAllBooks() {
    try {
        const books = await prisma.books.findMany({
            include: { author: true }
        });

        return books;
    } catch (error) {
        console.error(error);
    }
}

async function getBookById(id) {
    try {
        const book = await prisma.book.findUnique({
            where: { id },
            include: { author: true }
        });

        if(!book) {
            throw new Error(`Book with id ${id} not found`);
        }

        return book;
    } catch (error) {
        console.error(error);
    }
}

async function updateBook(id, newTitle) {
    try {
        // const book = await prisma.book.findUnique({
        //     where: { id },
        //     include: { author: true }
        // });

        // if(!book) {
        //     throw new Error(`Book with id ${id} not found`);
        // }

        // const updatedBook = await prisma.book.update({
        //     where: { id },
        //     data: { title: newTitle },
        //     include: { author: true }
        // });

        // return updatedBook

        //using transactions

        const updatedBook = await prisma.$transaction(async (prisma) => {
            const book = await prisma.book.findUnique({
                where: { id }
            });

            if(!book) throw new Error(`Book with id ${id} not found`);

            return prisma.book.update({
                where: { id },
                data: { title: newTitle },
                include: { author: true }
            });
        });

        return updatedBook;
    } catch (error) {
        console.error(error);
    }
}

async function deleteBook(id) {
    try {
        const book = await prisma.book.findUnique({
            where: { id },
            include: { author: true }
        });

        if(!book) {
            throw new Error(`Book with id ${id} not found`);
        }

        const deletedBook = await prisma.book.delete({
            where: { id },
            include: { author: true }
        });

        return deletedBook;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };