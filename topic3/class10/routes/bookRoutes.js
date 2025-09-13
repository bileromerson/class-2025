const validateTitle = require("../middlewares/validateTitle");
const bookController = require('../controllers/bookController'); //importei a galera toda
const Book = require("../models/book");

const express = require("express");
const router = express.Router();

/*router.post("/books", validateTitle, async (req, res) => {
    try {
      const { title, author, year, genre } = req.body;
      const newBook = new Book({ title, author, year, genre });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar livro" });
    }
});*/

//Declaração de rotas (atividade 1 e 2)

router.post("/books", validateTitle, bookController.createBook);
router.get("/books", bookController.listBooks);
router.get("/book/:id", bookController.listBookbyId);
router.patch("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);


//Atividade 1, Aula 07
/*router.get("/api/books", async (_req, res) => { // Definindo a rota. OBSERVE QUE É O MESMO CÓDIGO DA LINHA 31 DO SERVER.JS
  try {
    const books = await Book.find(); // buscando livros no BD - veja a apostila para mais explicações
    res.json(books);// envia a lista de livros ao cliente no formato json
  } catch (err) { // aqui é se dar ruim
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
 });*/

module.exports = router


