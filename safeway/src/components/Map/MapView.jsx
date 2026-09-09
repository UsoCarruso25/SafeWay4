// src/components/Map/MapView.jsx
import React, { useRef, useEffect, useState } from 'react';

const MapView = ({ 
  markers = [], 
  center = { lat: -34.6037, lng: -58.3816 }, 
  zoom = 13,
  onMapClick,
  viewMode = 'normal'
}) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulamos carga del mapa (reemplazar con MapLibre después)
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '400px',
      background: '#e8ecf1',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {!mapLoaded ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #4A6CF7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#666' }}>Cargando mapa...</p>
        </div>
      ) : (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#dde1e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#666',
            padding: '20px'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>🗺️ Mapa Interactivo</p>
            <p style={{ fontSize: '14px' }}>Centro: {center.lat}, {center.lng}</p>
            <p style={{ fontSize: '12px', color: '#999' }}>Zoom: {zoom}</p>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>Modo: {viewMode}</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {markers.map((m, i) => (
                <span key={i} style={{ background: '#4A6CF7', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
                  📍 {m.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MapView;