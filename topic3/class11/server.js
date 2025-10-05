const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');
// import um midlewere de autenticação, que sera ultilizado para proteger rotas restringindo o acesso a elas
// apenas para usuarios autenticados

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);

app.get('/api/profile', authMiddleware.tokenValidador, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});