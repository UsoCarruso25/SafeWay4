// src/components/Map/RouteCalculator.jsx
import React, { useState } from 'react';
import { MapPin, Clock, Shield, ChevronRight } from 'lucide-react';

const RouteCalculator = ({ onCalculate, onSelectRoute }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination) {
      // Simular rutas
      const mockRoutes = [
        { name: 'Ruta recomendada', time: '12 min', distance: '2.8 km', safety: 'Alta seguridad', color: '#4CAF50' },
        { name: 'Ruta alternativa', time: '10 min', distance: '2.5 km', safety: 'Precaución', color: '#FFC107' },
        { name: 'Ruta más rápida', time: '9 min', distance: '2.4 km', safety: 'Baja seguridad', color: '#F44336' },
      ];
      setRoutes(mockRoutes);
      if (onCalculate) onCalculate({ origin, destination });
    }
  };

  return (
    <div className="card" style={{ padding: '16px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>🛣️ Ruta segura a tu destino</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="📍 Origen"
          style={{
            padding: '10px 14px',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="📍 Destino"
          style={{
            padding: '10px 14px',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Calcular Ruta
        </button>
      </form>

      {routes.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Rutas disponibles:</div>
          {routes.map((route, index) => (
            <div
              key={index}
              onClick={() => onSelectRoute && onSelectRoute(route)}
              style={{
                padding: '12px',
                border: `2px solid ${route.color}`,
                borderRadius: '8px',
                marginBottom: '8px',
                cursor: 'pointer',
                background: 'white',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{route.name}</div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  <span><Clock size={12} style={{ marginRight: '4px' }} />{route.time}</span>
                  <span>📍 {route.distance}</span>
                  <span><Shield size={12} style={{ marginRight: '4px' }} />{route.safety}</span>
                </div>
              </div>
              <ChevronRight size={20} color={route.color} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteCalculator;