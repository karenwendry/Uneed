// src/components/FilterSidebar.jsx
import React from "react";

const FilterSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  sortOption,
  setSortOption,
  formatRupiah,
}) => {
  return (
    <aside className="w-full lg:w-1/5 space-y-8">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-xl font-bold text-[#151875]">Filter</h2>
      </div>
      <div>
        <h3 className="text-base font-bold mb-3 text-[#151875] underline underline-offset-4 decoration-pink-500">
          Kategori
        </h3>
        <div className="space-y-2">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedCategory === cat
                    ? "border-pink-500"
                    : "border-gray-300"
                }`}
              >
                {selectedCategory === cat && (
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                )}
              </div>
              <span
                className={`text-sm ${
                  selectedCategory === cat
                    ? "text-pink-600 font-semibold"
                    : "text-gray-500 group-hover:text-pink-500"
                }`}
              >
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-base font-bold mb-3 text-[#151875] underline underline-offset-4 decoration-pink-500">
          Rentang Harga
        </h3>
        <div className="mb-2 flex justify-between text-xs text-gray-500 font-medium">
          <span>Rp 0</span>
          <span>{formatRupiah(maxPrice)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="200000"
          step="5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>
      <div>
        <h3 className="text-base font-bold mb-3 text-[#151875] underline underline-offset-4 decoration-pink-500">
          Urutkan
        </h3>
        <div className="space-y-2">
          {[
            { label: "Harga: Rendah ke Tinggi", value: "lowest" },
            { label: "Harga: Tinggi ke Rendah", value: "highest" },
            { label: "Terbaru (Newest First)", value: "newest" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="sort_filter"
                className="w-4 h-4 border-gray-300 text-pink-500 focus:ring-pink-500 accent-pink-500"
                checked={sortOption === option.value}
                onChange={() => setSortOption(option.value)}
              />
              <span className="text-sm text-gray-500 group-hover:text-pink-500">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
