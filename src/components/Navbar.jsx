// src/components/Navbar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
 
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // --- Komponen Gambar Logo ---
  // Pastikan Anda memiliki file 'logo.png' di folder 'public'
  const LogoImage = (
    <img 
      src="/logo.png" 
      alt="Uneed Logo" 
      className="h-8 w-auto" // Tinggi 32px
    />
  );
  // ---------------------------

  // Tampilan Navbar untuk Login/Register (Hanya Logo)
  if (isAuthPage) {
    return (
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <Link to="/" className="flex items-center">
            {LogoImage} {/* Tampilkan Gambar Logo */}
          </Link>
        </div>
      </nav>
    );
  }

  // Tampilan Navbar untuk Landing Page (Lengkap)
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          {LogoImage} {/* Tampilkan Gambar Logo */}
        </Link>

        {/* Search Bar */}
        <div className="relative w-1/3 hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-150"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {}
            🔍 
          </div>
        </div>

        {/* Tombol Akses */}
        <div className="flex space-x-3">
          <Link to="/register" className="px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-150 font-medium">
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
