const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. RUTA: POST /api/noticias (Para guardar una noticia nueva)
router.post('/', async (req, res) => {
    const { titulo, contenido, categoria, usuario_id } = req.body;

    // Validación de campos obligatorios
    if (!titulo || !contenido || !categoria) {
        return res.status(400).json({ error: 'El título, contenido y categoría son obligatorios.' });
    }

    try {
        // Insertar en la base de datos de XAMPP
        const [result] = await db.query(
            'INSERT INTO noticias (titulo, contenido, categoria, usuario_id) VALUES (?, ?, ?, ?)',
            [titulo, contenido, categoria, usuario_id || null]
        );

        res.json({
            mensaje: '¡Noticia publicada y guardada en MySQL con éxito!',
            noticia: {
                id: result.insertId,
                titulo,
                contenido,
                categoria,
                usuario_id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la noticia en el servidor.' });
    }
});

// 2. RUTA: GET /api/noticias (Para traer todas las noticias de la BD al cargar la página)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM noticias ORDER BY fecha_publicacion DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las noticias de la base de datos.' });
    }
});

module.exports = router;