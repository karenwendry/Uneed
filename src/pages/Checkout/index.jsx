import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext"; // Asumsi kamu pakai ini
import { MapPin, CreditCard, ShoppingBag } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Ambil data user yang sedang login
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Format Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // 1. Ambil data dari LocalStorage saat halaman dibuka
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Jika keranjang kosong, tendang balik ke home
    if (storedCart.length === 0) {
      alert("Keranjang kosong!");
      navigate("/");
      return;
    }

    // Grouping logic (sama seperti di page Cart)
    const groupedItems = storedCart.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.cartId === item.cartId);
      if (existingItem) {
        existingItem.quantity += item.quantity; // Hati-hati di sini, pastikan logic quantity konsisten
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    setCartItems(groupedItems);
  }, [navigate]);

  // Hitung Total
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 15000;
  const totalOrder = subtotal + shippingCost;

  // 2. Fungsi BAYAR (Kirim ke db.json)
  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!address) {
      alert("Mohon isi alamat pengiriman!");
      return;
    }

    setLoading(true);

    // Siapkan Data Pesanan
    const newOrder = {
      // id akan digenerate otomatis oleh json-server
      userId: user ? user.id : "guest", // Sambungkan dengan ID user yang login
      userName: user ? user.name : "Tamu",
      date: new Date().toISOString(), // Tanggal hari ini
      status: "Dikemas", // Status awal
      items: cartItems, // Barang yang dibeli
      totalPrice: totalOrder,
      shippingAddress: address,
      paymentMethod: "Transfer Bank" // Hardcode dulu
    };

    try {
      // KIRIM KE DATABASE (db.json)
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        // Jika sukses:
        // 1. Hapus Keranjang (LocalStorage)
        localStorage.removeItem("cart");
        // 2. Beritahu user
        alert("Pesanan Berhasil Dibuat!");
        // 3. Pindah ke halaman Home atau Riwayat Pesanan
        navigate("/"); 
      } else {
        alert("Gagal membuat pesanan.");
      }
    } catch (error) {
      console.error("Error checkout:", error);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-[#0A2E6B]">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 font-['Josefin_Sans']">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KIRI: FORM ALAMAT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                <MapPin className="text-[#FB2E86]" /> Alamat Pengiriman
              </h2>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB2E86] focus:outline-none"
                rows="3"
                placeholder="Masukkan alamat lengkap (Jalan, Nomor Rumah, Kelurahan, dll)..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                <ShoppingBag className="text-[#FB2E86]" /> Review Barang
              </h2>
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b pb-4 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500">Var: {item.selectedColor}, {item.selectedSize}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} x {formatRupiah(item.price)}</p>
                    </div>
                    <div className="font-bold text-[#FB2E86]">
                        {formatRupiah(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KANAN: RINGKASAN BAYAR */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E3A5F] text-white p-6 rounded-xl shadow-lg sticky top-24">
                <h2 className="text-xl font-bold mb-6 font-['Josefin_Sans']">Rincian Pembayaran</h2>
                
                <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between opacity-80">
                        <span>Total Harga Barang</span>
                        <span>{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between opacity-80">
                        <span>Ongkos Kirim</span>
                        <span>{formatRupiah(shippingCost)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-lg">
                        <span>Total Tagihan</span>
                        <span>{formatRupiah(totalOrder)}</span>
                    </div>
                </div>

                <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`w-full py-4 rounded-lg font-bold text-lg shadow-md flex justify-center items-center gap-2 transition-all
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FB2E86] hover:bg-[#d91c6e]"}`}
                >
                    {loading ? "Memproses..." : (
                        <>
                           <CreditCard size={20} /> Bayar Sekarang
                        </>
                    )}
                </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Checkout;