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

  const getCategoryColor = (category) => {
    const colors = {
      event: '#4CAF50',
      alert: '#F44336',
      info: '#2196F3',
      question: '#FFC107',
      discussion: '#9C27B0'
    };
    return colors[category] || '#666';
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

  return (
    <div className="card" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#4A6CF7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '700',
          flexShrink: 0
        }}>
          {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '600', fontSize: '14px' }}>
              {post.profiles?.username || 'Usuario'}
            </span>
            <span style={{ fontSize: '12px', color: '#999' }}>
              <Clock size={12} style={{ marginRight: '4px' }} />
              {new Date(post.created_at).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'short', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            <span style={{
              padding: '2px 10px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '600',
              background: getCategoryColor(post.category) + '20',
              color: getCategoryColor(post.category)
            }}>
              {getCategoryLabel(post.category)}
            </span>
          </div>
          
          <h4 style={{ margin: '8px 0 4px 0', fontSize: '16px' }}>{post.title}</h4>
          <p style={{ fontSize: '14px', color: '#555', margin: '4px 0 8px 0' }}>{post.content}</p>
          
          {post.location_name && (
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              <MapPin size={14} style={{ marginRight: '4px' }} />
              {post.location_name}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button 
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: liked ? '#F44336' : '#666',
                fontSize: '13px',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={18} fill={liked ? '#F44336' : 'none'} />
              <span>{likesCount}</span>
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '13px',
                padding: '4px 8px',
                borderRadius: '6px'
              }}
            >
              <MessageCircle size={18} />
              <span>{post.comments?.[0]?.count || 0}</span>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              fontSize: '13px',
              padding: '4px 8px',
              borderRadius: '6px'
            }}>
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;