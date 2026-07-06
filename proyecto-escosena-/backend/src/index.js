const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const noticiasRoutes = require('./routes/noticias'); // 1. Importar rutas de noticias

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// Rutas de la Aplicación
app.use('/api/auth', authRoutes); 
app.use('/api/noticias', noticiasRoutes); // 2. Conectar la ruta de noticias

app.get('/', (req, res) => {
    res.send('Servidor del CGMTI corriendo perfectamente.');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend escuchando en el puerto ${PORT}`);
});