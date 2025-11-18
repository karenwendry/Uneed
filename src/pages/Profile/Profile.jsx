// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar"; 
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth(); // Kita hanya ambil ID dari sini
  const navigate = useNavigate();

  // State untuk form
  const [name, setName] = useState("");
  
  // State khusus password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // State untuk data asli dari database (untuk validasi akurat)
  const [dbUser, setDbUser] = useState(null);
  
  // State untuk feedback user
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 1. AMBIL DATA TERBARU LANGSUNG DARI SERVER SAAT LOAD
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`http://localhost:3000/users/${user.id}`);
          const data = await response.json();
          
          // Simpan data asli database ke state
          setDbUser(data); 
          setName(data.name || ""); // Isi nama dari data database
          
          // Debugging: Cek di console apakah password terbaca
          console.log("Data asli dari DB:", data); 
        } catch (error) {
          console.error("Gagal mengambil data user:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    // Pastikan data DB sudah terload
    if (!dbUser) {
      setIsLoading(false);
      setMessage({ type: "error", text: "Gagal memuat data user. Silakan refresh halaman." });
      return;
    }

    // --- VALIDASI LOGIKA ---

    let payload = {}; 

    // 1. Cek apakah Nama berubah?
    if (name && name !== dbUser.name) {
      payload.name = name;
    }

    // 2. Cek apakah user ingin ubah Password?
    if (newPassword) {
      // Jika ingin ubah password, WAJIB isi password lama
      if (!oldPassword) {
        setIsLoading(false);
        setMessage({ type: "error", text: "Mohon masukkan password lama untuk mengubah password." });
        return;
      }

      // === PERBAIKAN UTAMA DI SINI ===
      // Kita bandingkan dengan dbUser.password (data asli), BUKAN user.password (data session)
      console.log("Input:", oldPassword, "| DB:", dbUser.password); // Cek console jika masih error
      
      if (oldPassword !== dbUser.password) {
        setIsLoading(false);
        setMessage({ type: "error", text: "Password lama salah!" });
        return;
      }

      // Jika lolos, masukkan password baru ke payload
      payload.password = newPassword;
    }

    // 3. Cek apakah ada perubahan sama sekali?
    if (Object.keys(payload).length === 0) {
      setIsLoading(false);
      setMessage({ type: "error", text: "Tidak ada perubahan data yang dilakukan." });
      return;
    }

    // --- PROSES UPDATE KE DATABASE ---
    
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate profil");
      }

      // Update data lokal (dbUser) agar sinkron tanpa refresh
      const updatedUser = await response.json();
      setDbUser(updatedUser);

      // Sukses
      setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
      
      // Kosongkan field password
      setOldPassword("");
      setNewPassword("");

    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan data." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
            <div className="w-20 h-20 rounded-full bg-pink-600 flex items-center justify-center text-white text-2xl font-bold uppercase">
              {name ? name.substring(0, 2) : "UN"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Profil</h1>
              <p className="text-gray-500 text-sm">Perbarui informasi akun Anda</p>
            </div>
          </div>

          {/* Pesan Alert */}
          {message.text && (
            <div className={`p-4 mb-6 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Bagian 1: Informasi Dasar */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={dbUser?.email || ""} // Ambil dari dbUser
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Bagian 2: Ubah Password */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-800">Ubah Password</h3>
              <p className="text-xs text-gray-500 -mt-3 mb-2">
                Kosongkan jika tidak ingin mengubah password.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    placeholder="Password baru..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Lama
                  </label>
                  <input
                    type="password"
                    placeholder="Verifikasi password lama..."
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    disabled={!newPassword} 
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition ${!newPassword ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-pink-500 focus:border-pink-500'}`}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;