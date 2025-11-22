import React from "react";
import Navbar from "../../components/Navbar";

const Catalogue = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Halaman Katalog</h1>
        <p className="text-gray-500 mt-4">
          Ini adalah halaman dummy untuk katalog produk.
        </p>
        <p className="text-sm text-gray-400 mt-2">(Rute: /catalogue)</p>
      </div>
    </div>
  );
};

export default Catalogue;
