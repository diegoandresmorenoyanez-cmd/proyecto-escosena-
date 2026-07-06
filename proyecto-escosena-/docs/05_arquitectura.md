Arquitectura del Sistema:
El portal se basa en una arquitectura de tres capas:
1. Capa de Presentación: Interfaz desarrollada con HTML5, CSS y JavaScript para la interacción del usuario.
2. Capa de Lógica (Backend): Desarrollada en Python, gestionando las peticiones y las reglas de negocio (sesiones, permisos).
3. Capa de Datos: Sistema de gestión de base de datos MySQL para el almacenamiento persistente de usuarios, noticias y comentarios.
Conectividad: Se utiliza un conector estándar (como mysql-connector-python) para la interacción entre el backend y la base de datos.