const express = require('express');
const connectDB = require('./class-2025/month/class10/config');
const app = express();

connectDB();
app.use(express.json());
app.listen(3000, () => console.log('Server is running on port 3000'));

app.get('/read', (req, res) => {
    res.status(200).json(comidas);
    try {
        const numerador = 10
        const denominador = 0;
        /*
        if (denominador === 0) {
            res.status(400).json({ error: 'Divisão por zero não é permitida' });
            return;
        }
        */
        if (denominador === 0) {
            throw new Error('Divisão por zero não é permitida');
        }
        const resultado = numerador / denominador;
        res.json({ message: `Resultado: ${resultado}` });
    } catch (err){
        res.status(400).json({ error: err.message });
    }
});
