// src/components/Community/PostCard.jsx
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Clock, MapPin, Bookmark, MoreHorizontal } from 'lucide-react';
import { supabaseAPI } from '../../api/supabaseAPI';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const handleLike = async () => {
    try {
      await supabaseAPI.likePost(post.id);
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error('Error dando like:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      event: '#5DC8B4',
      alert: '#FF5D3A',
      info: '#FFC857',
      question: '#A78BFA',
      discussion: '#60A5FA',
    };
    return colors[category] || '#8A96A3';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      event: 'Evento',
      alert: 'Alerta',
      info: 'Info',
      question: 'Pregunta',
      discussion: 'Discusión',
    };
    return labels[category] || category;
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      event: '🎉',
      alert: '🚨',
      info: 'ℹ️',
      question: '❓',
      discussion: '💬',
    };
    return emojis[category] || '📌';
  };

  const color = getCategoryColor(post.category);
  const username = post.profiles?.username || 'Usuario';
  const initial = username.charAt(0).toUpperCase();

  return (
    <article className="post-card">
      {/* HEADER */}
      <header className="post-header">
        <div
          className="post-avatar"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}99)`,
          }}
        >
          {initial}
        </div>
        <div className="post-meta">
          <div className="post-meta-top">
            <span className="post-username">{username}</span>
            <span
              className="post-category"
              style={{ background: `${color}22`, color }}
            >
              {getCategoryEmoji(post.category)} {getCategoryLabel(post.category)}
            </span>
          </div>
          <span className="post-time">
            <Clock size={11} />
            {new Date(post.created_at).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <button className="post-more" aria-label="Más opciones">
          <MoreHorizontal size={18} />
        </button>
      </header>

      {/* BODY */}
      <h4 className="post-title">{post.title}</h4>
      <p className="post-content">{post.content}</p>

      {post.location_name && (
        <div className="post-location">
          <MapPin size={13} />
          {post.location_name}
        </div>
      )}

      {/* ACTIONS */}
      <footer className="post-actions">
        <button
          onClick={handleLike}
          className={`post-action ${liked ? 'liked' : ''}`}
        >
          <Heart size={17} fill={liked ? '#FF5D3A' : 'none'} />
          <span>{likesCount}</span>
        </button>
        <button className="post-action">
          <MessageCircle size={17} />
          <span>{post.comments?.[0]?.count || 0}</span>
        </button>
        <button className="post-action">
          <Share2 size={17} />
        </button>
        <button
          className={`post-action post-save ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(!saved)}
          aria-label="Guardar"
        >
          <Bookmark size={17} fill={saved ? '#FFC857' : 'none'} />
        </button>
      </footer>
    </article>
  );
};

export default PostCard;