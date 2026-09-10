// src/components/Reports/NearbyReports.jsx
import React, { useState, useEffect } from 'react';
import { supabaseAPI } from '../../api/supabaseAPI';
import LoadingSpinner from '../Common/LoadingSpinner';

// 📍 Coordenadas de Patio Bonito por defecto
const PATIO_BONITO = {
  lat: 4.6357,
  lng: -74.1475
};

const NearbyReports = ({ lat = PATIO_BONITO.lat, lng = PATIO_BONITO.lng }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, [lat, lng]);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await supabaseAPI.getNearbyReports(lat, lng, 2);
      setReports(data || []);
    } catch (error) {
      console.error('Error cargando reportes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Si no hay reportes, mostrar algunos de ejemplo de Patio Bonito
  const getMockReports = () => {
    return [
      { id: '1', title: 'Vía bloqueada por construcción', category: 'road_block', severity: 3, created_at: new Date(Date.now() - 3600000).toISOString(), distance_km: 0.3 },
      { id: '2', title: 'Mala iluminación en la calle 10', category: 'lighting', severity: 2, created_at: new Date(Date.now() - 7200000).toISOString(), distance_km: 0.5 },
      { id: '3', title: 'Accidente en la Av. Ciudad de Cali', category: 'accident', severity: 4, created_at: new Date(Date.now() - 1800000).toISOString(), distance_km: 0.8 },
      { id: '4', title: 'Actividad sospechosa', category: 'crime', severity: 5, created_at: new Date(Date.now() - 1200000).toISOString(), distance_km: 0.2 },
    ];
  };

  const displayReports = reports.length > 0 ? reports : getMockReports();

  const getCategoryIcon = (category) => {
    const icons = {
      road_block: '🚧',
      accident: '🚗',
      lighting: '💡',
      crime: '🚨',
      safety: '🛡️',
      other: '📌'
    };
    return icons[category] || '📌';
  };

  const getTimeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 60000);
    if (diff < 1) return 'Ahora';
    if (diff < 60) return `Hace ${diff} min`;
    if (diff < 1440) return `Hace ${Math.floor(diff / 60)} h`;
    return `Hace ${Math.floor(diff / 1440)} d`;
  };

  const getSeverityColor = (severity) => {
    if (severity >= 4) return '#FF5D3A';
    if (severity >= 3) return '#FFC857';
    return '#2BD9A6';
  };

  if (loading) return <LoadingSpinner size={24} />;

  return (
    <div>
      <h4 style={{ fontSize: '13px', margin: '0 0 8px 0', color: '#333' }}>
        📋 Reportes cercanos
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {displayReports.slice(0, 4).map((report) => (
          <div key={report.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
          }}>
            <span style={{ fontSize: '18px' }}>{getCategoryIcon(report.category)}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>
                {report.title}
              </div>
              <div style={{ fontSize: '11px', color: '#999' }}>
                {getTimeAgo(report.created_at)} - {(report.distance_km || 0).toFixed(1)} km
              </div>
            </div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: getSeverityColor(report.severity || 3)
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyReports;