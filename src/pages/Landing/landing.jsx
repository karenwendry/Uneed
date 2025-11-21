// src/pages/Landing/Landing.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Landing = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar /> 
      
      <div className="flex-grow max-w-7xl mx-auto px-5 pb-20"> 
        
        {/* Banner (Hero Section) */}
        <div className="w-full relative mt-8">
          <img
            src="/landing.png"
            alt="Landing Banner"
            className="w-full h-[420px] object-cover rounded-xl shadow-lg" 
          />

          {/* Text overlay */}
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
            <h1 className="text-4xl font-bold drop-shadow-md">
              Temukan Barang Kampus Favoritmu!
            </h1>
            <p className="mt-2 text-lg drop-shadow-sm">
              Belanjalah barang-barang kampus dengan mudah dan aman.
            </p>

            <Link to="/catalogue" className="mt-5 px-6 py-3 bg-pink-500 hover:bg-pink-600 transition duration-150 text-white rounded-full font-semibold inline-block">
              Jelajahi Sekarang
            </Link>
          </div>
        </div>

        {/* Produk Terlaris */}
        <div className="mt-16">
          <h2 className="font-bold text-2xl">Produk Terlaris</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            
            {/* Item 1 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="/laptop.png" alt="Laptop" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">Laptop Acer Aspire 5</p>
              <p className="text-pink-600 font-bold text-md">Rp 5.300.000</p>
            </div>
            
            {/* Item 2 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="/buku.png" alt="Buku" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">Buku Teks Kimia Organik</p>
              <p className="text-pink-600 font-bold text-md">Rp 120.000</p>
            </div>
            
            {/* Item 3 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="/ransel.png" alt="Ransel" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">Ransel Jansport</p>
              <p className="text-pink-600 font-bold text-md">Rp 460.000</p>
            </div>
            
          </div>
        </div>

        {/* Kategori */}
        <div className="mt-16">
          <h2 className="font-bold text-2xl">Kategori</h2>

          <div className="flex gap-8 justify-between mt-6 flex-wrap">
            <div className="text-center">
              <img src="/cat1.png" alt="Kategori 1" className="w-20 h-20 object-cover rounded-full shadow-lg hover:scale-105 transition duration-300 cursor-pointer" />
              <p className="text-sm mt-2">Elektronik</p>
            </div>
            <div className="text-center">
              <img src="/cat2.png" alt="Kategori 2" className="w-20 h-20 object-cover rounded-full shadow-lg hover:scale-105 transition duration-300 cursor-pointer" />
              <p className="text-sm mt-2">Buku</p>
            </div>
            <div className="text-center">
              <img src="/cat3.png" alt="Kategori 3" className="w-20 h-20 object-cover rounded-full shadow-lg hover:scale-105 transition duration-300 cursor-pointer" />
              <p className="text-sm mt-2">Peralatan</p>
            </div>
            <div className="text-center">
              <img src="/cat4.png" alt="Kategori 4" className="w-20 h-20 object-cover rounded-full shadow-lg hover:scale-105 transition duration-300 cursor-pointer" />
              <p className="text-sm mt-2">Furniture</p>
            </div>
            <div className="text-center">
              <img src="/cat5.png" alt="Kategori 5" className="w-20 h-20 object-cover rounded-full shadow-lg hover:scale-105 transition duration-300 cursor-pointer" />
              <p className="text-sm mt-2">Alat Tulis</p>
            </div>
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Landing;