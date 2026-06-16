📦 Portal Web Informativo - Centro de Gestión de Mercados y TI

👥 Integrantes
* William Estupiñan
* Sebastian Suns
* Mariana Monroy
* Diego Moreno

🎯 Descripción
Un portal web de noticias y comunicados dedicado al Centro de Gestión de Mercados y Tecnología de la Información. Su objetivo principal es brindar apoyo centralizado y difundir la información requerida por instructores, aprendices y personal administrativo del centro de formación.

🧩 Problema
Actualmente, la información importante del centro de formación suele estar dispersa en múltiples canales (correos electrónicos, grupos de mensajería informal, carteleras físicas). Esto genera brechas de comunicación, pérdida de anuncios relevantes y dificulta que la comunidad académica encuentre rápidamente actualizaciones sobre eventos, cronogramas, novedades tecnológicas o directrices institucionales.

💡 Solución
Desarrollar una plataforma web centralizada, ágil y de fácil navegación que consolide todas las noticias y recursos del centro. El portal permitirá clasificar la información por categorías (por ejemplo: Académico, Eventos, Instructores, Aprendices), facilitando la búsqueda de comunicados oficiales y mejorando significativamente la comunicación interna de la comunidad.

⚙️ Tecnologías
* **Frontend:** React, HTML5, CSS3, JavaScript
* **Backend:** Node.js, Express
* **Base de Datos:** MySQL

📁 Estructura del Proyecto
El proyecto está dividido en dos partes principales:
* `/backend`: Servidor de Node.js API REST y conexión a base de datos.
* `/frontend`: Aplicación cliente desarrollada en React.

🚀 Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/](https://github.com/)[usuario]/[repositorio].git
cd [proyecto-escosena]
git clone [https://github.com/](https://github.com/)[usuario]/[repositorio].git

2. Configurar la Base de Datos (MySQL)
Abre tu gestor de MySQL (XAMPP/phpMyAdmin o MySQL Workbench).

Crea una base de datos llamada cgmti.

Ejecuta el siguiente script SQL para crear la estructura de las tablas obligatorias:

SQL
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('Administrador', 'Instructor', 'Aprendiz') DEFAULT 'Aprendiz',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    categoria ENUM('Académico', 'Bienestar', 'Tecnología', 'General') NOT NULL,
    usuario_id INT,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

3. Configurar y arrancar el Backend
Navega a la carpeta del backend:

Bash
cd backend
Instala las dependencias del servidor:

Bash
npm install
Crea un archivo .env en la raíz de la carpeta backend/ con las credenciales de tu MySQL local:

Fragmento de código
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=cgmti
PORT=5000
Inicia el servidor de desarrollo:

Bash
cd src
node index.js
4. Configurar y arrancar el Frontend
Abre una nueva terminal y navega a la carpeta del frontend:

Bash
cd frontend
Instala las dependencias del cliente:

Bash
npm install
Inicia la aplicación de React:

Bash
npm start
La aplicación se abrirá automáticamente en el navegador en la ruta http://localhost:3000.
