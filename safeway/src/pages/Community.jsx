
// src/pages/Community.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CommunityFeed from '../components/Community/CommunityFeed';
import TopBar from '../components/Layout/TopBar';
import BottomNav from '../components/Layout/BottomNav';
import { useAuth } from '../context/AuthContext';

// TODO: reemplazar por los grupos reales del usuario (uno por localidad/barrio)
const GROUPS = ['Patio Bonito', 'Corabastos', 'Timiza'];

const Community = () => {
  const { user } = useAuth();
  const [activeGroup, setActiveGroup] = useState(GROUPS[0]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TopBar />

      {/* Encabezado de la página + grupos por barrio */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--background)',
        padding: '18px 16px 10px 16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '19px',
              fontWeight: '700',
              margin: 0,
              color: 'var(--text-primary)'
            }}>
              Comunidad
            </h2>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              margin: '2px 0 0 0'
            }}>
              {user?.email || 'Usuario'}
            </p>
          </div>
          <button className="btn btn-cta" style={{ padding: '9px 16px', fontSize: 12 }}>
            <Plus size={14} strokeWidth={2.6} />
            Publicar
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: 2 }}>
          {GROUPS.map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`chip chip-outline${group === activeGroup ? ' active' : ''}`}
              style={{ flexShrink: 0, border: 'none', cursor: 'pointer' }}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div style={{
        flex: 1,
        padding: '4px 16px 110px 16px',
        overflowY: 'auto'
      }}>
        <CommunityFeed />
      </div>

      <BottomNav />
    </div>
  );
};

export default Community;