// src/pages/Katalog/index.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FilterSidebar from "../../components/FilterSidebar";
import ProductList from "../../components/ProductList";

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [searchParams] = useSearchParams();
  const searchTermFromUrl = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          "Semua",
          ...new Set(data.map((item) => item.category.trim())),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTermFromUrl) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTermFromUrl.toLowerCase())
      );
    }

    if (selectedCategory !== "Semua") {
      result = result.filter(
        (item) => item.category.trim() === selectedCategory
      );
    }
    result = result.filter((item) => item.price <= maxPrice);

    if (sortOption === "lowest") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highest") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(result);
  }, [searchTermFromUrl, selectedCategory, products, maxPrice, sortOption]);

  const handleResetFilter = () => {
    setMaxPrice(200000);
    setSelectedCategory("Semua");
    setSortOption("");
  };

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#151875]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortOption={sortOption}
            setSortOption={setSortOption}
            formatRupiah={formatRupiah}
          />

          <ProductList
            loading={loading}
            products={filteredProducts}
            searchTerm={searchTermFromUrl}
            formatRupiah={formatRupiah}
            onResetFilter={handleResetFilter}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalogue;
