// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Community from './pages/Community';
import Settings from './pages/Settings';
import Login from './components/Auth/Login';

// CSS
import './App.css';
import './styles/globals.css';

/* =====================================================
   LOADING SPINNER - Estilo marca SafaWay / MORDISCO
===================================================== */

const LoadingSpinner = () => (
  <div className="app-loading">
    <div className="app-loading-spinner" />
    <p className="app-loading-text">Cargando SafaWay...</p>
  </div>
);

/* =====================================================
   RUTA PROTEGIDA
===================================================== */

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/* =====================================================
   CONTENIDO DE LA APP
===================================================== */

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <main className="app-main">
        <Routes>
          {/* Ruta pública - Login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

/* =====================================================
   APP ROOT
===================================================== */

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;