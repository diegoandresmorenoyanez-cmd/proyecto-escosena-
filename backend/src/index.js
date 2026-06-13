const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); 
const authRoutes = require('./routes/auth'); // Importamos la ruta de login

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Habilita la comunicación con el frontend
app.use(express.json()); // Permite al servidor leer formato JSON en los formularios

// Conectar las rutas del proyecto
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
    res.send('Servidor del CGMTI corriendo perfectamente.');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend escuchando en el puerto ${PORT}`);
});