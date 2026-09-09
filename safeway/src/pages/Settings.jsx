// src/pages/Settings.jsx
import React from 'react';
import { User, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/Layout/BottomNav';
import TopBar from '../components/Layout/TopBar';

const Settings = () => {
  const { signOut, user } = useAuth();

  const settingsSections = [
    {
      title: 'Perfil',
      icon: User,
      items: [
        { label: 'Editar perfil', description: user?.email || 'usuario@email.com' },
        { label: 'Cambiar contraseña', description: 'Actualizar tu contraseña' }
      ]
    },
    {
      title: 'Notificaciones',
      icon: Bell,
      items: [
        { label: 'Alertas de seguridad', description: 'Notificaciones de zonas de riesgo' },
        { label: 'Actividad en comunidad', description: 'Comentarios y likes' }
      ]
    },
    {
      title: 'Seguridad',
      icon: Shield,
      items: [
        { label: 'Zonas de riesgo', description: 'Ver áreas con reportes' },
        { label: 'Rutas seguras', description: 'Preferencias de rutas' }
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TopBar />
      
      <div style={{
        flex: 1,
        padding: '20px 16px 100px 16px',
        overflowY: 'auto'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '700',
          marginBottom: '20px',
          color: '#1a1a2e'
        }}>
          ⚙️ Ajustes
        </h2>
        
        {settingsSections.map((section, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <section.icon size={18} color="#4A6CF7" />
              <h3 style={{ 
                margin: 0, 
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                {section.title}
              </h3>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 16px',
                    borderBottom: itemIndex < section.items.length - 1 ? '1px solid #f5f5f5' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <div>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: '#333'
                    }}>
                      {item.label}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#999',
                      marginTop: '2px'
                    }}>
                      {item.description}
                    </div>
                  </div>
                  <ChevronRight size={18} color="#ccc" />
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <button
          onClick={signOut}
          style={{
            width: '100%',
            padding: '14px',
            background: '#F44336',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '8px',
            transition: 'opacity 0.2s'
          }}
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Settings;