// src/components/Common/SafetyScore.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SafetyScore = ({ score = 78, trend = 'up' }) => {
  const getColor = (s) => s >= 70 ? '#34C759' : s >= 40 ? '#FFCC00' : '#FF3B30';
  const getStatus = (s) => s >= 70 ? 'Condiciones favorables' : s >= 40 ? 'Precaución' : 'Zona de riesgo';
  const circumference = 2 * Math.PI * 22;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%'
    }}>
      <svg viewBox="0 0 56 56" style={{ width: '40px', height: '40px' }}>
        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <circle
          cx="28" cy="28" r="22"
          fill="none"
          stroke={getColor(score)}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
          style={{ transition: 'stroke-dashoffset 1.5s ease' }}
        />
        <text x="28" y="28" style={{ 
          fontSize: '11px', 
          fontWeight: '700', 
          fill: 'white', 
          textAnchor: 'middle', 
          dominantBaseline: 'central',
          fontFamily: 'Inter, sans-serif'
        }}>
          {score}%
        </text>
      </svg>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ 
          fontSize: '10px', 
          fontWeight: '500', 
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '0.2px'
        }}>
          {getStatus(score)}
        </div>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '3px',
          fontSize: '8px', 
          fontWeight: '500', 
          padding: '1px 10px', 
          borderRadius: '100px',
          background: trend === 'up' ? 'rgba(52, 199, 89, 0.15)' : 'rgba(255, 59, 48, 0.15)',
          color: trend === 'up' ? '#34C759' : '#FF3B30',
          marginTop: '2px',
          letterSpacing: '0.3px'
        }}>
          {trend === 'up' ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
          <span>{trend === 'up' ? 'Mejorando' : 'Disminuyendo'}</span>
        </div>
      </div>
    </div>
  );
};

export default SafetyScore;