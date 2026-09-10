// src/components/Reports/ReportCard.jsx
import React from 'react';
import { Clock, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';
import './ReportCard.css';

const ReportCard = ({ report }) => {
  const getSeverityColor = (s) => {
    const colors = { 1: '#2BD9A6', 2: '#84CC16', 3: '#FFC857', 4: '#FF8C42', 5: '#FF5D3A' };
    return colors[s] || '#9A9284';
  };

  const getSeverityLabel = (s) => {
    const labels = { 1: 'Muy bajo', 2: 'Bajo', 3: 'Medio', 4: 'Alto', 5: 'Muy alto' };
    return labels[s] || 'Desconocido';
  };

  const getCategoryIcon = (c) => {
    const icons = { road_block: '🚧', accident: '🚗', lighting: '💡', crime: '🚨', safety: '🛡️', other: '📌' };
    return icons[c] || '📌';
  };

  const getCategoryLabel = (c) => {
    const labels = { road_block: 'Vía bloqueada', accident: 'Accidente', lighting: 'Iluminación', crime: 'Actividad sospechosa', safety: 'Seguridad', other: 'Otro' };
    return labels[c] || c;
  };

  const color = getSeverityColor(report.severity);

  return (
    <article className="report-card">
      <div className="report-main">
        <span className="report-icon">{getCategoryIcon(report.category)}</span>
        <div className="report-body">
          <div className="report-header">
            <h4 className="report-title">{report.title}</h4>
            <span
              className="report-severity"
              style={{ background: `${color}22`, color }}
            >
              {getSeverityLabel(report.severity)}
            </span>
          </div>
          <p className="report-desc">{report.description}</p>
          <div className="report-meta">
            <span><Clock size={12} /> {new Date(report.created_at).toLocaleDateString('es-ES')}</span>
            {report.distance_km && (
              <span><MapPin size={12} /> {report.distance_km.toFixed(1)} km</span>
            )}
            <span>{getCategoryLabel(report.category)}</span>
          </div>
        </div>
      </div>

      <div className="report-votes">
        <span className="report-vote up">
          <ThumbsUp size={14} /> {report.votes_up || 0}
        </span>
        <span className="report-vote down">
          <ThumbsDown size={14} /> {report.votes_down || 0}
        </span>
      </div>
    </article>
  );
};

export default ReportCard;