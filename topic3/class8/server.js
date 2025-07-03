/*
- rotas (CRUD)
/create: cria
/read: le
/update: atualiza
/delete: remove
Metodos HTTP
- metodos HTTP
POST: adicionar
GET: listar
PATCH: atualizar
DELETE: deletar

API (interface de programação de aplicações) é um conjunto de regras que permite que diferentes sistemas se comuniquem entre si.
*/

// let movies = [
//     { id: 1, title: "Inception", genre: "Sci-Fi" },
//     { id: 2, title: "Mr.Robot", genre: "Action" },
// ]

 const comidas = [
    {id:1, name: 'Pizza', price: 10.99},
    {id:2, name: 'Burger', price: 8.99},
    {id:3, name: 'noodle', price: 12.99},
    {id:4, name: 'Salad', price: 7.99},
    {id:5, name: 'pancakes', price: 2.99},
];
// codico!!! --------------------------------

// movies.push({ id: 3, title: "The Matrix", genre: "Sci-Fi" });
// movies.push({ id: 4, title: "ready player one", genre: "Sci-Fi" });
// movies.push({ id: 5, title: "lord of the rings", genre: "fantasy" });
// console.log(movies);

// let findMovie = () => {
//     let movie = movies.find((movie) => movie.id === 1);
//     if (movie) {
//         return movie;
//     } else {
//         return "Movie not found";
//     }
// }
// let movieToUpdate = movies.find(movie => movie.id === 1);
// if (movieToUpdate) {
//     movieToUpdate.title = "Inception";
//     console.log(`filme atualizado ${movieToUpdate.title}, id: ${movieToUpdate.id}`);
// }

// let movieToUpdate2 = movies.find(movie => movie.id === 9);
// if (movieToUpdate2) {
//     console.log(`filme deletado ${movieToUpdate2.title}, id: ${movieToUpdate2.id}`);
// }

// let index = movies.findIndex(movie => movie.id === 2);
// if (index !== -1) {
//     movies.splice(index, 1);
//     console.log('filme removido')
// }

// function listMovieTitles() {
//     movies.forEach(movie => {
//         console.log(movie.title);
//     });
// }

// function updateMovieYear() {
//     let movie = movies.find(movie => movie.id === 3);
//     if (movie) {
//         movie.year = 1989;
//         console.log(`Filme atualizado: ${movie.title}, Ano: ${movie.year}`);
//     } else {
//         console.log("Filme não encontrado");
//     }
// }




// function listMoviesByGenre(genre) {
//     movies.forEach(movie => {
//         if (movie.genre === genre) {
//             console.log('movie by gender = ',movie.title);
//         }
//     });
// }

// listMovieTitles();
// updateMovieYear();
// listMoviesByGenre('Action');

const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000, () => console.log('Server is running on port 3000'));

app.get('/read', (req, res) => {
    res.status(200).json(comidas);
});