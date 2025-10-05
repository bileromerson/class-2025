const express = require('express');

const router = express.Router(); // A constante router cria um rotador de rotas separadamente
const authController = require('../controllers/authController');
router.post('/login', authController.login);// Define uma rota POST na url /login
module.exports = router; 