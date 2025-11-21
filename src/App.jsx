// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 

// Import Halaman Anda (Disesuaikan dengan nama file Anda)
import LandingPage from './pages/Landing/Landing'; 



// ----------------------------------------------------

// PrivateRoute - Component untuk melindungi rute
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user, loading } = useAuth();
  
  // Anda bisa ganti dengan komponen Loading.jsx
  if (loading) return <div className="text-center pt-20">Memuat...</div>; 
  
  // Jika tidak ada user, arahkan ke halaman login
  return user ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Halaman Publik */}
          <Route path="/" element={<LandingPage />} />


          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
