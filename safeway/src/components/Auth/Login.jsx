// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir al home
  React.useEffect(() => {
    if (user) {
      console.log('✅ Usuario ya autenticado, redirigiendo...');
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        console.log('🔐 Intentando login...');
        await signIn(email, password);
        console.log('✅ Login exitoso, redirigiendo...');
        // La redirección se hará en el useEffect
      } else {
        if (!username.trim()) {
          throw new Error('El nombre de usuario es requerido');
        }
        console.log('📝 Intentando registro...');
        await signUp(email, password, username);
        alert('¡Registro exitoso! Ahora inicia sesión.');
        setIsLogin(true);
        setUsername('');
        setPassword('');
        setEmail('');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#10151C',
      padding: '20px'
    }}>
      <div style={{
        background: '#F7F5F1',
        borderRadius: '24px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        animation: 'slideUp 0.5s ease'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: '#FF5D3A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px'
          }}>
            <Lock size={20} color="white" />
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: '700', color: '#20241F', margin: '0 0 8px 0' }}>
            Safa<span style={{ color: '#C43F22' }}>Way</span>
          </h1>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#20241F', margin: '0 0 6px 0' }}>
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
          <p style={{ color: '#6B6459', fontSize: '14px', margin: 0 }}>
            {isLogin ? 'Bienvenido de vuelta a tu barrio' : 'Únete a la comunidad de Patio Bonito'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#FFE3DA',
            color: '#C43F22',
            padding: '12px 16px',
            borderRadius: '10px',
            fontSize: '14px',
            marginBottom: '20px',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', color: '#555' }}>
                <User size={18} color="#999" />
                <span>Nombre de usuario</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Elige un nombre de usuario"
                style={{
                  padding: '12px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  width: '100%'
                }}
                required={!isLogin}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', color: '#555' }}>
              <Mail size={18} color="#999" />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={{
                padding: '12px 16px',
                border: '2px solid #e8e8e8',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                width: '100%'
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', color: '#555' }}>
              <Lock size={18} color="#999" />
              <span>Contraseña</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  padding: '12px 44px 12px 16px',
                  border: '2px solid #e8e8e8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  width: '100%'
                }}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px',
              background: '#4A6CF7',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginTop: '8px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#666' }}>
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#4A6CF7',
                fontWeight: '600',
                cursor: 'pointer',
                marginLeft: '6px',
                fontSize: '14px'
              }}
            >
              {isLogin ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;