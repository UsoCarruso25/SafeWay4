// src/components/Map/RouteCalculator.jsx
import React, { useState } from 'react';
import { MapPin, Clock, Shield, ChevronRight } from 'lucide-react';
import './RouteCalculator.css';

const RouteCalculator = ({ onCalculate, onSelectRoute }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination) {
      const mockRoutes = [
        { name: 'Ruta recomendada', time: '12 min', distance: '2.8 km', safety: 'Alta seguridad', color: '#2BD9A6' },
        { name: 'Ruta alternativa', time: '10 min', distance: '2.5 km', safety: 'Precaución', color: '#FFC857' },
        { name: 'Ruta más rápida', time: '9 min', distance: '2.4 km', safety: 'Baja seguridad', color: '#FF5D3A' },
      ];
      setRoutes(mockRoutes);
      if (onCalculate) onCalculate({ origin, destination });
    }
  };

  return (
    <div className="route-calculator">
      <h3 className="route-title">🛣️ Ruta segura a tu destino</h3>

      <form onSubmit={handleSubmit} className="route-form">
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="📍 Origen"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="📍 Destino"
        />
        <button type="submit" className="btn btn-cta">
          Calcular Ruta
        </button>
      </form>

      {routes.length > 0 && (
        <div className="route-results">
          <div className="route-results-label">Rutas disponibles:</div>
          {routes.map((route, index) => (
            <div
              key={index}
              onClick={() => onSelectRoute && onSelectRoute(route)}
              className="route-item"
              style={{ borderColor: route.color }}
            >
              <div>
                <div className="route-name">{route.name}</div>
                <div className="route-meta">
                  <span><Clock size={12} /> {route.time}</span>
                  <span>📍 {route.distance}</span>
                  <span><Shield size={12} /> {route.safety}</span>
                </div>
              </div>
              <ChevronRight size={20} style={{ color: route.color }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteCalculator;