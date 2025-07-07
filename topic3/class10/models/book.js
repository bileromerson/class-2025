const mongodb = require('mongodb');

const BookSchema = new mongodb.Schema({
    title: {type: String},

    author: {type: String},

    publishedDate: {type: Date},

    genre: {type: String},

    createdAt: {type: Date, default: Date.now}
    
});
const Book = mongodb.model('Book', BookSchema);
module.exports = Book;