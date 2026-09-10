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
      background: 'var(--background)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TopBar />

      <div style={{
        flex: 1,
        padding: '20px 16px 110px 16px',
        overflowY: 'auto'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '20px',
          color: 'var(--text-primary)'
        }}>
          Ajustes
        </h2>

        {settingsSections.map((section, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <section.icon size={18} color="var(--coral)" />
              <h3 style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--text-primary)'
              }}>
                {section.title}
              </h3>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 16px',
                    borderBottom: itemIndex < section.items.length - 1 ? '1px solid var(--line-light)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--text-primary)'
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '2px'
                    }}>
                      {item.description}
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-light)" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={signOut}
          className="btn btn-cta"
          style={{ width: '100%', padding: '14px', fontSize: '15px', marginTop: '8px' }}
        >
          <LogOut size={19} />
          Cerrar sesión
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;