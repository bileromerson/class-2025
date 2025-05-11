
let movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi" },
    { id: 2, title: "Mr.Robot", genre: "Action" },
]
movies.push({ id: 3, title: "The Matrix", genre: "Sci-Fi" });
movies.push({ id: 4, title: "ready player one", genre: "Sci-Fi" });
movies.push({ id: 5, title: "lord of the rings", genre: "fantasy" });
console.log(movies);

let findMovie = () => {
    let movie = movies.find((movie) => movie.id === 1);
    if (movie) {
        return movie;
    } else {
        return "Movie not found";
    }
}
let movieToUpdate = movies.find(movie => movie.id === 1);
if (movieToUpdate) {
    movieToUpdate.title = "Inception";
    console.log(`filme atualizado ${movieToUpdate.title}, id: ${movieToUpdate.id}`);
}

let movieToUpdate2 = movies.find(movie => movie.id === 9);
if (movieToUpdate2) {
    console.log(`filme deletado ${movieToUpdate2.title}, id: ${movieToUpdate2.id}`);
}