import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'; 
import { useAuth } from '../../context/AuthContext'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // STATE BARU untuk mengontrol tampilan password (default: false/tersembunyi)
  const [showPassword, setShowPassword] = useState(false); 
  
  const navigate = useNavigate();
  const { login, loading, error } = useAuth(); 

  // FUNGSI untuk mengubah status showPassword
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const success = await login(email, password);
      if (success) {
        navigate('/home'); 
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> 
      
      <div className="flex justify-center items-center pt-10 pb-16"> 
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
          
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-500 mt-1 mb-8">Masuk ke akun Anda</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-lg border border-red-200">{error}</p>}

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
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
                  // GUNAKAN STATE showPassword untuk menentukan tipe input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  // Menambahkan padding di kanan (pr-16) agar tombol tidak menutupi teks password
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition duration-150 pr-16"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                
                {/* Tombol Show/Hide */}
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility}
                  // Styling untuk memposisikan tombol di tengah vertikal input
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
              {loading ? 'Memuat...' : 'Masuk'}
            </button>

            <p className="text-center text-sm mt-2">
              Belum punya akun?{" "}
              <Link to="/register" className="text-pink-500 font-medium hover:underline">
                Daftar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;