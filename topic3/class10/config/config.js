
const mongoose = require('mongoose'); //Importação do mongoose


const connectDB = async () => { //conexão com o BD (mais informações na apostila)
 try { //Try e Catch para verificar se está tudo ok
   await mongoose.connect('mongodb://localhost:27017/minhaLivrariaDB');
   console.log('MongoDB conectado!');
 } catch (err) {
   console.error('Erro ao conectar ao MongoDB:', err);
   process.exit(1);
 }
};

module.exports = connectDB; //exportação do módulo para ser usado em outros arquivos

