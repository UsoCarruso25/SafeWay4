// src/components/Community/CommunityFeed.jsx
import React, { useState, useEffect } from 'react';
import { supabaseAPI } from '../../api/supabaseAPI';
import LoadingSpinner from '../Common/LoadingSpinner';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await supabaseAPI.getCommunityPosts();
      setPosts(data || []);
    } catch (error) {
      console.error('Error cargando posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {posts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
          <p style={{ color: '#666', fontSize: '14px' }}>No hay publicaciones aún</p>
          <p style={{ fontSize: '13px', color: '#999' }}>¡Sé el primero en compartir algo!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map((post) => (
            <div key={post.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#4A6CF7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>
                  {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>
                    {post.profiles?.username || 'Usuario'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#999' }}>
                    {new Date(post.created_at).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>{post.title}</h4>
              <p style={{ fontSize: '13px', color: '#555', margin: '4px 0' }}>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;