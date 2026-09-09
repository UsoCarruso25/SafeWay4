// src/components/Reports/ReportCard.jsx
import React from 'react';
import { Clock, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';

const ReportCard = ({ report }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      1: '#4CAF50',
      2: '#8BC34A',
      3: '#FFC107',
      4: '#FF9800',
      5: '#F44336'
    };
    return colors[severity] || '#999';
  };

  const getSeverityLabel = (severity) => {
    const labels = {
      1: 'Muy bajo',
      2: 'Bajo',
      3: 'Medio',
      4: 'Alto',
      5: 'Muy alto'
    };
    return labels[severity] || 'Desconocido';
  };

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

  const getCategoryLabel = (category) => {
    const labels = {
      road_block: 'Vía bloqueada',
      accident: 'Accidente',
      lighting: 'Iluminación',
      crime: 'Actividad sospechosa',
      safety: 'Seguridad',
      other: 'Otro'
    };
    return labels[category] || category;
  };

  return (
    <div className="card" style={{ padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '20px' }}>{getCategoryIcon(report.category)}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h4 style={{ margin: 0, fontSize: '14px' }}>{report.title}</h4>
              <span style={{
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600',
                background: getSeverityColor(report.severity) + '20',
                color: getSeverityColor(report.severity)
              }}>
                {getSeverityLabel(report.severity)}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', margin: '4px 0' }}>{report.description}</p>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#999' }}>
              <span><Clock size={12} style={{ marginRight: '4px' }} />{new Date(report.created_at).toLocaleDateString('es-ES')}</span>
              {report.distance_km && (
                <span><MapPin size={12} style={{ marginRight: '4px' }} />{report.distance_km.toFixed(1)} km</span>
              )}
              <span>{getCategoryLabel(report.category)}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ThumbsUp size={14} color="#4CAF50" /> {report.votes_up || 0}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ThumbsDown size={14} color="#F44336" /> {report.votes_down || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;