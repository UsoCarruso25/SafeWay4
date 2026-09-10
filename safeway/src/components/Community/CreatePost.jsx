// src/components/Community/CreatePost.jsx
import React, { useState } from 'react';
import { X, MapPin, Send, Image as ImageIcon, Tag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = [
  { id: 'info', label: 'Información', icon: 'ℹ️' },
  { id: 'event', label: 'Evento', icon: '🎉' },
  { id: 'alert', label: 'Alerta', icon: '🚨' },
  { id: 'question', label: 'Pregunta', icon: '❓' },
  { id: 'discussion', label: 'Discusión', icon: '💬' },
];

const CreatePost = ({ onSubmit, onCancel }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('info');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({
      userId: user.id,
      title: title.trim(),
      content: content.trim(),
      category,
      locationName: location.trim() || null,
      latitude: null,
      longitude: null,
    });
  };

  return (
    <div className="create-post">
      <header className="create-post-header">
        <div>
          <h4>Nueva publicación</h4>
          <p className="create-post-sub">Comparte con la comunidad</p>
        </div>
        <button onClick={onCancel} className="create-post-close" aria-label="Cerrar">
          <X size={18} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la publicación"
          required
          maxLength={80}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué quieres compartir con la comunidad?"
          rows="3"
          required
          maxLength={500}
        />

        {/* Categorías como chips */}
        <div className="create-post-categories">
          <span className="create-post-cat-label">
            <Tag size={12} /> Categoría
          </span>
          <div className="create-post-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`create-post-chip ${
                  category === cat.id ? 'active' : ''
                }`}
                onClick={() => setCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ubicación */}
        <div className="create-post-location">
          <MapPin size={15} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ubicación (opcional)"
          />
        </div>

        <div className="create-post-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary btn-sm"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-cta btn-sm">
            <Send size={14} /> Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;