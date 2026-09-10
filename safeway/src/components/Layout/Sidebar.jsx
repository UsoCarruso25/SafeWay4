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
      {isOpen && <div onClick={onClose} className="sidebar-overlay" />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <header className="sidebar-header">
          <h2 className="sidebar-brand">
            Safa<span>Way</span>
          </h2>
          <button onClick={onClose} className="sidebar-close">
            <X size={22} />
          </button>
        </header>

        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            <User size={20} />
          </div>
          <div>
            <div className="sidebar-name">Usuario</div>
            <div className="sidebar-sub">Ver perfil</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-score">
            <Shield size={20} />
            <div>
              <div className="sidebar-sub">Nivel de seguridad</div>
              <div className="sidebar-score-value">78%</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;