import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-20">
        <Link
          to="/home"
          className="text-pink-500 hover:underline mb-4 inline-block"
        >
          &larr; Kembali ke Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Halaman Detail Produk
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Anda sedang melihat detail produk dengan ID:{" "}
          <span className="font-bold text-pink-600">{id}</span>
        </p>
        <p className="text-sm text-gray-400 mt-2">(Rute: /product/{id})</p>
      </div>
    </div>
  );
};

export default ProductDetail;
