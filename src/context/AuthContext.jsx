// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/auth'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await apiLogin(email, password); 
      setUser(loggedInUser);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Login gagal.');
      setLoading(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await apiRegister(name, email, password); 
      setLoading(false);
      return newUser; 
    } catch (err) {
      setError(err.message || 'Registrasi gagal.');
      setLoading(false);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    apiLogout();
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};