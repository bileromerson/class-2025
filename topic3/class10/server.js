const express = require("express");

const connectDB = require("./config/config");

const Book = require("./models/book");

const app = express();

const validateTitle = require("./middlewares/validateTitle");

const validateAuthor = require("./middlewares/validateAuthor");

const validateYear = require("./middlewares/validateYear");

const bookRoutes = require('./routes/bookRoutes');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./docs/swagger.json');

connectDB();

app.use(express.json());

app.post("/api/books", validateTitle, validateAuthor, validateYear, async (req, res) => {// cria uma rota HTTP do tipo POST, usada para enviar dados ao Servidor
  try {
    const { title, author, year, genre } = req.body; // Pega os campos  título, autor e etc. da requisição
    const newBook = new Book({ title, author, year, genre });// criamos um novo objeto (um novo livro)
    await newBook.save(); // salvando o livro no meu BD; await = espera salvar antes de continuar o código
    res.status(201).json(newBook);//deu bom, envia os dados do novo livro no formato JSON
  } catch (err) { //aqui é se der ruim
    res.status(500).json({ error: "Erro ao criar livro" });
  }
 });

 app.get("/api/books", async (_req, res) => { // Definindo a rota
  try {
    const books = await Book.find(); // buscando livros no BD - veja a apostila para mais explicações
    res.json(books);// envia a lista de livros ao cliente no formato json
  } catch (err) { // aqui é se dar ruim
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
 });

 app.get("/api/books/:id", async (req, res, next) => {//observe o :id aqui, o que você acha que ele faz?
  try {
    const { id } = req.params;//params = parametros. Que parâmetro estamos usando para buscar o livro?
    const book = await Book.findById(id);// o que significa "find" em inglês?
 
    if (!book) {//! => "não". Se o Livro não for encontrado
      return res.status(404).json({ error: "Livro não encontrado" });
    }
 
    res.json(book);
  } catch (err) {// aqui é se der algum erro
    next(err);
    //res.status(500).json({ error: "Erro ao buscar livro" });
  }
});

 /*app.get("/api/books/:title", async (req, res) => {
  try {
    const { title } = req.params;//params = parametros. Que parâmetro estamos usando para buscar o livro?
    const book = await Book.findById(title);// o que significa "find" em inglês?
 
    if (!book) {//! => "não". Se o Livro não for encontrado
      return res.status(404).json({ error: "Livro não encontrado" });
    }
 
    res.json(book);
  } catch (err) {// aqui é se der algum erro
    res.status(500).json({ error: "Erro ao buscar livro" });
  }
 }

);*/

app.patch("/api/books/:id", async (req, res) => {//definindo a rota tipo PATCH
  try {
    const { id } = req.params;// qual parametro será usado para o UPDATE?
    const updates = req.body; //campos que devem ser atualizados 
    const options = { new: true, runValidators: true }; //retornando o novo doc atualizado (new)
    // garantindo que as validações definidas no modelo sejam respeitadas (os campos obrigatórios e tipos)
 
 
    const updatedBook = await Book.findByIdAndUpdate(id, updates, options);// o que significa find em inglês?
    if (!updatedBook)
      return res.status(404).json({ error: "Livro não encontrado" });
 
 
    res.json(updatedBook);
  } catch (err) {// aqui é se der ruim
    res.status(500).json({ error: "Erro ao atualizar livro." });
  }
 });
 
 app.delete("/api/books/:id", async (req, res) => {//Qual o tipo da rota estamos usando?
  try {
    const { id } = req.params; //Qual parâmetro é usado como base para remover documentos?
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook)// Se o ID não existir ou for inválido
      return res.status(404).json({ error: "Livro não encontrado" });
    res.json({ message: "Livro excluído com sucesso" });
  } catch (err) {// aqui é se der ruim em alguma etapa
    res.status(500).json({ error: "Erro ao excluir livro" });
  }
 });
 
 app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocorreu um erro no servidor." });
 });
 
 app.use('/api', bookRoutes);

 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log("Server running on port 3000"));

/*app.get("/divide", (req, res) => { 
    try {
      const numerador = 10;
      const denominador = 0;
   
      if (denominador === 0) {
        throw new Error("Não é possível dividir por zero.");
      }

      const resultado = numerador / denominador;
      res.json({ resultado });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
   });

*/
   



