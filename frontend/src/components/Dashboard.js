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
      case 'Académico': return { bg: '#e0effa', color: '#2b6cb0' };
      case 'Bienestar': return { bg: '#e6f4ea', color: '#276749' };
      case 'Tecnología': return { bg: '#faf0f5', color: '#b83280' };
      default: return { bg: '#f7fafc', color: '#4a5568' };
    }
  };

  const esAdminOInstructor = usuarioLogueado.rol === 'Administrador' || usuarioLogueado.rol === 'Instructor';

  return (
    <div style={{ backgroundColor: '#f5f7f4', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", color: '#2d3748', paddingBottom: '60px' }}>
      
      {/* 1. Navbar Estilizado (Esquinas redondeadas inferiores y contenedor flotante) */}
      <div style={{ padding: '20px 30px 0 30px' }}>
        <header style={{ 
          backgroundColor: '#ffffff', 
          padding: '15px 35px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(149, 157, 165, 0.06)'
        }}>
          
          {/* Sección Izquierda: Identidad Visual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <img 
              src="/sena-logo.jpg" 
              alt="Logo SENA" 
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ width: '1px', height: '28px', backgroundColor: '#e2e8f0' }}></div>
            <img 
              src="/logo-echosena.jpeg" 
              alt="Logo Personal" 
              style={{ height: '42px', width: 'auto', objectFit: 'contain', borderRadius: '10px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div style={{ marginLeft: '10px' }}>
              <span style={{ fontSize: '13px', color: '#718096', display: 'block', fontWeight: '500' }}>Portal Informativo</span>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#397d54' }}>CGMTI</span>
            </div>
          </div>

          {/* Sección Derecha: Usuario y Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '15px', fontWeight: '600', color: '#2d3748', display: 'block' }}>{usuarioLogueado.nombre}</span>
              <span style={{ fontSize: '11px', color: '#397d54', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{usuarioLogueado.rol}</span>
            </div>
            <button 
              onClick={() => { localStorage.removeItem('usuario'); navigate('/'); }} 
              style={{ backgroundColor: '#f7fafc', color: '#e53e3e', border: '1px solid #edf2f7', padding: '10px 20px', borderRadius: '14px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: '0.2s' }}>
              Salir
            </button>
          </div>
        </header>
      </div>

      {/* 2. Banner Principal de Bienvenida (Inspirado en la cabecera de naturaleza/eco de tu imagen) */}
      <div style={{ padding: '25px 30px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #397d54 0%, #2a5c3e 100%)', 
          borderRadius: '32px', 
          padding: '60px 50px', 
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(57, 125, 84, 0.15)'
        }}>
          {/* Detalles orgánicos sutiles de fondo simulando la estética limpia */}
          <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }}></div>
          
          <div style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
            <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '6px 14px', borderRadius: '30px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px', display: 'inline-block', marginBottom: '15px' }}>
              Centro de Gestión de Mercados, Logística y TI
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 15px 0', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
              Encuentra los Comunicados y Novedades Fácilmente
            </h2>
            <p style={{ color: '#e1efe6', fontSize: '16px', lineHeight: '1.5', margin: 0, fontWeight: '400' }}>
              Canal oficial de difusión de la tecnología, la academia y el bienestar del aprendiz del CGMTI.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Contenedor de Contenido (Dashboard Split Layout) */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 30px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Lado Izquierdo: Gestión/Panel (Estilo tarjeta "Welcome on Treopps") */}
        <section style={{ flex: '1', minWidth: '340px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '24px', boxShadow: '0 8px 24px rgba(149, 157, 165, 0.04)', position: 'sticky', top: '30px' }}>
            
            {esAdminOInstructor ? (
              <>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: 0, marginBottom: '8px' }}>Redactar Comunicado</h3>
                <p style={{ fontSize: '14px', color: '#718096', marginBottom: '25px' }}>Completa los campos para distribuir una nueva publicación en el centro informático.</p>
                
                <form onSubmit={handlePublicar} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '6px' }}>Título del Anuncio</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Nuevos horarios de conectividad" 
                      value={nuevoTitulo}
                      onChange={(e) => setNuevoTitulo(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', transition: '0.2s', backgroundColor: '#fcfdfc' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '6px' }}>Área / Categoría</label>
                    <select 
                      value={nuevaCategoria}
                      onChange={(e) => setNuevaCategoria(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', cursor: 'pointer', backgroundColor: '#fcfdfc' }}
                    >
                      <option value="Académico">📚 Académico</option>
                      <option value="Bienestar">🏃‍♂️ Bienestar</option>
                      <option value="Tecnología">💻 Tecnología</option>
                      <option value="General">📢 General</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '6px' }}>Cuerpo del Mensaje</label>
                    <textarea 
                      placeholder="Escribe el desarrollo de la noticia de forma detallada..." 
                      rows="5"
                      value={nuevoContenido}
                      onChange={(e) => setNuevoContenido(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit', backgroundColor: '#fcfdfc' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    style={{ backgroundColor: '#397d54', color: '#ffffff', padding: '14px', border: 'none', borderRadius: '14px', cursor: 'pointer', fontWeight: '600', fontSize: '15px', marginTop: '10px', boxShadow: '0 4px 12px rgba(57, 125, 84, 0.2)', transition: '0.2s' }}>
                    Publicar en Cartelera
                  </button>
                </form>
              </>
            ) : (
              <>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', backgroundColor: '#e6f4ea', borderRadius: '16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '22px' }}>📢</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginTop: 0, marginBottom: '10px' }}>Canal Informativo</h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '14px', margin: '0 0 15px 0' }}>
                  Bienvenido al entorno de consultas del centro. Aquí visualizas los anuncios institucionales validados por instructores y directivas.
                </p>
                <div style={{ backgroundColor: '#f7fafc', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid #397d54', fontSize: '13px', color: '#718096', fontWeight: '500' }}>
                  Modo de cuenta: Consulta General (Lectura)
                </div>
              </>
            )}

          </div>
        </section>

        {/* Lado Derecho: Listado de Anuncios (Estilo Grid de 3 tarjetas como abajo en tu imagen) */}
        <section style={{ flex: '2', minWidth: '450px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2d3748', margin: 0 }}>
              Anuncios Recientes <span style={{ color: '#718096', fontSize: '14px', fontWeight: '500' }}>({noticias.length})</span>
            </h3>
          </div>
          
          {/* Grid de Noticias */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {noticias.map((noticia) => {
              const badge = getColorCategoria(noticia.categoria);
              return (
                <div 
                  key={noticia.id} 
                  style={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '20px', 
                    padding: '24px', 
                    boxShadow: '0 8px 24px rgba(149, 157, 165, 0.03)',
                    border: '1px solid #edf2f7',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s'
                  }}
                >
                  <div>
                    {/* Header de Tarjeta */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <span style={{ fontSize: '12px', color: '#a0aec0', fontWeight: '600' }}>
                        {new Date(noticia.fecha_publicacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </span>
                      <span style={{ backgroundColor: badge.bg, color: badge.color, padding: '4px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                        {noticia.categoria}
                      </span>
                    </div>
                    
                    {/* Título e Información */}
                    <h4 style={{ margin: '0 0 10px 0', color: '#1a202c', fontSize: '18px', fontWeight: '700', lineHeight: '1.3' }}>
                      {noticia.titulo}
                    </h4>
                    <p style={{ margin: '0 0 20px 0', color: '#4a5568', fontSize: '14px', lineHeight: '1.5' }}>
                      {noticia.contenido}
                    </p>
                  </div>

                  {/* Footer de Tarjeta (Detalle de Autor simulando el botón verde de la imagen) */}
                  <div style={{ borderTop: '1px solid #f7fafc', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#718096', fontWeight: '500' }}>Publicado Autorizado</span>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#397d54' }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estado vacío */}
          {noticias.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 40px', backgroundColor: '#ffffff', borderRadius: '24px', color: '#a0aec0', border: '1px dashed #e2e8f0' }}>
              <span style={{ fontSize: '30px', display: 'block', marginBottom: '10px' }}>📭</span>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '500' }}>No hay comunicados publicados en cartelera todavía.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default Dashboard;