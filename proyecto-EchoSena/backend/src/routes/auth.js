const express = require('express');
const router = express.Router();
const db = require('../config/db');

// RUTA: POST /api/auth/login
router.post('/login', async (req, res) => {
    const { correo, password } = req.body;

    // Validación básica por si llegan vacíos
    if (!correo || !password) {
        return res.status(400).json({ error: 'Por favor, ingresa todos los campos.' });
    }

    try {
        // 1. Buscar al usuario en la base de datos por su correo
        const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        
        // Si no encuentra ninguna fila, el correo no existe
        if (rows.length === 0) {
            return res.status(401).json({ error: 'El correo electrónico no está registrado.' });
        }

        const usuario = rows[0];

        // 2. Verificar la contraseña 
        // (Nota: En la versión final usaremos bcrypt, aquí comparamos directo por ahora)
        if (password !== usuario.password) {
            return res.status(401).json({ error: 'La contraseña es incorrecta.' });
        }

        // 3. Si todo está bien, respondemos con éxito y los datos del usuario
        res.json({
            mensaje: '¡Inicio de sesión exitoso!',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error en el servidor al intentar iniciar sesión.' });
    }
});

module.exports = router;