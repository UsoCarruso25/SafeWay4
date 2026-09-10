// src/components/Auth/Login.jsx
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!username.trim()) throw new Error('El nombre de usuario es requerido');
        await signUp(email, password, username);
        alert('¡Registro exitoso! Ahora inicia sesión.');
        setIsLogin(true);
        setUsername('');
        setPassword('');
        setEmail('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-header">
          <h1 className="login-brand">
            Safa<span>Way</span>
          </h1>
          <h2 className="login-title">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="login-subtitle">
            {isLogin ? 'Bienvenido de vuelta' : 'Únete a la comunidad'}
          </p>
        </header>

        {error && <div className="login-error">❌ {error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="login-field">
              <label>
                <User size={18} />
                <span>Nombre de usuario</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Elige un nombre de usuario"
                required={!isLogin}
              />
            </div>
          )}

          <div className="login-field">
            <label>
              <Mail size={18} />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="login-field">
            <label>
              <Lock size={18} />
              <span>Contraseña</span>
            </label>
            <div className="login-password">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-eye"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-cta login-submit"
          >
            {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
          </button>
        </form>

        <footer className="login-footer">
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="login-switch"
            >
              {isLogin ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;