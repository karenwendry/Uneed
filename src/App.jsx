// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 

// Import Halaman Anda (Disesuaikan dengan nama file Anda)
import LandingPage from './pages/Landing/Landing'; 
import LoginPage from './pages/Auth/Login'; 
import RegisterPage from './pages/Auth/Register'; 

// --- Kerangka Home Page (Wajib agar routing berjalan) ---
const HomePage = () => {
    const { logout } = useAuth(); 
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
            <h1 className="text-4xl font-bold text-gray-800">Selamat Datang di Home Page!</h1>
            <p className="mt-4 text-gray-600">Anda berhasil login ke aplikasi Uneed.</p>
            <button 
                onClick={logout} 
                className="bg-red-500 text-white py-2 px-6 rounded-lg mt-8 font-semibold hover:bg-red-600 transition duration-150"
            >
                Logout
            </button>
        </div>
    );
};
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Halaman Private */}
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
