
 const comidas = [
    {id:1, name: 'Pizza', price: 10.99},
    {id:2, name: 'Burger', price: 8.99},
    {id:3, name: 'noodle', price: 12.99},
    {id:4, name: 'Salad', price: 7.99},
];


const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000, () => console.log('Server is running on port 3000'));

app.get('/read', (req, res) => {
    res.status(200).json(movies);
});
