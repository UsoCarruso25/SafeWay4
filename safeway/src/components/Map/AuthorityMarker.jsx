// src/components/Map/AuthorityMarker.jsx
export const getAuthorityColor = (type) => {
  const colors = {
    policia: '#5C9CFF',
    bomberos: '#FF5D5D',
    transito: '#FFC857',
    salud: '#4DD4C0',
    defensa_civil: '#7B68EE',
    otro: '#8B92A7',
  };
  return colors[type] || '#8B92A7';
};

export const getAuthorityIcon = (type) => {
  const icons = {
    policia: '👮',
    bomberos: '🚒',
    transito: '🚦',
    salud: '🏥',
    defensa_civil: '🛡️',
    otro: '📍',
  };
  return icons[type] || '📍';
};

export const getAuthorityLabel = (type) => {
  const labels = {
    policia: 'Policía',
    bomberos: 'Bomberos',
    transito: 'Tránsito',
    salud: 'Salud',
    defensa_civil: 'Defensa Civil',
    otro: 'Autoridad',
  };
  return labels[type] || 'Autoridad';
};

export const createAuthorityElement = (authority) => {
  const el = document.createElement('div');
  el.className = 'authority-marker';
  el.style.setProperty('--authority-color', getAuthorityColor(authority.type));
  el.innerHTML = `
    <div class="authority-marker-inner">
      <span class="authority-marker-icon">${getAuthorityIcon(authority.type)}</span>
    </div>
  `;
  return el;
};