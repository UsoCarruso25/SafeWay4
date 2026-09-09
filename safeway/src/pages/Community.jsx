// src/pages/Community.jsx
import React, { useState, useEffect } from 'react';
import CommunityFeed from '../components/Community/CommunityFeed';
import TopBar from '../components/Layout/TopBar';
import BottomNav from '../components/Layout/BottomNav';
import { useAuth } from '../context/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular carga de posts (conecta con tu API después)
  useEffect(() => {
    setTimeout(() => {
      setPosts([]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TopBar />
      
      {/* Encabezado fijo */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'white',
        padding: '16px 16px 12px 16px',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: 0,
              color: '#1a1a2e'
            }}>
              💬 Comunidad
            </h2>
            <p style={{
              fontSize: '13px',
              color: '#999',
              margin: '4px 0 0 0'
            }}>
              {user?.email || 'Usuario'}
            </p>
          </div>
          <button style={{
            padding: '8px 16px',
            background: '#4A6CF7',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            + Nuevo
          </button>
        </div>
      </div>
      
      {/* Contenido scrolleable */}
      <div style={{
        flex: 1,
        padding: '16px 16px 100px 16px',
        overflowY: 'auto'
      }}>
        <CommunityFeed />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Community;