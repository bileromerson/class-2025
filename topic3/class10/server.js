const express = require('express');
const connectDB = require('./config/config');
const Book = require('./models/book');
const app = express();
const validateTitle = require("./middleweares/validateTitle");
const validateAuthor = require("./middleweares/validateAuthor");
const validateYear = requeire("./middleweares/validateYear");

connectDB();
app.use(express.json());

app.post('/api/books', async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        const newBook = new Book({ title, author, year, genre });
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        res.status(400).json({ error:'error ao criar livro!!!'});
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
});
app.get('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching book' });
    }
});
app.patch('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true, runValidators: true };

        const updatedBook = await Book.findByIdAndUpdate(id, updates, options);
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully', book: updatedBook });
    } catch (err) {
        res.status(500).json({ error: 'Error updating book' });
    }
});

app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting book' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Not found' });
});

// app.get('/read', (req, res) => {
//     res.status(200).json(comidas);
//     try {
//         const numerador = 10
//         const denominador = 0;
//         /*
//         if (denominador === 0) {
//             res.status(400).json({ error: 'Divisão por zero não é permitida' });
//             return;
//         }
//         */
//         if (denominador === 0) {
//             throw new Error('Divisão por zero não é permitida');
//         }
//         const resultado = numerador / denominador;
//         res.json({ message: `Resultado: ${resultado}` });
//     } catch (err){
//         res.status(400).json({ error: err.message });
//     }
// });
app.listen(3000, () => console.log('Server is running on port 3000'));
