// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Bell, Search as SearchIcon, ShieldCheck, Plus } from 'lucide-react';
import BottomNav from '../components/Layout/BottomNav';
import SafetyScore from '../components/Common/SafetyScore';
import SearchBar from '../components/Common/SearchBar';
import './Home.css';

// 📍 Patio Bonito - Kennedy (Área ampliada)
const PATIO_BONITO = {
  lng: -74.1475,
  lat: 4.6357,
  zoom: 16
};

// ✅ PERÍMETRO AMPLIADO de Patio Bonito
const PATIO_BONITO_BOUNDS = {
  north: 4.6500,  // Ampliado hacia el norte
  south: 4.6200,  // Ampliado hacia el sur
  east: -74.1350, // Ampliado hacia el este
  west: -74.1600  // Ampliado hacia el oeste
};

// 🎨 Paleta de marcadores (misma que el resto de la app)
const MARKER_COLORS = {
  you: '#4C8CFF',
  home: '#FF5D3A',
  health: '#2BD9A6',
  school: '#FFC857',
  park: '#2BD9A6',
  market: '#FFC857',
  works: '#FF5D3A',
  transit: '#4C8CFF',
};

const Home = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeView, setActiveView] = useState('normal');
  const [userLocation, setUserLocation] = useState(null);

  // Obtener ubicación en tiempo real
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          console.log('📍 Ubicación:', latitude, longitude);
        },
        (error) => {
          console.warn('⚠️ Error ubicación:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      console.log('🗺️ Inicializando mapa en Patio Bonito...');

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: [PATIO_BONITO.lng, PATIO_BONITO.lat],
        zoom: PATIO_BONITO.zoom,
        attributionControl: false,
        maxZoom: 19,
        minZoom: 12,
      });

      // ✅ Agregar límites suaves (sin restricción fuerte)
      // Solo mostrar un aviso en consola si se sale del área
      map.current.on('moveend', () => {
        const center = map.current.getCenter();
        const lng = center.lng;
        const lat = center.lat;

        // Solo verificar sin devolver el mapa
        if (lng < PATIO_BONITO_BOUNDS.west || lng > PATIO_BONITO_BOUNDS.east ||
            lat < PATIO_BONITO_BOUNDS.south || lat > PATIO_BONITO_BOUNDS.north) {
          console.log('📍 Explorando más allá de Patio Bonito');
        }
      });

      // ✅ Agregar botón para volver a Patio Bonito
      map.current.addControl(new maplibregl.NavigationControl({
        showCompass: false
      }), 'top-right');

      map.current.on('load', () => {
        console.log('✅ Mapa cargado');
        setMapLoaded(true);

        // Marcador Patio Bonito
        new maplibregl.Marker({ color: MARKER_COLORS.home, scale: 1.5 })
          .setLngLat([PATIO_BONITO.lng, PATIO_BONITO.lat])
          .setPopup(new maplibregl.Popup().setHTML(`
            <div style="padding:8px;text-align:center;font-family:'Inter',sans-serif;">
              <strong style="font-size:14px;">📍 Patio Bonito</strong>
              <br><span style="font-size:11px;opacity:0.7;">Kennedy - Bogotá</span>
            </div>
          `))
          .addTo(map.current);

        // Lugares importantes en Patio Bonito
        const places = [
          { lng: -74.1490, lat: 4.6365, label: '🏥 Centro Salud', color: MARKER_COLORS.health },
          { lng: -74.1460, lat: 4.6345, label: '🏫 Colegio', color: MARKER_COLORS.school },
          { lng: -74.1470, lat: 4.6368, label: '🌳 Parque', color: MARKER_COLORS.park },
          { lng: -74.1485, lat: 4.6370, label: '🛒 Supermercado', color: MARKER_COLORS.market },
          { lng: -74.1455, lat: 4.6340, label: '🚧 Obras', color: MARKER_COLORS.works },
          { lng: -74.1495, lat: 4.6355, label: '🚌 TransMilenio', color: MARKER_COLORS.transit },
        ];

        places.forEach((place) => {
          new maplibregl.Marker({ color: place.color, scale: 0.8 })
            .setLngLat([place.lng, place.lat])
            .setPopup(new maplibregl.Popup().setHTML(`<div style="padding:6px;font-family:'Inter',sans-serif;font-size:13px;">${place.label}</div>`))
            .addTo(map.current);
        });

        // ✅ Agregar un botón de "Volver a Patio Bonito" en el mapa
        const centerControl = document.createElement('div');
        centerControl.className = 'maplibregl-ctrl maplibregl-ctrl-group';
        centerControl.innerHTML = `
          <button style="
            width: 36px;
            height: 36px;
            border: none;
            background: transparent;
            color: #F5F3EE;
            font-size: 18px;
            cursor: pointer;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          " title="Volver a Patio Bonito">
            📍
          </button>
        `;

        centerControl.querySelector('button').addEventListener('click', () => {
          map.current.flyTo({
            center: [PATIO_BONITO.lng, PATIO_BONITO.lat],
            zoom: PATIO_BONITO.zoom,
            duration: 1500,
            easing: (t) => t * (2 - t) // Ease out quad
          });
        });

        map.current.addControl(
          {
            onAdd: () => centerControl,
            onRemove: () => {}
          },
          'top-right'
        );
      });

    } catch (err) {
      console.error('❌ Error mapa:', err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Marcador de ubicación en tiempo real
  useEffect(() => {
    if (!map.current || !mapLoaded || !userLocation) return;

    if (map.current._userMarker) {
      map.current._userMarker.remove();
    }

    const el = document.createElement('div');
    el.innerHTML = `
      <div style="
        width: 18px;
        height: 18px;
        background: ${MARKER_COLORS.you};
        border: 3px solid #10151C;
        border-radius: 50%;
        box-shadow: 0 0 30px rgba(76,140,255,0.6);
        animation: pulse-location 1.5s ease-in-out infinite;
      "></div>
    `;

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);

    map.current._userMarker = marker;

  }, [userLocation, mapLoaded]);

  const handleReport = () => {
    // TODO: conectar con el flujo real de creación de reportes (supabaseAPI.createReport)
    console.log('📣 Abrir formulario de nuevo reporte');
  };

  return (
    <div className="home-apple">
      <div ref={mapContainer} className="map-fullscreen" />

      {/* TopBar flotante */}
      <div className="topbar-apple">
        <div className="topbar-left">
          <div className="app-icon-mark">
            <ShieldCheck size={13} strokeWidth={2.4} />
          </div>
          <span className="app-title">Safa<span>Way</span></span>
        </div>
        <div className="topbar-right">
          <button className="icon-btn-glass" aria-label="Notificaciones">
            <Bell />
            <span className="badge-glass">3</span>
          </button>
          <button className="avatar-glass">U</button>
        </div>
      </div>

      {/* SearchBar */}
      <div className="search-apple">
        <SearchBar placeholder="Buscar en Patio Bonito..." />
      </div>

      {/* Safety Score - Cápsula flotante */}
      <div className="safety-capsule">
        <SafetyScore score={78} trend="up" />
      </div>

      {/* Controles del mapa - Segmentado */}
      <div className="controls-capsule">
        {['Normal', 'Seguridad', 'Reportes', 'Zonas'].map((label) => (
          <button
            key={label}
            className={`capsule-btn ${activeView === label.toLowerCase() ? 'active' : ''}`}
            onClick={() => setActiveView(label.toLowerCase())}
          >
            {label}
          </button>
        ))}
      </div>

      {/* FAB de reportar */}
      <div className="home-fab">
        <button className="fab" onClick={handleReport} aria-label="Crear reporte">
          <Plus size={24} color="white" strokeWidth={2.4} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;