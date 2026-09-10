// src/components/Reports/CreateReport.jsx
import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, AlertTriangle, Send, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabaseAPI } from '../../api/supabaseAPI';

const CATEGORIES = [
  { id: 'robo', label: 'Robo', icon: '🚨', color: '#FF5D5D' },
  { id: 'accidente', label: 'Accidente', icon: '🚗', color: '#FFB84D' },
  { id: 'iluminacion', label: 'Iluminación', icon: '💡', color: '#FFC857' },
  { id: 'via', label: 'Vía', icon: '🚧', color: '#7B68EE' },
  { id: 'sospechoso', label: 'Sospechoso', icon: '👤', color: '#5C9CFF' },
  { id: 'otro', label: 'Otro', icon: '📌', color: '#8B92A7' },
];

const SEVERITIES = [
  { value: 1, label: 'Bajo', color: '#4DD4C0' },
  { value: 2, label: 'Medio-bajo', color: '#84CC16' },
  { value: 3, label: 'Medio', color: '#FFC857' },
  { value: 4, label: 'Alto', color: '#FF8C42' },
  { value: 5, label: 'Crítico', color: '#FF5D5D' },
];

const CreateReport = ({ onSubmit, onCancel, userLocation }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('robo');
  const [severity, setSeverity] = useState(3);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede pesar más de 5 MB');
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    if (!userLocation) {
      setError('Necesitas compartir tu ubicación');
      return;
    }

    setUploading(true);
    setError('');

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await supabaseAPI.uploadReportImage(user.id, image);
      }

      await supabaseAPI.createReport({
        userId: user.id,
        title: title.trim(),
        description: description.trim(),
        category,
        severity,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        imageUrl,
      });

      onSubmit?.();
    } catch (err) {
      console.error('Error creando reporte:', err);
      setError(err.message || 'Error al crear el reporte');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="create-report">
      <header className="create-report-header">
        <div>
          <h4>Nuevo reporte</h4>
          <p className="create-report-sub">
            {userLocation ? '📍 Ubicación lista' : '⏳ Esperando ubicación...'}
          </p>
        </div>
        <button onClick={onCancel} className="create-report-close" disabled={uploading}>
          <X size={18} />
        </button>
      </header>

      {error && <div className="create-report-error">⚠️ {error}</div>}

      <form onSubmit={handleSubmit} className="create-report-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del reporte"
          required
          maxLength={80}
          disabled={uploading}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe qué está pasando..."
          rows="3"
          required
          maxLength={500}
          disabled={uploading}
        />

        <div className="create-report-section">
          <span className="create-report-label">
            <AlertTriangle size={12} /> Categoría
          </span>
          <div className="create-report-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`create-report-chip ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
                disabled={uploading}
                style={
                  category === cat.id
                    ? { borderColor: cat.color, background: `${cat.color}22`, color: cat.color }
                    : {}
                }
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="create-report-section">
          <span className="create-report-label">
            Severidad: <strong style={{ color: SEVERITIES[severity - 1].color }}>{SEVERITIES[severity - 1].label}</strong>
          </span>
          <input
            type="range"
            min="1"
            max="5"
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            disabled={uploading}
            className="create-report-range"
            style={{ '--range-color': SEVERITIES[severity - 1].color }}
          />
        </div>

        <div className="create-report-section">
          <span className="create-report-label">
            <ImageIcon size={12} /> Imagen (opcional)
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
            disabled={uploading}
          />
          {imagePreview ? (
            <div className="create-report-image-preview">
              <img src={imagePreview} alt="Preview" />
              <button
                type="button"
                className="create-report-image-remove"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                disabled={uploading}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="create-report-image-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <ImageIcon size={16} />
              Adjuntar imagen
            </button>
          )}
        </div>

        <div className="create-report-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary btn-sm"
            disabled={uploading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-cta btn-sm" disabled={uploading}>
            {uploading ? <Loader size={14} className="spin" /> : <Send size={14} />}
            {uploading ? 'Enviando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;