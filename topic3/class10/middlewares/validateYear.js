const validateYear = (req, res, next) => { 
    const { year } = req.body; // Extraindo o ano do corpo da requisição
  
    // Validando se o ano foi fornecido, é um número e está entre 1000 e o ano atual
    const currentYear = new Date().getFullYear();
    if (!year || typeof year !== "number" || year < 1000 || year > currentYear) {
      return res
        .status(400) // Retornando um erro 400 com uma mensagem JSON
        .json({
          error: `O ano de lançamento é obrigatório, deve ser um número e estar entre 1000 e ${currentYear}.`,
        });
    }
  
    next(); // Chamando o próximo middleware se a validação passar
  };
  
  module.exports = validateYear;