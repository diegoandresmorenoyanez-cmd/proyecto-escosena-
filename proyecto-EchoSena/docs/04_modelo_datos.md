MODELO DE DATOS - PORTAL CGMTI

1. Entidades Principales:
   - Usuarios: Almacena la información de los miembros (aprendices/administradores).
   - Noticias: Contiene el contenido, títulos y fechas de las publicaciones.
   - Comentarios: Registra la interacción de los usuarios sobre las noticias.

2. Relaciones (Cardinalidad):
   - Un Usuario (Administrador) publica 1 a muchas Noticias (1:N).
   - Una Noticia recibe 0 a muchos Comentarios (1:N).
   - Un Usuario escribe 0 a muchos Comentarios (1:N).

   

3. Normalización:
   El modelo cumple con la Tercera Forma Normal (3FN):
   - 1FN: Todos los atributos son atómicos (no hay listas en una sola celda).
   - 2FN: No hay dependencias parciales; todos los campos dependen de la llave primaria de la tabla.
   - 3FN: No hay dependencias transitivas (ningún dato depende de otro que no sea la llave primaria).

4. Integridad Referencial:
   Se han implementado llaves foráneas (FK) con la opción 'ON DELETE CASCADE', garantizando que si se elimina una noticia, se eliminen automáticamente los comentarios asociados, manteniendo la coherencia de la base de datos.