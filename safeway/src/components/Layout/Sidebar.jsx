// src/components/Layout/Sidebar.jsx
import React from 'react';
import { X, Home, Map, MessageCircle, AlertTriangle, Settings, User, Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/map', icon: Map, label: 'Mapa' },
    { to: '/community', icon: MessageCircle, label: 'Comunidad' },
    { to: '/reports', icon: AlertTriangle, label: 'Reportes' },
    { to: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease'
          }}
        />
      )}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        background: 'white',
        zIndex: 1000,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        padding: '20px',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#4A6CF7', margin: 0 }}>SafaWay</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f5f7fa', borderRadius: '12px', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4A6CF7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: '600' }}>Usuario</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Ver perfil</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive ? '#4A6CF7' : '#555',
                background: isActive ? '#EEF2FF' : 'transparent',
                fontWeight: isActive ? '600' : '500',
                transition: 'all 0.2s ease'
              })}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', background: '#f0f7ff' }}>
            <Shield size={20} color="#4A6CF7" />
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Nivel de seguridad</div>
              <div style={{ fontWeight: '700', color: '#4A6CF7' }}>78%</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;