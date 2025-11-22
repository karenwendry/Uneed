// src/components/ProductList.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({
  loading,
  products,
  searchTerm,
  formatRupiah,
  onResetFilter,
}) => {
  return (
    <main className="w-full lg:w-4/5">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#151875] mb-2">
          Marketplace
        </h1>

        {searchTerm && (
          <div className="inline-block bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Hasil pencarian: "{searchTerm}"
          </div>
        )}

        <div className="text-sm text-gray-400">
          Menampilkan {products.length} produk
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Memuat produk...</p>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300?text=No+Image";
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-[#151875] text-lg mb-1 truncate">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                        <span className="text-xs text-gray-500">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[#151875] font-bold text-base">
                          {formatRupiah(product.price)}
                        </p>
                        <div className="text-pink-500 hover:bg-pink-50 p-1 rounded-full transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">
                Produk tidak ditemukan.
              </p>
              <button
                onClick={onResetFilter}
                className="text-pink-500 text-sm mt-2 hover:underline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default ProductList;
