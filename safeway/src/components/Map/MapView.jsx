// src/components/Map/MapView.jsx
import React, { useRef, useEffect, useState } from 'react';
import './MapView.css';

const MapView = ({
  markers = [],
  center = { lat: -34.6037, lng: -58.3816 },
  zoom = 13,
  onMapClick,
  viewMode = 'normal',
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="map-view">
      {!mapLoaded ? (
        <div className="map-view-loading">
          <div className="spinner" style={{ width: 40, height: 40, borderTopColor: '#FF5D3A', borderRightColor: '#FFC857', borderBottomColor: '#2BD9A6' }} />
          <p>Cargando mapa...</p>
        </div>
      ) : (
        <div className="map-view-content">
          <p className="map-view-title">🗺️ Mapa Interactivo</p>
          <p className="map-view-info">Centro: {center.lat}, {center.lng}</p>
          <p className="map-view-info">Zoom: {zoom}</p>
          <p className="map-view-info">Modo: {viewMode}</p>
          <div className="map-view-markers">
            {markers.map((m, i) => (
              <span key={i} className="map-view-marker">📍 {m.title}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;