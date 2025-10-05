const jwt = require('jsonwebtoken');
const users = [
    {email: 'user@example.com', password: '123456'},
    {email: 'user2@example.com', password: '78912'}
]
const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email }, 'secreta', { expiresIn: '1h' });
    //jwt.sign : gera um token JWT assinado para o usuario
    //expiresIn: define o tempo de expiração do token
    res.json({ token, email: user.email });
};
module.exports = { login };