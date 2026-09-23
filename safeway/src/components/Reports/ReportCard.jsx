// src/components/Reports/ReportCard.jsx
import React from 'react';
import { Clock, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';
import './ReportCard.css';

const ReportCard = ({ report }) => {
  const getSeverityColor = (s) => {
    const colors = {
      1: '#00F5D4',
      2: '#84CC16',
      3: '#FFB547',
      4: '#FF8C42',
      5: '#FF5C7C',
    };
    return colors[s] || '#94A3B8';
  };

  const getSeverityLabel = (s) => {
    const labels = { 1: 'Muy bajo', 2: 'Bajo', 3: 'Medio', 4: 'Alto', 5: 'Muy alto' };
    return labels[s] || 'Desconocido';
  };

  const getCategoryIcon = (c) => {
    const icons = {
      road_block: '🚧',
      accident: '🚗',
      lighting: '💡',
      crime: '🚨',
      safety: '🛡️',
      other: '📌',
    };
    return icons[c] || '📌';
  };

  const getCategoryLabel = (c) => {
    const labels = {
      road_block: 'Vía bloqueada',
      accident: 'Accidente',
      lighting: 'Iluminación',
      crime: 'Actividad sospechosa',
      safety: 'Seguridad',
      other: 'Otro',
    };
    return labels[c] || c;
  };

  const severityColor = getSeverityColor(report.severity);

  return (
    <article className="report-card">
      <div className="report-main">
        <div
          className="report-icon"
          style={{ background: `${severityColor}14`, color: severityColor }}
        >
          <span className="report-icon-emoji">{getCategoryIcon(report.category)}</span>
        </div>

        <div className="report-body">
          <h4 className="report-title">{report.title}</h4>
          <p className="report-desc">{report.description}</p>

          <div className="report-footer">
            <div className="report-meta">
              <span className="report-severity" style={{ color: severityColor }}>
                <span
                  className="report-severity-dot"
                  style={{ background: severityColor }}
                />
                {getSeverityLabel(report.severity)}
              </span>

              <span className="report-meta-item">
                <Clock size={11} />
                {new Date(report.created_at).toLocaleDateString('es-ES')}
              </span>

              {report.distance_km && (
                <span className="report-meta-item">
                  <MapPin size={11} />
                  {report.distance_km.toFixed(1)} km
                </span>
              )}
            </div>

            <div className="report-votes">
              <span className="report-vote up">
                <ThumbsUp size={12} />
                {report.votes_up || 0}
              </span>
              <span className="report-vote down">
                <ThumbsDown size={12} />
                {report.votes_down || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReportCard;