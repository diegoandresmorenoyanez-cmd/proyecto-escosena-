import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState([]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('Académico');

  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario')) || { id: null, nombre: 'Invitado', rol: 'Aprendiz' };

  const cargarNoticias = async () => {
    try {
      const respuesta = await fetch('http://localhost:5000/api/noticias');
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setNoticias(datos);
      }
    } catch (error) {
      console.error('Error al traer noticias:', error);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  const handlePublicar = async (e) => {
    e.preventDefault();
    if (!nuevoTitulo || !nuevoContenido) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:5000/api/noticias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: nuevoTitulo,
          contenido: nuevoContenido,
          categoria: nuevaCategoria,
          usuario_id: usuarioLogueado.id
        })
      });

      if (respuesta.ok) {
        cargarNoticias();
        setNuevoTitulo('');
        setNuevoContenido('');
        setNuevaCategoria('Académico');
      } else {
        alert('Error al publicar la noticia.');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  const getColorCategoria = (cat) => {
    switch(cat) {
      case 'Académico': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Bienestar': return { bg: '#dcfce7', color: '#166534' };
      case 'Tecnología': return { bg: '#f3e8ff', color: '#6b21a8' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  const esAdminOInstructor = usuarioLogueado.rol === 'Administrador' || usuarioLogueado.rol === 'Instructor';

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Cabezote (Navbar) con Logos */}
      <header style={{ backgroundColor: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        
        {/* Sección Izquierda: Logos y Nombre */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Logo 1: SENA Verde oficial */}
       {/* Logo 1: SENA Verde oficial (Local corregido) */}
<img 
  src="/sena-logo.jpg" 
  alt="Logo SENA" 
  style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
/>

          {/* Separador visual elegante */}
          <div style={{ width: '1px', height: '35px', backgroundColor: '#e5e7eb' }}></div>

          {/* Logo 2: Tu logotipo personalizado (dictums) */}
          <img 
            src="/logo-echosena.jpeg" 
            alt="echosena" 
            style={{ height: '45px', width: 'auto', objectFit: 'contain', borderRadius: '8px' }}
            onError={(e) => {
              // Si aún no has pegado tu imagen, este código evita que se vea un cuadro roto y muestra un círculo oscuro estético por mientras
              e.target.style.display = 'none';
            }}
          />

          <div>
            <h1 style={{ color: '#1f2937', margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Bienvenido, {usuarioLogueado.nombre}</h1>
            <span style={{ fontSize: '11px', backgroundColor: '#39A900', color: 'white', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {usuarioLogueado.rol}
            </span>
          </div>
        </div>

        {/* Botón Cerrar Sesión */}
        <button 
          onClick={() => { localStorage.removeItem('usuario'); navigate('/'); }} 
          style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}>
          Cerrar Sesión
        </button>
      </header>

      {/* Contenedor Principal */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Formulario / Panel Informativo */}
        {esAdminOInstructor ? (
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderTop: '4px solid #0284c7' }}>
              <h2 style={{ color: '#111827', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>✨ Panel Administrativo: Redactar</h2>
              
              <form onSubmit={handlePublicar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="Título del comunicado" 
                  value={nuevoTitulo}
                  onChange={(e) => setNuevoTitulo(e.target.value)}
                  style={{ padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f9fafb', fontSize: '15px' }}
                />
                
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
        ) : (
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderTop: '4px solid #39A900' }}>
              <h2 style={{ color: '#39A900', marginTop: 0, marginBottom: '10px', fontSize: '20px' }}>📢 Portal de Aprendices</h2>
              <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '14px' }}>
                Bienvenido al canal oficial de difusión informativa del **CGMTI**. Aquí podrás enterarte en tiempo real de los comunicados emitidos por las coordinaciones académicas, bienestar al aprendiz y el área de tecnología.
              </p>
              <p style={{ color: '#6b7280', fontSize: '13px', fontStyle: 'italic' }}>
                Tu cuenta actual tiene permisos de solo lectura.
              </p>
            </div>
          </div>
        )}

        {/* Feed de Noticias */}
        <div style={{ flex: '2', minWidth: '400px' }}>
          <h2 style={{ color: '#374151', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>📰 Publicaciones Recientes</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {noticias.map((noticia) => {
              const badgeColors = getColorCategoria(noticia.categoria);
              return (
                <div key={noticia.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '5px solid #39A900' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>
                      {new Date(noticia.fecha_publicacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span style={{ backgroundColor: badgeColors.bg, color: badgeColors.color, padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
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