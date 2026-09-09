// src/components/Community/CreatePost.jsx
import React, { useState } from 'react';
import { X, MapPin, Image } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
      longitude: null
    });
  };

  return (
    <div className="card" style={{ padding: '16px', marginBottom: '16px', background: '#f8f9fa' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ margin: 0 }}>Nueva publicación</h4>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la publicación"
          style={{
            padding: '10px 14px',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            background: 'white'
          }}
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué quieres compartir?"
          rows="3"
          style={{
            padding: '10px 14px',
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'inherit',
            resize: 'vertical',
            background: 'white'
          }}
          required
        />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none',
              background: 'white',
              flex: 1
            }}
          >
            <option value="info">Información</option>
            <option value="event">Evento</option>
            <option value="alert">Alerta</option>
            <option value="question">Pregunta</option>
            <option value="discussion">Discusión</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 2, background: 'white', padding: '4px 12px', borderRadius: '8px', border: '1px solid #e8e8e8' }}>
            <MapPin size={16} color="#999" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ubicación (opcional)"
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                padding: '6px 0',
                width: '100%',
                background: 'transparent'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;