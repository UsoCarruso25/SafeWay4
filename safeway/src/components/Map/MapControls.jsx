// src/components/Map/MapControls.jsx
import React from 'react';
import { Plus, Minus, Locate, Layers } from 'lucide-react';

const MapControls = ({ onZoomIn, onZoomOut, onLocate, onLayerToggle }) => {
  return (
    <div style={{
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: 10
    }}>
      <button onClick={onZoomIn} style={{
        width: '40px',
        height: '40px',
        background: 'white',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}>
        <Plus size={20} />
      </button>
      <button onClick={onZoomOut} style={{
        width: '40px',
        height: '40px',
        background: 'white',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}>
        <Minus size={20} />
      </button>
      <button onClick={onLocate} style={{
        width: '40px',
        height: '40px',
        background: 'white',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}>
        <Locate size={20} />
      </button>
      <button onClick={onLayerToggle} style={{
        width: '40px',
        height: '40px',
        background: 'white',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}>
        <Layers size={20} />
      </button>
    </div>
  );
};

export default MapControls;