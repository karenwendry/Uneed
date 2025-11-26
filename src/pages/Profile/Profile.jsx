// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar"; 
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  // Mengambil user dan fungsi logout dari AuthContext
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  // State untuk form
  const [name, setName] = useState("");
  
  // State khusus password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // State untuk data asli dari database
  const [dbUser, setDbUser] = useState(null);
  
  // State untuk feedback user
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // State BARU: Untuk menampilkan/menyembunyikan Modal Konfirmasi Hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 1. AMBIL DATA TERBARU DARI SERVER
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`http://localhost:3000/users/${user.id}`);
          const data = await response.json();
          setDbUser(data); 
          setName(data.name || ""); 
        } catch (error) {
          console.error("Gagal mengambil data user:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  // 2. FUNGSI UPDATE DATA (Logika yang sudah ada)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    if (!dbUser) {
      setIsLoading(false);
      setMessage({ type: "error", text: "Gagal memuat data user. Silakan refresh halaman." });
      return;
    }

    let payload = {}; 
    if (name && name !== dbUser.name) payload.name = name;

    if (newPassword) {
      if (!oldPassword) {
        setIsLoading(false);
        setMessage({ type: "error", text: "Mohon masukkan password lama untuk mengubah password." });
        return;
      }
      if (oldPassword !== dbUser.password) {
        setIsLoading(false);
        setMessage({ type: "error", text: "Password lama salah!" });
        return;
      }
      payload.password = newPassword;
    }

    if (Object.keys(payload).length === 0) {
      setIsLoading(false);
      setMessage({ type: "error", text: "Tidak ada perubahan data yang dilakukan." });
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Gagal mengupdate profil");

      const updatedUser = await response.json();
      setDbUser(updatedUser);
      setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
      setOldPassword("");
      setNewPassword("");

    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan data." });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. FUNGSI HAPUS AKUN (BARU)
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // Hapus data user dari db.json berdasarkan ID
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus akun");
      }

      // Sembunyikan modal
      setShowDeleteModal(false);

      // Panggil fungsi logout dari AuthContext untuk bersihkan sesi lokal
      logout(); 
      
      // Arahkan pengguna kembali ke halaman utama/landing
      navigate("/"); 

    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage({ type: "error", text: "Gagal menghapus akun. Coba lagi nanti." });
      setShowDeleteModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          
          {/* Header Profil */}
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
            <div className="w-20 h-20 rounded-full bg-pink-600 flex items-center justify-center text-white text-2xl font-bold uppercase">
              {name ? name.substring(0, 2) : "UN"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Profil</h1>
              <p className="text-gray-500 text-sm">Perbarui informasi akun Anda</p>
            </div>
          </div>

          {/* Alert Message */}
          {message.text && (
            <div className={`p-4 mb-6 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Input Nama & Email */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={dbUser?.email || ""}
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Input Password */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-800">Ubah Password</h3>
              <p className="text-xs text-gray-500 -mt-3 mb-2">Kosongkan jika tidak ingin mengubah password.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                  <input
                    type="password"
                    placeholder="Password baru..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
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

            {/* Tombol Aksi Update */}
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
                className="px-6 py-2.5 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>

          {/* BAGIAN BARU: Zona Bahaya (Hapus Akun) */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-red-600 mb-2">Zona Bahaya</h3>
            <p className="text-sm text-gray-600 mb-4">
              Menghapus akun Anda bersifat permanen. Semua data Anda akan hilang dari sistem.
            </p>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-lg transition text-sm"
            >
              Hapus Akun Saya
            </button>
          </div>

        </div>
      </div>

      {/* MODAL POPUP KONFIRMASI */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Hapus Akun?</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus akun ini secara permanen? 
              <br/>
              <span className="text-red-500 text-sm font-semibold">Tindakan ini tidak dapat dibatalkan.</span>
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition flex items-center gap-2"
              >
                {isLoading ? "Menghapus..." : "Ya, Hapus Akun"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;