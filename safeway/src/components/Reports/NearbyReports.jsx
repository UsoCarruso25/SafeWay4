// src/components/Reports/NearbyReports.jsx
import React from 'react';

const NearbyReports = ({ reports = [] }) => {
  if (reports.length === 0) return null;

  const getCategoryIcon = (category) => {
    const icons = {
      road_block: '🚧',
      accident: '🚗',
      lighting: '💡',
      crime: '🚨',
      safety: '🛡️',
      other: '📌',
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
    return '#5DC8B4';
  };

  return (
    <div className="nearby-reports">
      <h4 className="nearby-title">📋 Reportes cercanos</h4>
      <div className="nearby-list">
        {reports.slice(0, 4).map((report) => (
          <div key={report.id} className="nearby-item">
            <span className="nearby-icon">
              {getCategoryIcon(report.category)}
            </span>
            <div className="nearby-info">
              <div className="nearby-name">{report.title}</div>
              <div className="nearby-meta">
                {getTimeAgo(report.created_at)} ·{' '}
                {(report.distance_km || 0).toFixed(1)} km
              </div>
            </div>
            <div
              className="nearby-severity"
              style={{ background: getSeverityColor(report.severity || 3) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyReports;