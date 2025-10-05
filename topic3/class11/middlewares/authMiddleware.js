const jwt = require("jsonwebtoken"); //0 código começa importando a jsonwebtoken, biblioteca responsável
// por gerar e verificar tokens JWT, utilizados para autenticação de usuários.
const tokenValidation = (req, res, next) => {//Esse middleware será responsável por
// validar tokens em rotas protegidas antes que o seriridor processe a requisição.
const token = req.header("Authorization"); //Extrai o token JNT do cabeçalho da requisição HTTP,
// mais especificamente do campo "Authorization".
if (!token) return res.status(401).json({ error: "Acesso negado" });
//Se o token estiver ausente, o servidor retorna um erro 401 Acesso negado,
// impedindo o acesso à rota protegida, caso o token esteja presente, a função jwt.verify()
// é utilizada para valida-to:
try {
//verified: Essa Linha faz três coisas:
//token.split(" ")[1]: Como os tokens JNT costuman ser enviados no formato "Bearer TOKEN AQUI",
// o código remove a palavra "Bearer" e extrai apenas o token.
//jwt.verify(token, "secreta"): Verifica se o token é válido utilizando a chave secreta "secreta".
//Armazena o resultado na variável verified, que contém os dados do usuário autenticado.
const verified = jwt.verify(token.split(" ")[1], "secreta");
req.user = verified;
//req.user = verified: Se a verificação for bem-sucedida, os dados do usuário são anexados
// ao objeto req. Isso permite que os dados do usuário autenticado sejam acessados nas próximas
// funções da rota.
next();
} catch (error) {
res.status(400).json({ error: "Token inválido" });
}
module.exports = {
tokenValidation,
};