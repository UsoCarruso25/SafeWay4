// src/components/Common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 40, color = '#4A6CF7' }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: size,
        height: size,
        border: `4px solid #f3f3f3`,
        borderTop: `4px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;