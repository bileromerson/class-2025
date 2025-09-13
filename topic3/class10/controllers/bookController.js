
const Book = require("../models/book");


const createBook = async (req, res) => {//Observe que esse código pode ser reaproveitado do bookRoutes.js
    try {
      const { title, author, year, genre } = req.body;
      const newBook = new Book({ title, author, year, genre });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar livro" });
    }
};

//Atividade 2, Aula 07
 const listBooks = async (_req, res) => { // Definindo a rota. OBSERVE QUE É O MESMO CÓDIGO DA LINHA 31 DO SERVER.JS
    try {
      const books = await Book.find(); // buscando livros no BD - veja a apostila para mais explicações
      res.json(books);// envia a lista de livros ao cliente no formato json
    } catch (err) { // aqui é se dar ruim
      res.status(500).json({ error: "Erro ao buscar livros" });
    }
   };

const listBookbyId =  async (req, res, next) => {//observe o :id aqui, o que você acha que ele faz?
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
  };


 const updateBook = async (req, res) => {//definindo a rota tipo PATCH
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
 };

 const deleteBook =  async (req, res) => {//Qual o tipo da rota estamos usando?
    try {
      const { id } = req.params; //Qual parâmetro é usado como base para remover documentos?
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook)// Se o ID não existir ou for inválido
        return res.status(404).json({ error: "Livro não encontrado" });
      res.json({ message: "Livro excluído com sucesso" });
    } catch (err) {// aqui é se der ruim em alguma etapa
      res.status(500).json({ error: "Erro ao excluir livro" });
    }
   };
   
module.exports = { createBook, listBooks, listBookbyId, updateBook, deleteBook}; //exportando a nossa função. O que significa "exportar"?

