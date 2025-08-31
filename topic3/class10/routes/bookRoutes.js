const validateTitle = require("../middlewares/validateTitle");
const bookController = require("../controllers/bookController");
const book = require("../models/book");
const express = require('express');
const router = express.Router();

router.post("/books", validateTitle, async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        const newBook = new book(title, author, year, genre);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: "Error creating book" });
    }
});

router.post("/books", validateTitle, bookController.createBook);
router.get("/books", bookController.listBooks);
router.get("/book/:id", bookController.listBookById);
router.patch("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

// router.get("/api/books", async (req, res) => {
//     try {
//         const books = await book.find();
//         res.json(books);
//     } catch (err) {
//         res.status(500).json({ error: "Error fetching books" });
//     }
// });
module.exports = router;