// src/components/Common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 40, color = '#FF5D3A' }) => {
  return (
    <div className="spinner-wrapper">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
          borderRightColor: color === '#FF5D3A' ? '#FFC857' : color,
          borderBottomColor: color === '#FF5D3A' ? '#2BD9A6' : color,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;