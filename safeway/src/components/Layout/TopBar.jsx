// src/components/Layout/TopBar.jsx
import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TopBar = () => {
  const { signOut } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-brand">
        Safa<span>Way</span>
      </div>

      <div className="topbar-actions">
        <button className="topbar-btn" aria-label="Notificaciones">
          <Bell size={20} />
          <span className="topbar-badge">3</span>
        </button>

        <button className="topbar-avatar" aria-label="Perfil">
          U
        </button>

        <button
          onClick={signOut}
          className="topbar-btn topbar-logout"
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;