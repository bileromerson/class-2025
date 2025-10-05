
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

const listBookbyId =  async (req, res, next) => {
  try{
      let query ={}; // cria um obj vasio que armazenara o valor da busca 
      if (req.query.title) { // verifica se o codico foi enviado para efetuar a busca
        query.title = {$regex: req.query.title, $options: 'i'};// permite a busca ignorando letra maiuscula e minuscula
      }
      if (req.query.author) { //verifica se o author foi enviado para efetuar a usca
        query.author = req.query.author;
      }
      if (req.query.genre) { //verifica se o genero foi enviado para efetuar a usca
        query.genre = req.query.genre;
      }
      let sort = {}; //obj vazio que armazenara o valor da ordenação
      if(req.query.sortBy) { //verifica se o sortBy foi enviado para efetuar a ordenação
        const sortField = req.query.sortBy;
        const sortOrder = req.query.order === 'desc' ? -1 : 1; // se order for desc, ordena de forma decrescente, senão crescente
        sort[sortField] = sortOrder;
      }
      const pageNumber = parseInt(req.query.pageNumber) || 1; // pega a pagina solicitada pelo usuario, se não for informada, considera a pagina 1
      const pageSize = parseInt(req.query.pageSize) || 5; // define a quantidade de livros por pagina, se não for informada, considera 5
      // quantos registros pular antes de buscar os livros
      const skip = (pageNumber - 1) * pageSize;
      const books = await (await Book.find(query)).toSorted(sort).skip(skip).limit(pageSize); // realiza a busca no BD com os filtron definidos
      res.json(books); // retorna os livros encontrados no formato JSON
    }
    catch (err) {// aqui é se der algum erro
    next(err);
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

