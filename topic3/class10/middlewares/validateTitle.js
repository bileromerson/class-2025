const validateTitle = (req, res, next) => {
    const { title, author, year, genre } = req.body;//extraindo os dados
   
   
    if (!title || typeof title !== "string" || title.length < 3) {//validando se o título existe
        //é um string e tem pelo menos 3 caracteres
      return res
        .status(400)//se for inválido o título, responde com um erro 400 e uma mensagem JSON
        .json({
          error: "O título é obrigatório e deve ter pelo menos 3 caracteres.",
        });
    }
    next();
   };

   

   module.exports = validateTitle;
