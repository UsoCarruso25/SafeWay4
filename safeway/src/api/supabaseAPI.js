// src/api/supabaseAPI.js
import { supabase } from './supabaseClient';

// API para interactuar con la base de datos
export const supabaseAPI = {
  // =====================
  // AUTENTICACIÓN
  // =====================
  
  // Registro de usuario
  async signUp(email, password, username) {
    try {
      // 1. Crear usuario en auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          }
        }
      });
      
      if (authError) throw authError;
      
      // 2. Crear perfil en la tabla profiles
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              username: username,
              created_at: new Date().toISOString(),
              safety_score: 50
            }
          ]);
        
        if (profileError) {
          console.error('Error creando perfil:', profileError);
          // No lanzamos error aquí porque el usuario ya fue creado
        }
      }
      
      return authData;
    } catch (error) {
      console.error('Error en signUp:', error);
      throw error;
    }
  },
  
  // Inicio de sesión
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error en signIn:', error);
      throw error;
    }
  },
  
  // Cerrar sesión
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error en signOut:', error);
      throw error;
    }
  },
  
  // Obtener usuario actual
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  },
  
  // Obtener perfil de usuario
  async getProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      return null;
    }
  },
  
  // Actualizar perfil
  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  },
  
  // =====================
  // REPORTES
  // =====================
  
  // Crear un reporte
  async createReport(reportData) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          user_id: reportData.userId,
          title: reportData.title,
          description: reportData.description,
          category: reportData.category,
          latitude: reportData.latitude,
          longitude: reportData.longitude,
          severity: reportData.severity || 3,
          address: reportData.address || '',
          is_anonymous: reportData.isAnonymous || false,
          images: reportData.images || [],
          created_at: new Date().toISOString(),
          status: 'pending'
        }])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error creando reporte:', error);
      throw error;
    }
  },
  
  // Obtener reportes cercanos
  async getNearbyReports(lat, lng, radius = 5) {
    try {
      const { data, error } = await supabase
        .rpc('get_nearby_reports', {
          lat_input: lat,
          lng_input: lng,
          radius_km: radius
        });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo reportes cercanos:', error);
      return [];
    }
  },
  
  // Obtener reportes recientes
  async getRecentReports(limit = 20) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo reportes recientes:', error);
      return [];
    }
  },
  
  // Votar un reporte
  async voteReport(reportId, voteType) {
    try {
      const { data, error } = await supabase
        .rpc('vote_report', {
          report_id: reportId,
          vote_type: voteType
        });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error votando reporte:', error);
      throw error;
    }
  },
  
  // =====================
  // POSTS DE COMUNIDAD
  // =====================
  
  // Crear post
  async createPost(postData) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert([{
          user_id: postData.userId,
          title: postData.title,
          content: postData.content,
          category: postData.category || 'info',
          latitude: postData.latitude || null,
          longitude: postData.longitude || null,
          location_name: postData.locationName || '',
          images: postData.images || [],
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error creando post:', error);
      throw error;
    }
  },
  
  // Obtener posts de comunidad
  async getCommunityPosts(limit = 20) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          ),
          comments:comments (count),
          likes:likes (count)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo posts:', error);
      return [];
    }
  },
  
  // Dar like a un post
  async likePost(postId, userId) {
    try {
      // 1. Insertar like
      const { error: likeError } = await supabase
        .from('likes')
        .insert([{
          user_id: userId,
          post_id: postId
        }]);
      
      if (likeError) throw likeError;
      
      // 2. Actualizar contador
      const { data, error } = await supabase
        .from('community_posts')
        .update({ 
          likes_count: supabase.rpc('increment_likes', { post_id: postId })
        })
        .eq('id', postId)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error dando like:', error);
      throw error;
    }
  },
  
  // Agregar comentario
  async addComment(postId, userId, content) {
    try {
      // 1. Insertar comentario
      const { data: commentData, error: commentError } = await supabase
        .from('comments')
        .insert([{
          post_id: postId,
          user_id: userId,
          content: content,
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (commentError) throw commentError;
      
      // 2. Actualizar contador de comentarios
      await supabase
        .from('community_posts')
        .update({ 
          comments_count: supabase.rpc('increment_comments', { post_id: postId })
        })
        .eq('id', postId);
      
      return commentData[0];
    } catch (error) {
      console.error('Error agregando comentario:', error);
      throw error;
    }
  },
  
  // =====================
  // LUGARES FAVORITOS
  // =====================
  
  // Agregar favorito
  async addFavorite(favoriteData) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{
          user_id: favoriteData.userId,
          name: favoriteData.name,
          latitude: favoriteData.latitude,
          longitude: favoriteData.longitude,
          address: favoriteData.address || '',
          category: favoriteData.category || 'other'
        }])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error agregando favorito:', error);
      throw error;
    }
  },
  
  // Obtener favoritos
  async getFavorites(userId) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo favoritos:', error);
      return [];
    }
  },
  
  // Eliminar favorito
  async removeFavorite(favoriteId) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error eliminando favorito:', error);
      throw error;
    }
  },
  
  // =====================
  // RUTAS SEGURAS
  // =====================
  
  // Guardar ruta
  async saveRoute(routeData) {
    try {
      const { data, error } = await supabase
        .from('saved_routes')
        .insert([{
          user_id: routeData.userId,
          name: routeData.name,
          waypoints: routeData.waypoints,
          distance_km: routeData.distanceKm || 0,
          estimated_time_min: routeData.estimatedTime || 0,
          safety_score: routeData.safetyScore || 0,
          is_public: routeData.isPublic || false
        }])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error guardando ruta:', error);
      throw error;
    }
  },
  
  // Obtener rutas guardadas
  async getSavedRoutes(userId) {
    try {
      const { data, error } = await supabase
        .from('saved_routes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error obteniendo rutas:', error);
      return [];
    }
  }
};

// Funciones SQL para incrementar contadores (ejecutar en Supabase SQL Editor)
/*
CREATE OR REPLACE FUNCTION increment_likes(post_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  UPDATE community_posts 
  SET likes_count = likes_count + 1 
  WHERE id = post_id
  RETURNING likes_count INTO current_count;
  RETURN current_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_comments(post_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  UPDATE community_posts 
  SET comments_count = comments_count + 1 
  WHERE id = post_id
  RETURNING comments_count INTO current_count;
  RETURN current_count;
END;
$$ LANGUAGE plpgsql;
*/

export default supabaseAPI;