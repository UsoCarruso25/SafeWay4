// src/components/Layout/TopBar.jsx
import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TopBar = () => {
  const { signOut } = useAuth();

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      background: 'rgba(255,255,255,0.98)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.04)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
    }}>
      <div style={{
        fontSize: '20px',
        fontWeight: '800',
        color: '#1a1a2e',
        letterSpacing: '-0.5px'
      }}>
        Safa<span style={{ color: '#4A6CF7' }}>Way</span>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '50%',
          position: 'relative',
          transition: 'background 0.2s'
        }}>
          <Bell size={20} color="#555" />
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: '#FF6B6B',
            color: 'white',
            fontSize: '9px',
            fontWeight: '700',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>3</span>
        </button>
        
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#4A6CF7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            U
          </div>
        </button>
        
        <button
          onClick={signOut}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            transition: 'background 0.2s'
          }}
        >
          <LogOut size={18} color="#FF6B6B" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;