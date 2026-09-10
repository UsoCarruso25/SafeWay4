// src/components/Common/SafetyScore.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SafetyScore = ({ score = 78, trend = 'up' }) => {
  const getColor = (s) => (s >= 70 ? '#2BD9A6' : s >= 40 ? '#FFC857' : '#FF5D3A');
  const getStatus = (s) =>
    s >= 70 ? 'Condiciones favorables' : s >= 40 ? 'Precaución' : 'Zona de riesgo';
  const circumference = 2 * Math.PI * 22;

  return (
    <div className="safety-score">
      <svg viewBox="0 0 56 56" className="safety-score-circle">
        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke={getColor(score)}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
        <text x="28" y="28" className="safety-score-value">
          {score}%
        </text>
      </svg>

      <div className="safety-score-info">
        <div className="safety-score-status">{getStatus(score)}</div>
        <div className={`safety-score-trend ${trend}`}>
          {trend === 'up' ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
          <span>{trend === 'up' ? 'Mejorando' : 'Disminuyendo'}</span>
        </div>
      </div>
    </div>
  );
};

export default SafetyScore;