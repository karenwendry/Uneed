// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoUneed from "../assets/images/UneedYellow.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/catalogue?search=${keyword}`);
    }
  };

  const Logo = (
    <Link to="/" className="flex items-center">
      <img
        src={logoUneed}
        alt="Uneed Logo"
        className="h-16 w-auto object-contain"
      />
    </Link>
  );

  if (isAuthPage) {
    return (
      <nav className="w-full bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-center md:justify-start">
          {Logo}
        </div>
      </nav>
    );
  }

  if (user) {
    return (
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
          <div className="flex items-center gap-8">
            {Logo}

            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <Link
                to="/home"
                className={`${
                  location.pathname === "/home"
                    ? "text-black border-b-2 border-black"
                    : "hover:text-black"
                } pb-1`}
              >
                Beranda
              </Link>
              <Link
                to="/catalogue"
                className={`${
                  location.pathname === "/catalogue"
                    ? "text-black border-b-2 border-black"
                    : "hover:text-black"
                } pb-1`}
              >
                Katalog
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="Cari barang..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>

            <div className="group relative">
              <Link to="/profile">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                  alt="User"
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 hover:ring-2 hover:ring-pink-500 transition"
                />
              </Link>

              <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                  <p className="px-4 py-2 text-xs text-gray-500 truncate border-b border-gray-100 mb-1">
                    {user.email}
                  </p>

                  <Link
                    to="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
                  >
                    Profil Saya
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md mt-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {Logo}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-pink-600 font-medium hover:bg-pink-50 rounded-lg transition"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
