import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Check, X, ShoppingBag } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Data & Loading State
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  // Modal & Selection State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("cart"); // "cart" atau "buy"
  
  // Pilihan User di dalam Modal
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Toast Notification State
  const [showToast, setShowToast] = useState(false);

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
        setActiveImage(data.image || (data.images && data.images[0]));
        
        // Set default selection jika ada opsi
        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Membuka Modal (Tombol diklik)
  const openModal = (type) => {
    setActionType(type); // Tentukan mau "add cart" atau "buy now"
    setIsModalOpen(true);
  };

  // Konfirmasi Pesanan (Tombol di dalam Modal diklik)
  const handleConfirm = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const newItem = {
      ...product,
      image: activeImage,
      selectedColor: selectedColor || "Default", // Simpan pilihan user
      selectedSize: selectedSize || "Default",   // Simpan pilihan user
      quantity: quantity,
      // Buat ID unik kombinasi produk + varian supaya beda varian tidak tertumpuk
      cartId: `${product.id}-${selectedColor}-${selectedSize}`
    };

    // Masukkan ke array cart (Logika sederhana: push aja, grouping diurus di page Cart)
    existingCart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setIsModalOpen(false); // Tutup modal

    if (actionType === "buy") {
      // Jika Beli Langsung -> Arahkan ke Checkout (sementara ke Cart dulu jika blm ada checkout)
      navigate("/cart"); 
    } else {
      // Jika Tambah Keranjang -> Tampilkan Notifikasi Toast
      setShowToast(true);
      // Hilangkan notif setelah 3 detik
      setTimeout(() => setShowToast(false), 3000);
    }
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
    return <div className="min-h-screen flex justify-center items-center">Produk tidak ditemukan</div>;
  }

  const imageList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="font-sans bg-[#E0F2FE]/20 min-h-screen flex flex-col relative">
      <Navbar />

      {/* --- TOAST NOTIFICATION (POJOK KANAN ATAS) --- */}
      {showToast && (
        <div className="fixed top-24 right-5 z-[100] bg-white border-l-4 border-green-500 shadow-xl rounded-lg p-4 flex items-center gap-3 animate-bounce-in">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
                <Check size={20} />
            </div>
            <div>
                <h4 className="font-bold text-[#0A2E6B] text-sm">Berhasil!</h4>
                <p className="text-gray-500 text-xs">Produk telah masuk keranjang.</p>
            </div>
        </div>
      )}

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-12 mt-5">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-[#0A2E6B]/70">
            <Link to="/" className="hover:text-[#FB2E86]">Beranda</Link> / 
            <span className="font-bold ml-1">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 bg-white p-6 rounded-xl shadow-sm">
            
            {/* --- KIRI: GAMBAR --- */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg bg-gray-50 flex items-center justify-center">
                <img
                  alt={product.name}
                  className="h-full w-full object-contain"
                  src={activeImage}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {imageList.map((imgUrl, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveImage(imgUrl)}
                    className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 bg-gray-50 flex items-center justify-center transition-all ${
                        activeImage === imgUrl ? "border-[#FB2E86]" : "border-transparent hover:border-[#FB2E86]/50"
                    }`}
                  >
                    <img className="h-full w-full object-contain p-1" src={imgUrl} alt="thumb" />
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
                    <span className="text-sm text-gray-500">(12 Review)</span>
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
                <p className="mt-2 text-base text-[#0A2E6B] leading-relaxed text-justify opacity-80">
                  {product.description ? product.description : "Belum ada deskripsi."}
                </p>
              </div>

              {/* DUA TOMBOL AKSI UTAMA */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                {/* Tombol 1: Tambah Keranjang (Buka Modal mode 'cart') */}
                <button 
                    onClick={() => openModal("cart")}
                    className="flex-1 flex items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-[#FB2E86] bg-white text-[#FB2E86] px-6 py-4 text-lg font-bold shadow-sm transition-all hover:bg-[#FB2E86] hover:text-white"
                >
                   <ShoppingCart size={20}/> + Keranjang
                </button>

                {/* Tombol 2: Beli Langsung (Buka Modal mode 'buy') */}
                <button 
                    onClick={() => openModal("buy")}
                    className="flex-1 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#FB2E86] px-6 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:shadow-pink-500/30"
                >
                   <ShoppingBag size={20}/> Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL POP-UP --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-up sm:animate-scale-in">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="font-bold text-[#0A2E6B] text-lg">
                    {actionType === "cart" ? "Tambah ke Keranjang" : "Beli Langsung"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500">
                    <X size={24} />
                </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Preview Produk Singkat */}
                <div className="flex gap-4">
                    <img src={activeImage} alt="preview" className="w-20 h-20 object-contain rounded-md bg-gray-50 border" />
                    <div>
                        <p className="font-bold text-[#0A2E6B]">{product.name}</p>
                        <p className="text-[#FB2E86] font-bold">{formatRupiah(product.price * quantity)}</p>
                    </div>
                </div>

                {/* Pilihan Warna (Hanya muncul jika ada di DB) */}
                {product.colors && product.colors.length > 0 && (
                    <div>
                        <h4 className="text-sm font-bold text-[#0A2E6B] mb-2">Pilih Warna</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((col) => (
                                <button
                                    key={col}
                                    onClick={() => setSelectedColor(col)}
                                    className={`px-4 py-2 text-sm rounded-full border transition-all ${
                                        selectedColor === col 
                                        ? "bg-[#0A2E6B] text-white border-[#0A2E6B]" 
                                        : "bg-white text-gray-600 border-gray-300 hover:border-[#0A2E6B]"
                                    }`}
                                >
                                    {col}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pilihan Ukuran (Hanya muncul jika ada di DB) */}
                {product.sizes && product.sizes.length > 0 && (
                    <div>
                        <h4 className="text-sm font-bold text-[#0A2E6B] mb-2">Pilih Ukuran</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((sz) => (
                                <button
                                    key={sz}
                                    onClick={() => setSelectedSize(sz)}
                                    className={`px-4 py-2 text-sm rounded-full border transition-all ${
                                        selectedSize === sz 
                                        ? "bg-[#FB2E86] text-white border-[#FB2E86]" 
                                        : "bg-white text-gray-600 border-gray-300 hover:border-[#FB2E86]"
                                    }`}
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Jumlah */}
                <div>
                    <h4 className="text-sm font-bold text-[#0A2E6B] mb-2">Jumlah</h4>
                    <div className="flex items-center border border-gray-300 w-max rounded-lg overflow-hidden">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-2 hover:bg-gray-100 text-lg font-bold"
                        >-</button>
                        <input 
                            type="text" 
                            readOnly 
                            value={quantity} 
                            className="w-12 text-center border-none focus:ring-0 font-bold text-[#0A2E6B]"
                        />
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-100 text-lg font-bold"
                        >+</button>
                    </div>
                </div>
            </div>

            {/* Footer Modal (Tombol Konfirmasi) */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button 
                    onClick={handleConfirm}
                    className="w-full py-3 rounded-lg bg-[#FB2E86] text-white font-bold text-lg hover:bg-[#d91c6e] transition-colors shadow-md"
                >
                    {actionType === "cart" ? "Masukkan Keranjang" : "Beli Sekarang"}
                </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;