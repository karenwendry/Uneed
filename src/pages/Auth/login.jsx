import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';


const Login = ({ isEmbedded = false, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

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
    <div className={isEmbedded ? "w-full h-full" : "min-h-screen bg-gray-50"}>

      {!isEmbedded && <Navbar />}

      
      <div className={isEmbedded ? "flex justify-center items-center h-full" : "flex justify-center items-center pt-10 pb-16"}>
        

        <div className={`w-full max-w-md bg-white p-8 md:p-10 rounded-xl ${isEmbedded ? "" : "shadow-lg border border-gray-100"}`}>
          
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-500 mt-1 mb-8">Masuk ke akun Anda</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-lg border border-red-200">{error}</p>}

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

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition duration-150 pr-16"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4 text-sm font-medium text-gray-500 cursor-pointer hover:text-pink-500 focus:outline-none bg-transparent border-none"
                >
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
           
              {isEmbedded ? (
                <button type="button" onClick={onSwitchMode} className="text-pink-500 font-medium hover:underline bg-transparent border-none cursor-pointer">
                  Daftar
                </button>
              ) : (
                <Link to="/register" className="text-pink-500 font-medium hover:underline">
                  Daftar
                </Link>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;