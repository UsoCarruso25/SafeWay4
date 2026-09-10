// src/components/Map/MapControls.jsx
import React from 'react';
import { Plus, Minus, Locate, Layers } from 'lucide-react';

const MapControls = ({ onZoomIn, onZoomOut, onLocate, onLayerToggle }) => {
  return (
    <div className="map-controls">
      <button onClick={onZoomIn} className="map-control-btn" aria-label="Zoom in">
        <Plus size={20} />
      </button>
      <button onClick={onZoomOut} className="map-control-btn" aria-label="Zoom out">
        <Minus size={20} />
      </button>
      <button onClick={onLocate} className="map-control-btn" aria-label="Mi ubicación">
        <Locate size={20} />
      </button>
      <button onClick={onLayerToggle} className="map-control-btn" aria-label="Capas">
        <Layers size={20} />
      </button>
    </div>
  );
};

export default MapControls;