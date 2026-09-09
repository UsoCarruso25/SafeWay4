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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        animation: 'slideUp 0.5s ease'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#4A6CF7', margin: '0 0 8px 0' }}>
            SafaWay
          </h1>
          <h2 style={{ fontSize: '24px', color: '#333', margin: '0 0 8px 0' }}>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            {isLogin ? 'Bienvenido de vuelta' : 'Únete a la comunidad'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '20px',
            border: '1px solid #ffcdd2'
          }}>
            ❌ {error}
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