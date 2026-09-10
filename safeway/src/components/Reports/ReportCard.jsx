// src/components/Reports/ReportCard.jsx
import React, { useState } from 'react';
import { Clock, MapPin, ThumbsUp, ThumbsDown } from 'lucide-react';

const ReportCard = ({ report, onVote }) => {
  const [vote, setVote] = useState(null); // 'up' | 'down' | null

  const getSeverityStyle = (severity) => {
    // 1-2 verificado/bajo (verde), 3 informativo (ámbar), 4-5 alerta (coral)
    if (severity >= 4) return { bg: 'var(--coral-tint)', text: 'var(--coral-dark)' };
    if (severity === 3) return { bg: 'var(--amber-tint)', text: 'var(--amber-dark)' };
    return { bg: 'var(--teal-tint)', text: 'var(--teal-dark)' };
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

  const handleVote = (type) => {
    const next = vote === type ? null : type;
    setVote(next);
    if (onVote) onVote(report.id, next);
  };

  const severityStyle = getSeverityStyle(report.severity);
  const votesUp = (report.votes_up || 0) + (vote === 'up' ? 1 : 0);
  const votesDown = (report.votes_down || 0) + (vote === 'down' ? 1 : 0);

  return (
    <div className="card" style={{ padding: '14px 16px', borderLeft: `4px solid ${severityStyle.text}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '20px' }}>{getCategoryIcon(report.category)}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontFamily: 'var(--font-display)' }}>{report.title}</h4>
              <span className="chip" style={{ background: severityStyle.bg, color: severityStyle.text }}>
                {getSeverityLabel(report.severity)}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0' }}>{report.description}</p>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-light)' }}>
              <span><Clock size={12} style={{ marginRight: '4px', verticalAlign: '-2px' }} />{new Date(report.created_at).toLocaleDateString('es-ES')}</span>
              {report.distance_km && (
                <span><MapPin size={12} style={{ marginRight: '4px', verticalAlign: '-2px' }} />{report.distance_km.toFixed(1)} km</span>
              )}
              <span>{getCategoryLabel(report.category)}</span>
            </div>
          </div>
        </div>

        <div className="vote-pill">
          <button className={`up ${vote === 'up' ? 'active' : ''}`} onClick={() => handleVote('up')}>
            <ThumbsUp size={14} />{votesUp}
          </button>
          <span className="vote-divider" />
          <button className={`down ${vote === 'down' ? 'active' : ''}`} onClick={() => handleVote('down')}>
            <ThumbsDown size={14} />{votesDown}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;