// src/components/Layout/BottomNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, Settings } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/community', icon: MessageCircle, label: 'Comunidad' },
    { to: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <nav className="bottom-dock">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} className="dock-item">
          {({ isActive }) => {
            const Icon = item.icon;
            return (
              <>
                <div className={`dock-icon-wrap ${isActive ? 'active' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className={`dock-label ${isActive ? 'active' : ''}`}>
                  {item.label}
                </span>
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;