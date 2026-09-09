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
    <nav style={{
      position: 'fixed',
      bottom: 16,
      left: 16,
      right: 16,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      gap: '36px',
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      padding: '10px 24px 12px 24px',
      borderRadius: '100px',
      border: '0.5px solid rgba(255,255,255,0.08)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      maxWidth: '340px',
      margin: '0 auto'
    }}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: isActive ? '#4A6CF7' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            gap: '2px',
            padding: '4px 0',
            position: 'relative'
          })}
        >
          {({ isActive }) => {
            const Icon = item.icon;
            return (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span style={{ 
                  fontSize: '9px', 
                  fontWeight: isActive ? '600' : '400',
                  letterSpacing: '0.3px',
                  color: isActive ? '#4A6CF7' : 'rgba(255,255,255,0.4)'
                }}>
                  {item.label}
                </span>
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '3px',
                    background: '#4A6CF7',
                    borderRadius: '100px'
                  }} />
                )}
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;