// src/pages/Beranda/index.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-5 py-6">
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
        <div className="mb-20">
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Produk Terlaris
            </h2>
            <Link
              to="/catalogue"
              className="text-sm font-semibold text-gray-500 hover:text-pink-600 flex items-center gap-1"
            >
              Lihat semua <span className="text-lg">→</span>
            </Link>
          </div>
          {loading ? (
            <p className="text-center text-gray-500 py-10">Memuat produk...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="group cursor-pointer block"
                >
                  <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square relative mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base leading-tight mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-xs mb-1">
                    {item.category || "Umum"}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatRupiah(item.price)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Home;
