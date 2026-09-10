// src/components/Layout/TopBar.jsx
import React from 'react';
import { Bell, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TopBar = () => {
  const { signOut, user } = useAuth();
  const initial = user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div
      style={{
        position: 'sticky',
        top: 16,
        marginLeft: 16,
        marginRight: 16,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px 8px 16px',
        background: 'rgba(27, 34, 44, 0.9)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(16,21,28,0.18)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            background: 'var(--coral)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ShieldCheck size={13} color="white" strokeWidth={2.4} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text-on-dark)',
            letterSpacing: '-0.2px',
          }}
        >
          Safa<span style={{ color: 'var(--amber)' }}>Way</span>
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 100,
          padding: 4,
        }}
      >
        <button
          style={{
            position: 'relative',
            width: 34,
            height: 34,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell size={17} color="var(--text-on-dark)" />
          <span
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              background: 'var(--coral)',
              color: 'white',
              fontSize: 9,
              fontWeight: 700,
              width: 16,
              height: 16,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid var(--ink-2)',
            }}
          >
            3
          </span>
        </button>

        <button
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            border: 'none',
            background: 'var(--ink)',
            color: 'var(--amber)',
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {initial}
        </button>

        <button
          onClick={signOut}
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LogOut size={16} color="var(--coral)" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;