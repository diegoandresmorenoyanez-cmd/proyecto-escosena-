import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  // Estado para mostrar mensajes de error si los datos están mal
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Limpiar errores anteriores

    // Validación básica en el cliente
    if (correo === '' || password === '') {
      setErrorMsg('Por favor, ingresa todos los campos.');
      return;
    }

    try {
      // HACEMOS LA PETICIÓN REAL AL BACKEND
      const respuesta = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, password })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        // ¡Éxito! Guardamos los datos del usuario en el navegador (nombre, rol, etc.)
        localStorage.setItem('usuario', JSON.stringify(datos.usuario));
        // Redirigimos a la página principal
        navigate('/dashboard');
      } else {
        // Si el backend responde con un error (401, 400, etc.), lo mostramos
        setErrorMsg(datos.error || 'Error al iniciar sesión');
      }

    } catch (error) {
      console.error('Error en la conexión:', error);
      setErrorMsg('No se pudo conectar con el servidor. ¿Encendiste el backend?');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '50px 40px', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
        width: '100%', 
        maxWidth: '400px',
        borderTop: '5px solid #39A900'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#39A900', margin: '0 0 10px 0', fontSize: '28px' }}>CGMTI Informa</h2>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>Portal exclusivo para la comunidad SENA</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Si hay un error, lo pintamos en una caja roja muy estética */}
          {errorMsg && (
            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px 15px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', border: '1px solid #fca5a5' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: '#4b5563', fontWeight: '600' }}>Correo Institucional</label>
            <input 
              type="email" 
              placeholder="ejemplo@soy.sena.edu.co" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f9fafb' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: '#4b5563', fontWeight: '600' }}>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f9fafb' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#39A900', 
              color: 'white', 
              padding: '14px', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              fontSize: '15px',
              marginTop: '10px',
              boxShadow: '0 4px 6px rgba(57, 169, 0, 0.2)'
            }}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;