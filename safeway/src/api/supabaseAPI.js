// src/api/supabaseAPI.js
import { supabase } from './supabaseClient';

/* =====================================================
   AUTENTICACIÓN
===================================================== */

export const supabaseAPI = {
  /* ---------- AUTH ---------- */

  async signUp(email, password, username) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  /* ---------- PROFILES ---------- */

  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /* =====================================================
     REPORTES
  ===================================================== */

  /**
   * Obtener reportes cercanos usando la función RPC
   * @param {number} lat - Latitud del usuario
   * @param {number} lng - Longitud del usuario
   * @param {number} radiusKm - Radio de búsqueda en km (default: 2)
   */
  async getNearbyReports(lat, lng, radiusKm = 2) {
    const { data, error } = await supabase.rpc('nearby_reports', {
      user_lat: lat,
      user_lng: lng,
      radius_km: radiusKm,
    });
    if (error) throw error;
    return data || [];
  },

  /**
   * Obtener todos los reportes (para feed general)
   */
  async getAllReports(limit = 50) {
    const { data, error } = await supabase
      .from('reports')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .eq('status', 'activo')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  /**
   * Crear un reporte
   */
  async createReport({
    userId,
    title,
    description,
    category,
    severity,
    latitude,
    longitude,
    imageUrl = null,
  }) {
    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          user_id: userId,
          title,
          description,
          category,
          severity,
          latitude,
          longitude,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Incrementar contador en el perfil
    try {
      await supabase.rpc('increment_reports_count', { user_id_param: userId });
    } catch (err) {
      console.warn('No se pudo incrementar contador:', err);
    }

    return data;
  },

  /**
   * Actualizar un reporte
   */
  async updateReport(reportId, updates) {
    const { data, error } = await supabase
      .from('reports')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reportId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Borrar un reporte
   */
  async deleteReport(reportId) {
    const { error } = await supabase
      .from('reports')
      .delete()
      .eq('id', reportId);
    if (error) throw error;
  },

  /**
   * Votar en un reporte (up/down)
   */
  async voteReport(reportId, direction = 'up') {
    const column = direction === 'up' ? 'votes_up' : 'votes_down';
    const { data, error } = await supabase.rpc('increment_vote', {
      report_id: reportId,
      vote_column: column,
    });
    if (error) throw error;
    return data;
  },

  /* =====================================================
     COMUNIDAD
  ===================================================== */

  /**
   * Obtener posts de la comunidad
   */
  async getCommunityPosts(limit = 30) {
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  /**
   * Obtener un post con sus comentarios
   */
  async getPostWithComments(postId) {
    const { data: post, error: postError } = await supabase
      .from('community_posts')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .eq('id', postId)
      .single();
    if (postError) throw postError;

    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (commentsError) throw commentsError;

    return { ...post, comments: comments || [] };
  },

  /**
   * Crear un post en la comunidad
   */
  async createCommunityPost({
    userId,
    title,
    content,
    category = 'info',
    latitude = null,
    longitude = null,
    locationName = null,
  }) {
    const { data, error } = await supabase
      .from('community_posts')
      .insert([
        {
          user_id: userId,
          title,
          content,
          category,
          latitude,
          longitude,
          location_name: locationName,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Actualizar post
   */
  async updateCommunityPost(postId, updates) {
    const { data, error } = await supabase
      .from('community_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Borrar post
   */
  async deleteCommunityPost(postId) {
    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', postId);
    if (error) throw error;
  },

  /**
   * Dar like a un post
   */
  async likePost(postId) {
    const { data, error } = await supabase.rpc('increment_post_likes', {
      post_id_param: postId,
    });
    if (error) throw error;
    return data;
  },

  /* ---------- COMENTARIOS ---------- */

  async getPostComments(postId) {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async createComment({ postId, userId, content }) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, user_id: userId, content }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteComment(commentId) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    if (error) throw error;
  },

  /* =====================================================
     AUTORIDADES
  ===================================================== */

  /**
   * Obtener autoridades cercanas
   */
  async getNearbyAuthorities(lat, lng, radiusKm = 5) {
    const { data, error } = await supabase.rpc('nearby_authorities', {
      user_lat: lat,
      user_lng: lng,
      radius_km: radiusKm,
    });
    if (error) throw error;
    return data || [];
  },

  /**
   * Obtener todas las autoridades
   */
  async getAllAuthorities() {
    const { data, error } = await supabase
      .from('authorities')
      .select('*')
      .order('name');
    if (error) throw error;
    return data || [];
  },

  /* =====================================================
     BÚSQUEDA GLOBAL
  ===================================================== */

  /**
   * Buscar en reportes, posts y autoridades
   */
  async searchAll(query) {
    if (!query || query.trim().length < 2) return [];
    const { data, error } = await supabase.rpc('search_all', {
      search_query: query.trim(),
    });
    if (error) throw error;
    return data || [];
  },

  /* =====================================================
     STORAGE
  ===================================================== */

  /**
   * Subir imagen de reporte
   */
  async uploadReportImage(userId, file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('report-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('report-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  },

  async deleteReportImage(filePath) {
    const { error } = await supabase.storage
      .from('report-images')
      .remove([filePath]);
    if (error) throw error;
  },
};

export default supabaseAPI;