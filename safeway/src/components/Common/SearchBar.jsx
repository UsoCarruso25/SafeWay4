// src/components/Common/SearchBar.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Buscar...' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(255,255,255,0.12)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderRadius: '100px',
      padding: '4px 18px',
      border: '0.5px solid rgba(255,255,255,0.1)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
    }}>
      <Search size={18} style={{ color: 'rgba(255,255,255,0.3)', marginRight: '10px' }} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          fontSize: '14px',
          padding: '8px 0',
          background: 'transparent',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400'
        }}
      />
    </form>
  );
};

export default SearchBar;