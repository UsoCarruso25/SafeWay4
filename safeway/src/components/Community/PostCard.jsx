// src/components/Community/PostCard.jsx
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Clock, MapPin } from 'lucide-react';
import { supabaseAPI } from '../../api/supabaseAPI';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      await supabaseAPI.likePost(post.id);
      setLiked(!liked);
      setLikesCount(prev => liked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error('Error dando like:', error);
    }
  };

  const getCategoryStyle = (category) => {
    const styles = {
      event: { bg: 'var(--amber-tint)', text: 'var(--amber-dark)' },
      alert: { bg: 'var(--coral-tint)', text: 'var(--coral-dark)' },
      info: { bg: 'var(--teal-tint)', text: 'var(--teal-dark)' },
      question: { bg: 'var(--amber-tint)', text: 'var(--amber-dark)' },
      discussion: { bg: 'var(--teal-tint)', text: 'var(--teal-dark)' },
    };
    return styles[category] || { bg: 'var(--line-light)', text: 'var(--text-secondary)' };
  };

  const getCategoryLabel = (category) => {
    const labels = {
      event: 'Evento',
      alert: 'Alerta',
      info: 'Info',
      question: 'Pregunta',
      discussion: 'Discusión'
    };
    return labels[category] || category;
  };

  const categoryStyle = getCategoryStyle(post.category);

  return (
    <div className="card" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--amber)',
          fontFamily: 'var(--font-display)',
          fontWeight: '700',
          flexShrink: 0
        }}>
          {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '700', fontSize: '14px' }}>
              {post.profiles?.username || 'Usuario'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
              <Clock size={12} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
              {new Date(post.created_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            <span className="chip" style={{ background: categoryStyle.bg, color: categoryStyle.text }}>
              {getCategoryLabel(post.category)}
            </span>
          </div>

          <h4 style={{ margin: '8px 0 4px 0', fontSize: '16px', fontFamily: 'var(--font-display)' }}>{post.title}</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 8px 0' }}>{post.content}</p>

          {post.location_name && (
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <MapPin size={14} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
              {post.location_name}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={handleLike}
              className={`action-pill ${liked ? 'liked' : ''}`}
            >
              <Heart size={15} fill={liked ? 'var(--coral-dark)' : 'none'} />
              <span>{likesCount}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="action-pill"
            >
              <MessageCircle size={15} />
              <span>{post.comments?.[0]?.count || 0}</span>
            </button>
            <button className="action-pill">
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;