import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'; 
import { useAuth } from '../../context/AuthContext'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const [showPassword, setShowPassword] = useState(false); 
  
  const navigate = useNavigate();
  const { register, loading, error } = useAuth(); 

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (name && email && password) {
      const newUser = await register(name, email, password);
      
      if (newUser) {
        setMessage('Registrasi Berhasil! Silakan masuk.');
        
        setTimeout(() => {
          navigate('/login'); 
        }, 1500); 
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> 
      
      <div className="flex justify-center items-center pt-10 pb-16">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">

          <h1 className="text-3xl font-bold text-gray-800">Register</h1>
          <p className="text-gray-500 mt-1 mb-8">Buat akun baru</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Error & Success Message */}
            {error && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-lg border border-red-200">{error}</p>}
            {message && <p className="text-green-600 text-sm bg-green-100 p-3 rounded-lg border border-green-200">{message}</p>}

            {/* Nama */}
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition duration-150"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Universitas</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition duration-150"
                placeholder="nama@uneed.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password dengan Show/Hide */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition duration-150 pr-16" 
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                {/* Tombol Show/Hide */}
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility}

                  className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 text-sm font-medium text-gray-500 cursor-pointer hover:text-pink-500 focus:outline-none bg-transparent border-none"
                >
                  {/* Teks tombol yang berubah secara dinamis */}
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="bg-pink-500 text-white py-3 rounded-lg mt-4 font-semibold hover:bg-pink-600 transition duration-150"
              disabled={loading}
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>

            <p className="text-center text-sm mt-2">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-pink-500 font-medium hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;