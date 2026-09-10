// src/components/Layout/BottomNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, MessageCircle, Settings } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: Map, label: 'Mapa' },
    { to: '/community', icon: MessageCircle, label: 'Comunidad' },
    { to: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <nav className="bottom-dock">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `dock-link${isActive ? ' active' : ''}`}
        >
          {({ isActive }) => {
            const Icon = item.icon;
            return (
              <>
                <Icon strokeWidth={isActive ? 2.4 : 1.8} />
                <span>{item.label}</span>
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;