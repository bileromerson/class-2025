
console.log('ola, alunos do curso Node.js!');
const http = require('http');

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('resposta enviada com sucesso!');
// });

const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Bem Vindo va para /amigos ou /perfil em http://localhost:3000/');
    } else if (req.url === '/amigos'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('aqui esta a lista de amigos');
    }
    else if (req.url === '/perfil'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('aqui esta o seu perfil');

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Página não encontrada');
    }
});

server.listen(3000,() => {
    console.log('servidor rodando na porta 3000');
});

