import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Star, MessageCircle, Instagram, ExternalLink } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  
  // Data & Loading State
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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
        // Set gambar utama default
        setActiveImage(data.image || (data.images && data.images[0]));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Fungsi Buka WhatsApp
  const handleWhatsApp = () => {
    if (!product.wa) {
      alert("Nomor WhatsApp penjual tidak tersedia.");
      return;
    }
    // Format pesan otomatis
    const message = `Halo kak, saya tertarik dengan produk *${product.name}* yang ada di Uneed. Apakah masih tersedia?`;
    const url = `https://wa.me/${product.wa}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Fungsi Buka Instagram
  const handleInstagram = () => {
    if (!product.ig) {
      alert("Instagram penjual tidak tersedia.");
      return;
    }
    const url = `https://instagram.com/${product.ig}`;
    window.open(url, "_blank");
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
      <div className="min-h-screen flex justify-center items-center flex-col">
        <p>Produk tidak ditemukan</p>
        <Link to="/" className="text-pink-500 underline">Kembali</Link>
      </div>
    );
  }

  const imageList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="font-sans bg-[#E0F2FE]/20 min-h-screen flex flex-col relative">
      <Navbar />

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
                
                {/* Rating Dummy */}
                <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <span className="text-sm text-gray-500">(Produk Terverifikasi)</span>
                </div>

                <p className="text-4xl font-bold text-[#FB2E86] font-['Josefin_Sans']">
                  {formatRupiah(product.price)}
                </p>
                
                <span className="inline-block mt-3 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white bg-[#7E3FBB] rounded-md">
                  {product.category}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-[#0A2E6B]">Deskripsi Produk</h2>
                <p className="mt-2 text-base text-[#0A2E6B] leading-relaxed text-justify opacity-80">
                  {product.description ? product.description : "Belum ada deskripsi."}
                </p>
              </div>

              {/* KONTAK PENJUAL SECTION */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-4">
                <h3 className="text-[#0A2E6B] font-bold mb-4 flex items-center gap-2">
                    <ExternalLink size={20} /> Hubungi Penjual
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Tertarik dengan produk ini? Silakan hubungi penjual langsung melalui kontak di bawah ini untuk negosiasi atau pembelian.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Tombol WhatsApp */}
                    <button 
                        onClick={handleWhatsApp}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-6 rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        <MessageCircle size={24} fill="white" />
                        Chat WhatsApp
                    </button>

                    {/* Tombol Instagram */}
                    <button 
                        onClick={handleInstagram}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white py-3 px-6 rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        <Instagram size={24} />
                        DM Instagram
                    </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;