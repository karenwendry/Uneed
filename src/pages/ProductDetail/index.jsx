import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook untuk pindah halaman
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk mengatur gambar mana yang sedang aktif (ditampilkan besar)
  const [activeImage, setActiveImage] = useState("");

  // Format Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        // Set gambar utama default saat pertama kali load
        // Prioritaskan data.image, kalau null baru cek data.images[0]
        setActiveImage(data.image || (data.images && data.images[0])); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Fungsi Tambah ke Keranjang
  const handleAddToCart = () => {
    // 1. Ambil cart lama dari penyimpanan browser (LocalStorage)
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // 2. Masukkan produk ini ke cart
    const newCartItem = {
        ...product,
        image: activeImage // Gunakan gambar yang sedang dipilih user
    };
    existingCart.push(newCartItem);

    // 3. Simpan balik ke LocalStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // 4. Pindah ke halaman Cart
    navigate("/cart");
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-[#0A2E6B] font-bold text-xl">
          Memuat produk...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-[#0A2E6B]">
          <h2 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h2>
          <Link to="/" className="text-[#FB2E86] underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // LOGIKA GAMBAR:
  // Jika db.json punya array "images", pakai itu. 
  // Jika tidak, buat array manual berisi 1 gambar dari "image".
  const imageList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="font-sans bg-[#E0F2FE]/20 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-12 mt-5">
        <div className="mx-auto max-w-7xl">
          
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-[#0A2E6B]/70">
            <Link to="/" className="hover:text-[#FB2E86]">Beranda</Link> / 
            <span className="font-bold ml-1">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 bg-white p-6 rounded-xl shadow-sm">
            
            {/* --- KIRI: GALERI GAMBAR --- */}
            <div className="flex flex-col gap-4">
              {/* Gambar Utama (Besar) */}
              <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg bg-gray-50 flex items-center justify-center">
                <img
                  alt={product.name}
                  className="h-full w-full object-contain hover:scale-105 transition-transform duration-500"
                  src={activeImage}
                />
              </div>

              {/* Thumbnails (Kecil) - Dinamis Sesuai Jumlah Gambar */}
              {/* Hanya muncul jika gambar lebih dari 0 (pastinya iya) */}
              <div className="grid grid-cols-4 gap-4">
                {imageList.map((imgUrl, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveImage(imgUrl)} // Klik ganti gambar utama
                    className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 bg-gray-50 flex items-center justify-center transition-all ${
                        activeImage === imgUrl ? "border-[#FB2E86]" : "border-transparent hover:border-[#FB2E86]/50"
                    }`}
                  >
                    <img
                      className="h-full w-full object-contain p-1"
                      src={imgUrl}
                      alt={`View ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* --- KANAN: DETAIL --- */}
            <div className="flex flex-col space-y-6 justify-center">
              <div>
                <h1 className="font-['Josefin_Sans'] text-4xl font-bold text-[#0A2E6B] mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <span className="text-sm text-gray-500">(Review Belum Tersedia)</span>
                </div>

                <p className="text-4xl font-bold text-[#FB2E86] font-['Josefin_Sans']">
                  {formatRupiah(product.price)}
                </p>
                
                <span className="inline-block mt-3 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white bg-[#7E3FBB] rounded-md">
                  {product.category}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-[#0A2E6B]">Deskripsi</h2>
                {/* Mengambil Deskripsi dari DB */}
                <p className="mt-2 text-base text-[#0A2E6B] leading-relaxed text-justify opacity-80">
                  {product.description ? product.description : "Belum ada deskripsi untuk produk ini."}
                </p>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                    className="flex-1 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#FB2E86] px-6 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FB2E86]"
                    onClick={handleAddToCart}
                >
                   <ShoppingCart size={20}/> Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;