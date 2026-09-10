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

  if (posts.length === 0) {
    return (
      <div className="feed-empty">
        <div className="feed-empty-icon">📝</div>
        <p className="feed-empty-title">No hay publicaciones aún</p>
        <p className="feed-empty-sub">¡Sé el primero en compartir algo!</p>
      </div>
    );
  }

  return (
    <div className="feed-list">
      {posts.map((post) => (
        <article key={post.id} className="feed-post">
          <header className="feed-post-header">
            <div className="feed-avatar">
              {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <div className="feed-username">
                {post.profiles?.username || 'Usuario'}
              </div>
              <div className="feed-date">
                {new Date(post.created_at).toLocaleDateString('es-ES')}
              </div>
            </div>
          </header>
          <h4 className="feed-post-title">{post.title}</h4>
          <p className="feed-post-content">{post.content}</p>
        </article>
      ))}
    </div>
  );
};

export default CommunityFeed;