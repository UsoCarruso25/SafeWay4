// src/pages/Settings.jsx
import React from 'react';
import { User, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/Layout/BottomNav';
import TopBar from '../components/Layout/TopBar';
import './Pages.css';

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
    <div className="page-container">
      <TopBar />

      <main className="page-content">
        <h1 className="page-title">⚙️ Ajustes</h1>

        {settingsSections.map((section, index) => (
          <section key={index} className="settings-section">
            <div className="settings-section-header">
              <section.icon size={18} />
              <h3>{section.title}</h3>
            </div>
            <div className="settings-list">
              {section.items.map((item, i) => (
                <div key={i} className="settings-item">
                  <div>
                    <div className="settings-item-label">{item.label}</div>
                    <div className="settings-item-desc">{item.description}</div>
                  </div>
                  <ChevronRight size={18} />
                </div>
              ))}
            </div>
          </section>
        ))}

        <button onClick={signOut} className="btn btn-danger btn-logout">
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;