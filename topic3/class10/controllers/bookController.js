const book = require('../models/book');
const createBook = async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        const newBook = new book({ title, author, year, genre });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: "Error creating book" });
    }
};

const listBooks = async (req, res) => {
    try {
        const books = await book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: "Error fetching books" });
    }
};

const listBooksbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await book.findById(id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (err) {
        // res.status(500).json({ error: "Error fetching book" });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true, runValidators: true };
        const updatedBook = await book.findByIdAndUpdate(id, updates, options);
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: "Error updating book" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting book" });
    }
};
module.exports = {
    createBook,
    listBooks,
    listBooksbyId,
    updateBook,
    deleteBook
};
