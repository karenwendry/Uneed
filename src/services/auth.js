// src/services/auth.js

const BASE_URL = 'http://localhost:3000'; 
const ALLOWED_DOMAIN = 'student.unklab.ac.id'; // <<< GANTI DENGAN DOMAIN UNIVERSITAS ANDA!

export const register = async (name, email, password) => {
  // --- LANGKAH 1: VALIDASI DOMAIN EMAIL ---
  const domain = email.substring(email.lastIndexOf('@') + 1);
  
  if (domain !== ALLOWED_DOMAIN) {
    throw new Error(`Pendaftaran hanya diperbolehkan untuk mahasiswa Universitas Klabat.`);
  }
  // ----------------------------------------

  // LANGKAH 2: Cek duplikasi email sebelum mendaftar
  const checkDuplicate = await fetch(`${BASE_URL}/users?email=${email}`);
  const existingUsers = await checkDuplicate.json();
  
  if (existingUsers.length > 0) {
      throw new Error('Email sudah terdaftar. Silakan login.');
  }

  // LANGKAH 3: POST data jika valid
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role: 'user' }), 
  });

  if (!response.ok) {
    throw new Error('Gagal mendaftar. Terjadi kesalahan server.');
  }

  const data = await response.json();
  return data; 
};


export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/users?email=${email}`);
  
  if (!response.ok) {
    throw new Error('Gagal menghubungi server.');
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error('Email atau password salah.');
  }

  const user = users[0];

  // Verifikasi password
  if (user.password !== password) {
    throw new Error('Email atau password salah.');
  }
  
  const { password: _, ...userData } = user; 
  return userData;
};

export const logout = () => {
  localStorage.removeItem('user');
};