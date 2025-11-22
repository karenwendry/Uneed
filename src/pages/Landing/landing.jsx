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
        <div className="relative w-full rounded-xl overflow-hidden shadow-lg mb-10">
          <div className="bg-gradient-to-r from-[#151875] to-[#2E0A6B] h-[280px] md:h-[320px] w-full flex items-center px-8 md:px-16">
            <div className="max-w-2xl text-white z-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-md">
                Temukan Barang Kampus Favoritmu!
              </h1>
              <p className="text-purple-100 text-lg md:text-xl mb-6 drop-shadow-sm">
                Belanja barang-barang kampus dengan mudah dan aman
              </p>
              <Link
                to="/catalogue"
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform hover:-translate-y-1 inline-block"
              >
                Jelajah Sekarang
              </Link>
            </div>
            <div className="absolute bottom-10 left-0 w-full h-[1px] bg-white opacity-10"></div>
          </div>
        </div>

        {/* Produk Terlaris */}
        <div className="mt-16">
          <h2 className="font-bold text-2xl">Produk Terlaris</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            
            {/* Item 1 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/207970978-.jpg" alt="kertas" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">Kertas Binder A5</p>
              <p className="text-pink-600 font-bold text-md">Rp 7.000</p>
            </div>
            
            {/* Item 2 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="https://yippy.id/_next/image?url=https%3A%2F%2Fyippy-prod.s3.ap-southeast-1.amazonaws.com%2Fimages%2F7I634FC5YWY3XtoukvFErzq3FPn3x505W8RCuvEb.png&w=750&q=75" alt="lanyard" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">Lanyard</p>
              <p className="text-pink-600 font-bold text-md">Rp 35.000</p>
            </div>
            
            {/* Item 3 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="https://m.media-amazon.com/images/I/A1hYgbIabGL._AC_SX679_.jpg" alt="Sticker" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">Sticker Anime 2k/pcs</p>
              <p className="text-pink-600 font-bold text-md">Rp 2.000</p>
            </div>
            
            {/* Item 4 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="https://smb-padiumkm-images-public-prod.oss-ap-southeast-5.aliyuncs.com/product/image/29012023/631a53ab7255a77e0e6f5346/63d5f3ae78816153e3737727/9afc2b2f705e3072b074dc70418e41.png" alt="Pulpen" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">Pulpen</p>
              <p className="text-pink-600 font-bold text-md">Rp 1.000</p>
            </div>

            {/* Item 5 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="https://img.lazcdn.com/g/p/d24622a76c6ff1d2ea19e1d2db8e9151.jpg_720x720q80.jpg_.webp" alt="ID card" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">ID Card Holder</p>
              <p className="text-pink-600 font-bold text-md">Rp 4.000</p>
            </div>

            {/* Item 6 */}
            <div className="border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img src="https://down-id.img.susercontent.com/file/id-11134207-7rbk7-mal5t8ww6k0p6a.webp" alt="Turbo kipas" className="rounded-md h-32 w-full object-cover" />
              <p className="mt-3 font-semibold text-sm">Turbo Kipas Es</p>
              <p className="text-pink-600 font-bold text-md">Rp 90.000</p>
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