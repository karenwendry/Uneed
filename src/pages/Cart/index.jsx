import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);


  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  
  useEffect(() => {
    const rawCart = JSON.parse(localStorage.getItem("cart")) || [];
    const groupedItems = rawCart.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);

    setCartItems(groupedItems);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart_processed", JSON.stringify(items));
  };


  const increaseQty = (id) => {
    const newItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(newItems);
  };


  const decreaseQty = (id) => {
    const newItems = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(newItems);
  };

  const removeItem = (id) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems)); 
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 15000;
  const totalOrder = subtotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-[#0A2E6B]">
      <Navbar />

      <main className="flex-1 px-4 sm:px-10 lg:px-20 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-[#0A2E6B] text-4xl lg:text-5xl font-bold font-['Josefin_Sans'] leading-tight tracking-wide">
              Keranjang Belanja Anda
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <ShoppingBag className="mx-auto h-20 w-20 text-[#FB2E86] mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">Keranjang masih kosong</h2>
                <p className="text-gray-500 mb-6">Yuk cari barang kebutuhan kuliahmu dulu!</p>
                <Link to="/" className="bg-[#FB2E86] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#FB2E86]/80 transition-all">
                    Mulai Belanja
                </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-[#E0F2FE] p-5 items-center rounded-xl shadow-sm">
                    <div className="flex items-center gap-5 flex-1 w-full">
                      <img
                        alt={item.name}
                        className="rounded-lg size-24 flex-shrink-0 object-cover bg-white"
                        src={item.image}
                      />
                      <div className="flex flex-1 flex-col justify-center gap-1.5">
                        <p className="text-[#0A2E6B] text-lg font-bold leading-normal">
                          {item.name}
                        </p>
                        <p className="text-[#FB2E86] text-base font-bold leading-normal">
                          {formatRupiah(item.price)}
                        </p>
                        <p className="text-xs text-gray-500">Kategori: {item.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6">
            
                      <div className="flex items-center gap-2 text-white">
                        <button 
                            onClick={() => decreaseQty(item.id)}
                            className="text-xl font-bold flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A2E6B] hover:bg-[#1E3A5F] transition-colors cursor-pointer shadow-sm"
                        >
                            <Minus size={16} />
                        </button>
                        <input
                          className="text-base font-bold w-12 p-0 text-center text-[#0A2E6B] bg-transparent border-none focus:ring-0"
                          type="text"
                          readOnly
                          value={item.quantity}
                        />
                        <button 
                            onClick={() => increaseQty(item.id)}
                            className="text-xl font-bold flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A2E6B] hover:bg-[#1E3A5F] transition-colors cursor-pointer shadow-sm"
                        >
                            <Plus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[#EF4444] hover:text-[#EF4444]/70 transition-colors"
                      >
                        <Trash2 className="size-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>


              <div className="lg:col-span-1">
                <div className="bg-[#1E3A5F] text-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h2 className="text-2xl font-bold font-['Josefin_Sans'] mb-6">
                    Ringkasan Pesanan
                  </h2>
                  <div className="space-y-3 font-sans">
                    <div className="flex justify-between text-white/80">
                      <span>Subtotal</span>
                      <span>{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Biaya Pengiriman</span>
                      <span>{formatRupiah(shippingCost)}</span>
                    </div>
                  </div>
                  <hr className="my-4 border-white/20" />
                  <div className="flex justify-between text-white font-bold text-xl mb-8 font-sans">
                    <span>Total</span>
                    <span>{formatRupiah(totalOrder)}</span>
                  </div>
                  <button 
                    onClick={() => alert("Fitur Checkout belum dibuat ya kak!")}
                    className="w-full bg-[#FB2E86] text-white text-lg font-bold py-3 px-6 rounded-lg hover:bg-[#FB2E86]/80 transition-all shadow-md"
                  >
                    Checkout
                  </button>
                  <div className="text-center mt-4">
                    <Link to="/" className="text-[#7E3FBB] font-bold hover:underline transition-colors bg-white px-4 py-1 rounded-full text-sm">
                      Lanjutkan Belanja
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;