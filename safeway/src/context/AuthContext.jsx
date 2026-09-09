// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔐 Inicializando AuthContext...');
    
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('🔐 Sesión actual:', session ? '✅ Existe' : '❌ No hay sesión');
        
        if (session) {
          setUser(session.user);
          console.log('✅ Usuario autenticado:', session.user.email);
        } else {
          console.log('ℹ️ No hay usuario autenticado');
        }
      } catch (err) {
        console.error('❌ Error checking session:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔄 Auth event:', event);
        
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          console.log('✅ Usuario ha iniciado sesión:', session.user.email);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          console.log('👋 Usuario ha cerrado sesión');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 Token refrescado');
        }
        
        setLoading(false);
      }
    );

    return () => {
      console.log('🔐 Limpiando suscripción de auth');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, username) => {
    try {
      setError(null);
      console.log('📝 Registrando usuario:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });
      
      if (error) throw error;
      
      console.log('✅ Usuario registrado:', data.user?.email);
      
      // Crear perfil manualmente
      if (data.user) {
        try {
          await supabase
            .from('profiles')
            .insert([{
              id: data.user.id,
              username: username,
              created_at: new Date().toISOString(),
              safety_score: 50
            }]);
          console.log('✅ Perfil creado');
        } catch (profileErr) {
          console.warn('⚠️ Error creando perfil:', profileErr);
        }
      }
      
      return data;
    } catch (err) {
      console.error('❌ Error en signUp:', err);
      setError(err.message);
      throw err;
    }
  };

  const signIn = async (email, password) => {
    try {
      setError(null);
      console.log('🔐 Intentando login:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('❌ Error en login:', error);
        throw error;
      }
      
      console.log('✅ Login exitoso:', data.user.email);
      setUser(data.user);
      return data;
    } catch (err) {
      console.error('❌ Error en signIn:', err);
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      console.log('👋 Cerrando sesión...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      console.log('✅ Sesión cerrada');
    } catch (err) {
      console.error('❌ Error en signOut:', err);
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;