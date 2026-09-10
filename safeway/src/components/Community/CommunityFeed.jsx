// src/components/Community/CommunityFeed.jsx
import React, { useState, useEffect } from 'react';
import { supabaseAPI } from '../../api/supabaseAPI';
import LoadingSpinner from '../Common/LoadingSpinner';
import PostCard from './PostCard';

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
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📝</div>
          <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>No hay publicaciones aún</p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>¡Sé el primero en compartir algo con tu barrio!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;