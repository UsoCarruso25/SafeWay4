// src/TestSupabaseConnection.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from './api/supabaseClient';
import { supabaseAPI } from './api/supabaseAPI';

const TestSupabaseConnection = () => {
  const [status, setStatus] = useState('🔄 Probando conexión...');
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    testAll();
  }, []);

  const testAll = async () => {
    const results = [];
    
    // 1. Probar conexión básica
    try {
      const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
      if (error) throw error;
      results.push('✅ Conexión a Supabase exitosa');
      setStatus('✅ Conectado a Supabase');
    } catch (err) {
      results.push(`❌ Error de conexión: ${err.message}`);
      setStatus('❌ Error de conexión');
      setError(err.message);
    }

    // 2. Probar autenticación
    try {
      const user = await supabaseAPI.getCurrentUser();
      if (user) {
        results.push(`✅ Usuario autenticado: ${user.email}`);
        setUser(user);
        
        // Obtener perfil
        const profile = await supabaseAPI.getProfile(user.id);
        if (profile) {
          results.push(`✅ Perfil encontrado: ${profile.username}`);
        }
      } else {
        results.push('ℹ️ No hay usuario autenticado (esto es normal si no has iniciado sesión)');
      }
    } catch (err) {
      results.push(`ℹ️ Autenticación: ${err.message}`);
    }

    // 3. Probar obtener reportes (función RPC)
    try {
      const reports = await supabaseAPI.getNearbyReports(-34.6037, -58.3816, 5);
      results.push(`✅ Reportes cercanos: ${reports.length} encontrados`);
    } catch (err) {
      results.push(`ℹ️ Reportes: ${err.message}`);
    }

    // 4. Probar obtener posts
    try {
      const posts = await supabaseAPI.getCommunityPosts(5);
      results.push(`✅ Posts de comunidad: ${posts.length} encontrados`);
    } catch (err) {
      results.push(`ℹ️ Posts: ${err.message}`);
    }

    setDetails(results);
  };

  // Función para probar registro
  const testSignUp = async () => {
    try {
      const email = `test${Date.now()}@test.com`;
      const password = 'Test123456!';
      const username = `usuario${Date.now().toString().slice(-6)}`;
      
      const result = await supabaseAPI.signUp(email, password, username);
      setDetails(prev => [...prev, `✅ Usuario creado: ${email}`]);
      alert(`Usuario creado exitosamente:\nEmail: ${email}\nPassword: ${password}`);
    } catch (err) {
      setDetails(prev => [...prev, `❌ Error creando usuario: ${err.message}`]);
    }
  };

  // Función para probar login
  const testSignIn = async () => {
    const email = prompt('Email:');
    const password = prompt('Password:');
    if (!email || !password) return;
    
    try {
      const result = await supabaseAPI.signIn(email, password);
      setDetails(prev => [...prev, `✅ Login exitoso: ${result.user.email}`]);
      setUser(result.user);
    } catch (err) {
      setDetails(prev => [...prev, `❌ Error en login: ${err.message}`]);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🔌 Conexión a Supabase
      </h1>
      
      <div style={{
        padding: '15px',
        borderRadius: '8px',
        background: status.includes('✅') ? '#e8f5e9' : status.includes('❌') ? '#ffebee' : '#fff3e0',
        border: `1px solid ${status.includes('✅') ? '#4caf50' : status.includes('❌') ? '#f44336' : '#ff9800'}`,
        marginBottom: '20px'
      }}>
        <strong style={{ fontSize: '18px' }}>{status}</strong>
        {error && (
          <div style={{ marginTop: '10px', color: '#c62828', fontSize: '14px' }}>
            Error: {error}
          </div>
        )}
      </div>

      {user && (
        <div style={{
          padding: '15px',
          borderRadius: '8px',
          background: '#e3f2fd',
          border: '1px solid #2196f3',
          marginBottom: '20px'
        }}>
          <strong>👤 Usuario activo:</strong> {user.email}
        </div>
      )}

      <div style={{
        background: '#f5f5f5',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>📊 Detalles de la conexión</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {details.map((detail, index) => (
            <li key={index} style={{
              padding: '8px 0',
              borderBottom: index < details.length - 1 ? '1px solid #e0e0e0' : 'none',
              fontSize: '14px'
            }}>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={testSignUp}
          style={{
            padding: '12px 24px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🆕 Probar Registro
        </button>
        
        <button
          onClick={testSignIn}
          style={{
            padding: '12px 24px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔑 Probar Login
        </button>
        
        <button
          onClick={testAll}
          style={{
            padding: '12px 24px',
            background: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔄 Re-probar
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'No configurada'}</p>
        <p><strong>Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ No configurada'}</p>
      </div>
    </div>
  );
};

export default TestSupabaseConnection;