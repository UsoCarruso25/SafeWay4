// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import BottomNav from '../components/Layout/BottomNav';
import SearchBar from '../components/Common/SearchBar';
import NearbyReports from '../components/Reports/NearbyReports';
import CreateReport from '../components/Reports/CreateReport';
import {
  createAuthorityElement,
  getAuthorityLabel,
  getAuthorityColor,
} from '../components/Map/AuthorityMarker';
import { supabaseAPI } from '../api/supabaseAPI';

const PATIO_BONITO = {
  lng: -74.1607,
  lat: 4.6394,
  zoom: 16.5,
  pitch: 60,
  bearing: -20,
};

const PATIO_BONITO_BOUNDS = [
  [-74.1750, 4.6250],
  [-74.1450, 4.6550],
];

const Home = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [reports, setReports] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [safetyScore, setSafetyScore] = useState(95);
  const [is3D, setIs3D] = useState(true);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [showCreateReport, setShowCreateReport] = useState(false);

  /* ============================================================
     1. UBICACIÓN REAL
  ============================================================ */
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setLocationError('Geolocalización no soportada');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        const errors = { 1: 'Permiso denegado', 2: 'Posición no disponible', 3: 'Timeout' };
        setLocationError(errors[err.code] || err.message);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => console.warn('📍 Watch error:', err.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  /* ============================================================
     2. CARGAR REPORTES
  ============================================================ */
  const loadReports = async () => {
    try {
      let data = null;
      if (typeof supabaseAPI.getNearbyReports === 'function') {
        try {
          data = await supabaseAPI.getNearbyReports(PATIO_BONITO.lat, PATIO_BONITO.lng, 2);
        } catch {
          data = null;
        }
      }
      if (!data) {
        const { supabase } = await import('../api/supabaseClient');
        const { data: directData } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);
        data = directData || [];
      }
      const safe = data || [];
      setReports(safe);
      if (safe.length === 0) setSafetyScore(95);
      else {
        const avg = safe.reduce((s, r) => s + (r.severity || 3), 0) / safe.length;
        setSafetyScore(Math.max(0, Math.round(100 - avg * 15)));
      }
    } catch {
      setReports([]);
      setSafetyScore(95);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  /* ============================================================
     3. CARGAR AUTORIDADES
  ============================================================ */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await supabaseAPI.getNearbyAuthorities(
          PATIO_BONITO.lat,
          PATIO_BONITO.lng,
          5
        );
        setAuthorities(data || []);
      } catch (err) {
        console.warn('Autoridades no disponibles:', err);
        setAuthorities([]);
      }
    };
    load();
  }, []);

  /* ============================================================
     4. INICIALIZAR MAPA
  ============================================================ */
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    if (!mapboxgl.accessToken) {
      console.error('❌ Falta VITE_MAPBOX_ACCESS_TOKEN en .env');
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [PATIO_BONITO.lng, PATIO_BONITO.lat],
      zoom: PATIO_BONITO.zoom,
      pitch: PATIO_BONITO.pitch,
      bearing: PATIO_BONITO.bearing,
      minZoom: 15,
      maxZoom: 20,
      maxBounds: PATIO_BONITO_BOUNDS,
      maxPitch: 80,
      attributionControl: false,
      dragRotate: true,
      pitchWithRotate: true,
      touchPitch: true,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      console.log('✅ Mapa cargado');
    });

    map.current.on('error', (e) => {
      if (e.error?.message?.includes('401')) {
        console.error('❌ Token de Mapbox inválido');
      }
      console.warn('Map error:', e.error?.message);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  /* ============================================================
     5. MARCADOR DE USUARIO
  ============================================================ */
  useEffect(() => {
    if (!map.current || !mapLoaded || !userLocation) return;
    if (map.current._userMarker) map.current._userMarker.remove();

    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.innerHTML = `<div class="user-location-dot"></div><div class="user-location-ring"></div>`;

    const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);

    map.current._userMarker = marker;

    if (!map.current._hasFlownToUser) {
      map.current._hasFlownToUser = true;
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 16.5,
        pitch: 60,
        bearing: -20,
        duration: 1500,
      });
    }
  }, [userLocation, mapLoaded]);

  /* ============================================================
     6. MARCADORES DE REPORTES
  ============================================================ */
  useEffect(() => {
    if (!map.current || !mapLoaded || reports.length === 0) return;
    if (map.current._reportMarkers) {
      map.current._reportMarkers.forEach((m) => m.remove());
    }

    const markers = reports
      .map((r) => {
        if (!r.latitude || !r.longitude) return null;
        const sev = r.severity || 3;
        const color = sev >= 4 ? '#FF5D3A' : sev >= 3 ? '#FFC857' : '#5DC8B4';
        return new mapboxgl.Marker({ color, scale: 0.9 })
          .setLngLat([r.longitude, r.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 20 }).setHTML(
              `<div class="map-popup"><strong>${r.title || 'Reporte'}</strong><p>${r.description || ''}</p></div>`
            )
          )
          .addTo(map.current);
      })
      .filter(Boolean);

    map.current._reportMarkers = markers;
  }, [reports, mapLoaded]);

  /* ============================================================
     7. MARCADORES DE AUTORIDADES
  ============================================================ */
  useEffect(() => {
    if (!map.current || !mapLoaded || authorities.length === 0) return;
    if (map.current._authorityMarkers) {
      map.current._authorityMarkers.forEach((m) => m.remove());
    }

    const markers = authorities
      .map((a) => {
        if (!a.latitude || !a.longitude) return null;
        const el = createAuthorityElement(a);
        return new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([a.longitude, a.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 20 }).setHTML(`
              <div class="map-popup">
                <strong>${a.name}</strong>
                <p style="color: ${getAuthorityColor(a.type)}; font-weight: 600; margin-bottom: 4px;">
                  ${getAuthorityLabel(a.type)}
                </p>
                ${a.address ? `<p>📍 ${a.address}</p>` : ''}
                ${a.phone ? `<p>📞 <a href="tel:${a.phone}">${a.phone}</a></p>` : ''}
                ${a.is_24h ? '<p style="color: #4DD4C0;">🕒 Disponible 24/7</p>' : ''}
              </div>
            `)
          )
          .addTo(map.current);
      })
      .filter(Boolean);

    map.current._authorityMarkers = markers;
  }, [authorities, mapLoaded]);

  /* ============================================================
     8. HANDLERS
  ============================================================ */
  const handleZoomIn = () => map.current?.zoomIn({ duration: 300 });
  const handleZoomOut = () => map.current?.zoomOut({ duration: 300 });

  const handleRecenter = () => {
    map.current?.flyTo({
      center: [PATIO_BONITO.lng, PATIO_BONITO.lat],
      zoom: PATIO_BONITO.zoom,
      pitch: is3D ? 60 : 0,
      bearing: is3D ? -20 : 0,
      duration: 1200,
    });
  };

  const handleLocateMe = () => {
    if (!map.current) return;
    setLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        map.current.flyTo({
          center: [longitude, latitude],
          zoom: 16.5,
          pitch: is3D ? 60 : 0,
          duration: 1500,
        });
        setLocating(false);
      },
      (err) => {
        const errors = { 1: 'Permiso denegado', 2: 'Posición no disponible', 3: 'Timeout' };
        setLocationError(errors[err.code] || err.message);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const toggle3D = () => {
    if (!map.current) return;
    const newIs3D = !is3D;
    setIs3D(newIs3D);
    map.current.easeTo({
      pitch: newIs3D ? 60 : 0,
      bearing: newIs3D ? -20 : 0,
      duration: 1000,
    });
  };

  const getSafetyColor = (score) => {
    if (score >= 70) return '#5DC8B4';
    if (score >= 40) return '#FFC857';
    return '#FF5D3A';
  };

  return (
    <div className="home-apple">
      <div ref={mapContainer} className="map-fullscreen" />

      {/* ============ BARRA UNIFICADA: AVATAR + CAMPANA | SEARCH ============ */}
      <div className="top-capsule">
        {/* Sub-cápsula izquierda: avatar + campana */}
        <div className="top-capsule-actions">
          <button className="top-capsule-avatar" aria-label="Perfil">
            U
          </button>
          <button className="top-capsule-icon" aria-label="Notificaciones">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {reports.length > 0 && (
              <span className="top-capsule-badge">{reports.length}</span>
            )}
          </button>
        </div>

        {/* Sub-cápsula derecha: search */}
        <div className="top-capsule-search">
          <SearchBar
            placeholder="Buscar en Patio Bonito..."
            onSelectResult={(result) => {
              if (result.latitude && result.longitude) {
                map.current?.flyTo({
                  center: [result.longitude, result.latitude],
                  zoom: 17,
                  duration: 1200,
                });
              }
            }}
          />
        </div>
      </div>

      {/* ERROR UBICACIÓN */}
      {locationError && (
        <div className="location-error-toast">⚠️ {locationError}</div>
      )}

      {/* CONTROLES VERTICALES */}
      <div className="map-controls-stack">
        <button
          className={`map-ctrl-btn ${is3D ? 'active' : ''}`}
          onClick={toggle3D}
          aria-label={is3D ? 'Ver 2D' : 'Ver 3D'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </button>
        <div className="map-ctrl-divider" />
        <button className="map-ctrl-btn" onClick={handleZoomIn} aria-label="Zoom in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button className="map-ctrl-btn" onClick={handleZoomOut} aria-label="Zoom out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <div className="map-ctrl-divider" />
        <button
          className={`map-ctrl-btn locate-btn ${locating ? 'loading' : ''}`}
          onClick={handleLocateMe}
          aria-label="Mi ubicación"
          disabled={locating}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </button>
        <div className="map-ctrl-divider" />
        <button className="map-ctrl-btn recenter" onClick={handleRecenter} aria-label="Centrar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>
      </div>

      {/* SAFETY SCORE */}
      <button
        className="safety-circle"
        style={{ '--safety-color': getSafetyColor(safetyScore) }}
        aria-label={`Safety score: ${safetyScore}%`}
      >
        <svg viewBox="0 0 44 44" className="safety-circle-svg">
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <circle
            cx="22" cy="22" r="18"
            fill="none"
            stroke="var(--safety-color)"
            strokeWidth="3"
            strokeDasharray={2 * Math.PI * 18}
            strokeDashoffset={2 * Math.PI * 18 * (1 - safetyScore / 100)}
            strokeLinecap="round"
            transform="rotate(-90 22 22)"
          />
        </svg>
        <span className="safety-circle-value">{safetyScore}</span>
      </button>

      {/* BOTÓN REPORTAR (pill) */}
      <button
        className="report-pill"
        onClick={() => setShowCreateReport(true)}
        aria-label="Crear reporte"
        title="Crear reporte"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>Reportar</span>
      </button>

      {/* FORMULARIO DE REPORTE */}
      {showCreateReport && (
        <CreateReport
          userLocation={userLocation}
          onSubmit={() => {
            setShowCreateReport(false);
            loadReports();
          }}
          onCancel={() => setShowCreateReport(false)}
        />
      )}

      {/* REPORTES FLOTANTES */}
      {reports.length > 0 && (
        <div className="reports-floating">
          <NearbyReports reports={reports} />
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Home;