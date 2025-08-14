const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {type: String, required:[true, "Title is required"], minlength: [3, "Title must be at least 3 characters long"]},
    author: {type: String, required:[true, "Author is required"], minlength: [3, "Author must be at least 3 characters long"]},
    year: {type: Number, required:[true, "Year is required"], min: [1000, "Year must be a positive number"], max: [new Date().getFullYear()]},
    genre: {type: String, required:[true, "Genre is required"]},
    createdAt: {type: Date, default: Date.now}
});const Book = mongoose.model('Book', BookSchema);
module.exports = Book;