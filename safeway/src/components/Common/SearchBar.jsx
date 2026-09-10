// src/components/Common/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, MessageCircle, Shield, MapPin } from 'lucide-react';
import { supabaseAPI } from '../../api/supabaseAPI';

const SearchBar = ({ placeholder = 'Buscar...', onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  /* Cerrar al hacer click fuera */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Búsqueda con debounce */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await supabaseAPI.searchAll(query);
        setResults(data || []);
        setShowResults(true);
      } catch (err) {
        console.warn('Error búsqueda:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const getIcon = (type) => {
    switch (type) {
      case 'report': return <FileText size={15} />;
      case 'post': return <MessageCircle size={15} />;
      case 'authority': return <Shield size={15} />;
      default: return <MapPin size={15} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'report': return 'Reporte';
      case 'post': return 'Publicación';
      case 'authority': return 'Autoridad';
      default: return 'Resultado';
    }
  };

  const handleSelect = (result) => {
    setShowResults(false);
    setQuery('');
    if (onSelectResult) onSelectResult(result);
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <Search size={16} className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder={placeholder}
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setQuery('');
              setResults([]);
              setShowResults(false);
            }}
            aria-label="Limpiar"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {showResults && (
        <div className="search-results">
          {loading ? (
            <div className="search-loading">Buscando...</div>
          ) : results.length === 0 ? (
            <div className="search-empty">
              No se encontraron resultados para "{query}"
            </div>
          ) : (
            <>
              <div className="search-count">
                {results.length} resultado{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((result) => (
                <button
                  key={`${result.result_type}-${result.id}`}
                  className="search-item"
                  onClick={() => handleSelect(result)}
                >
                  <div className={`search-item-icon search-item-icon-${result.result_type}`}>
                    {getIcon(result.result_type)}
                  </div>
                  <div className="search-item-body">
                    <div className="search-item-type">
                      {getTypeLabel(result.result_type)}
                    </div>
                    <div className="search-item-title">{result.title}</div>
                    {result.description && (
                      <div className="search-item-desc">
                        {result.description.substring(0, 60)}
                        {result.description.length > 60 ? '...' : ''}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;