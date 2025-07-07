const express = require('express');
const connectDB = require('./config/config');
const book = require('./models/book');
const app = express();

connectDB();
app.use(express.json());
app.listen(3000, () => console.log('Server is running on port 3000'));

app.post('/api/books', async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        const newBook = new book({ title, author, year, genre });
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        res.status(400).json({ error:'error ao criar livro!!!'});
    }
});

app.get('/read', (req, res) => {
    res.status(200).json(comidas);
    try {
        const numerador = 10
        const denominador = 0;
        /*
        if (denominador === 0) {
            res.status(400).json({ error: 'Divisão por zero não é permitida' });
            return;
        }
        */
        if (denominador === 0) {
            throw new Error('Divisão por zero não é permitida');
        }
        const resultado = numerador / denominador;
        res.json({ message: `Resultado: ${resultado}` });
    } catch (err){
        res.status(400).json({ error: err.message });
    }
});
