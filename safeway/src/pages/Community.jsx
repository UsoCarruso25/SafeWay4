// src/pages/Community.jsx
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import TopBar from '../components/Layout/TopBar';
import BottomNav from '../components/Layout/BottomNav';
import CreatePost from '../components/Community/CreatePost';
import PostCard from '../components/Community/PostCard';
import { useAuth } from '../context/AuthContext';
import { supabaseAPI } from '../api/supabaseAPI';

const FILTERS = [
  { id: 'all', label: 'Todo', icon: '✨' },
  { id: 'alert', label: 'Alertas', icon: '🚨' },
  { id: 'event', label: 'Eventos', icon: '🎉' },
  { id: 'info', label: 'Info', icon: 'ℹ️' },
  { id: 'question', label: 'Preguntas', icon: '❓' },
];

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await supabaseAPI.createCommunityPost(postData);
      setShowCreate(false);
      loadPosts();
    } catch (error) {
      console.error('Error creando post:', error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesFilter =
      activeFilter === 'all' || post.category === activeFilter;
    const matchesSearch =
      !searchQuery ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-container">
      <TopBar />

      <main className="page-content">
        {/* HERO */}
        <header className="community-hero">
          <div className="community-hero-row">
            <div>
              <h1 className="page-title">Comunidad</h1>
              <p className="page-subtitle">
                {user?.email || 'Usuario'} · {posts.length} publicaciones
              </p>
            </div>
            <button
              className="community-new-btn"
              onClick={() => setShowCreate(true)}
              aria-label="Nueva publicación"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* SEARCH */}
          <div className="community-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar publicaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* FILTROS */}
          <div className="community-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                className={`community-filter ${
                  activeFilter === filter.id ? 'active' : ''
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* CREATE POST */}
        {showCreate && (
          <CreatePost
            onSubmit={handleCreatePost}
            onCancel={() => setShowCreate(false)}
          />
        )}

        {/* FEED */}
        {loading ? (
          <div className="community-loading">
            <div className="spinner" style={{
              width: 32,
              height: 32,
              borderTopColor: '#5DC8B4',
              borderRightColor: '#FFC857',
              borderBottomColor: '#FF5D3A',
            }} />
            <p>Cargando publicaciones...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="feed-empty">
            <div className="feed-empty-icon">
              {searchQuery || activeFilter !== 'all' ? '🔍' : '📝'}
            </div>
            <p className="feed-empty-title">
              {searchQuery || activeFilter !== 'all'
                ? 'Sin resultados'
                : 'No hay publicaciones aún'}
            </p>
            <p className="feed-empty-sub">
              {searchQuery || activeFilter !== 'all'
                ? 'Prueba con otro filtro o búsqueda'
                : '¡Sé el primero en compartir algo!'}
            </p>
            {!searchQuery && activeFilter === 'all' && (
              <button
                className="btn btn-cta btn-sm"
                onClick={() => setShowCreate(true)}
                style={{ marginTop: 14 }}
              >
                <Plus size={16} /> Crear publicación
              </button>
            )}
          </div>
        ) : (
          <div className="feed-list">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Community;