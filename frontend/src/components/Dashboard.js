import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  // Se añade la categoría a las noticias de prueba
  const [noticias, setNoticias] = useState([
    { 
      id: 1, 
      titulo: 'Apertura de inscripciones Fase II', 
      contenido: 'Se informa a toda la comunidad que las inscripciones para los cursos complementarios de tecnología ya están disponibles en el portal.', 
      fecha: '13 de Junio, 2026',
      categoria: 'Académico'
    }
  ]);
  
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoContenido, setNuevoContenido] = useState('');
  // Nuevo estado para la categoría, por defecto en "Académico"
  const [nuevaCategoria, setNuevaCategoria] = useState('Académico');

  const handlePublicar = (e) => {
    e.preventDefault();
    if(nuevoTitulo && nuevoContenido) {
      const nuevaNoticia = {
        id: noticias.length + 1,
        titulo: nuevoTitulo,
        contenido: nuevoContenido,
        fecha: 'Justo ahora',
        categoria: nuevaCategoria // Guardamos la categoría elegida
      };
      setNoticias([nuevaNoticia, ...noticias]);
      // Limpiamos los campos después de publicar
      setNuevoTitulo('');
      setNuevoContenido('');
      setNuevaCategoria('Académico'); 
    }
  };

  // Función para darle un color distinto a la etiqueta según la categoría
  const getColorCategoria = (cat) => {
    switch(cat) {
      case 'Académico': return { bg: '#dbeafe', color: '#1e40af' }; // Azulito
      case 'Bienestar': return { bg: '#dcfce7', color: '#166534' }; // Verdecito
      case 'Tecnología': return { bg: '#f3e8ff', color: '#6b21a8' }; // Moradito
      default: return { bg: '#f3f4f6', color: '#374151' }; // Gris para General
    }
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Cabezote (Navbar) */}
      <header style={{ backgroundColor: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#39A900', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>S</div>
          <h1 style={{ color: '#1f2937', margin: 0, fontSize: '22px' }}>Panel de Noticias CGMTI</h1>
        </div>
        <button 
          onClick={() => navigate('/')} 
          style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}>
          Cerrar Sesión
        </button>
      </header>

      {/* Contenedor Principal */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Columna Izquierda: Formulario */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#111827', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>✨ Redactar Comunicado</h2>
            
            <form onSubmit={handlePublicar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Título del comunicado" 
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                style={{ padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f9fafb', fontSize: '15px' }}
              />
              
              {/* Nuevo: Menú desplegable para las Categorías */}
              <select 
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value)}
                style={{ padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f9fafb', fontSize: '15px', cursor: 'pointer' }}
              >
                <option value="Académico">📚 Académico</option>
                <option value="Bienestar">🏃‍♂️ Bienestar</option>
                <option value="Tecnología">💻 Tecnología</option>
                <option value="General">📢 General</option>
              </select>

              <textarea 
                placeholder="Desarrolla la información aquí..." 
                rows="6"
                value={nuevoContenido}
                onChange={(e) => setNuevoContenido(e.target.value)}
                style={{ padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f9fafb', fontSize: '15px', resize: 'vertical' }}
              />
              <button 
                type="submit" 
                style={{ backgroundColor: '#0284c7', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', marginTop: '10px' }}>
                Publicar Ahora
              </button>
            </form>
          </div>
        </div>

        {/* Columna Derecha: Feed de Noticias */}
        <div style={{ flex: '2', minWidth: '400px' }}>
          <h2 style={{ color: '#374151', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>📰 Publicaciones Recientes</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {noticias.map((noticia) => {
              // Obtenemos los colores para la categoría actual
              const badgeColors = getColorCategoria(noticia.categoria);
              return (
                <div key={noticia.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #39A900', position: 'relative' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{noticia.fecha}</span>
                    
                    {/* Nuevo: Etiqueta de color dinámica */}
                    <span style={{ 
                      backgroundColor: badgeColors.bg, 
                      color: badgeColors.color, 
                      padding: '5px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: 'bold' 
                    }}>
                      {noticia.categoria}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '22px' }}>{noticia.titulo}</h3>
                  <p style={{ margin: '0', color: '#4b5563', lineHeight: '1.6' }}>{noticia.contenido}</p>
                </div>
              );
            })}
            
            {noticias.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                <p>No hay comunicados publicados aún.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;